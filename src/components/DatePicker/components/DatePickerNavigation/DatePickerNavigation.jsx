import React, {useEffect} from "react";
import {useState} from "react";
import DataCustom from "../DataCustom/DataCustom.jsx";
import Button from "../../../Button/Button";

import "./DatePickerNavigation.scss";

const DatePickerNavigation = ({
	                              category,
	                              onStartDate,
	                              setShowMonth,
	                              currentMonth,
	                              customDate,
	                              onCustomDate,
	                              events
                              }) => {
	// const [inputValue, setInputValue] = useState(currentMonth ? new Date(currentMonth).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
	const [filteredBySelectEvents, setFilteredBySelectEvents] = useState([]);
	
	const handlerTodayButton = () => {
		onStartDate(new Date());
		setInputValue(new Date().toISOString().slice(0, 10));
	};
	
	const handlerMonthButton = () => {
		setShowMonth(true);
	};
	
	const handlerInputValue = (e) => {
		setInputValue(e.target.value);
	};
	
	const handlerSetDateButton = () => {
		onStartDate(customDate);
		
		console.log('handlerSetDateButton',customDate);
	};
	
	const handlerSelectOptions = (e) => {
		let currentOption = e.target.value;
		
		if (currentOption === "all") {
			setFilteredBySelectEvents(events);
			return;
		}
		
		console.log(currentOption);
		setFilteredBySelectEvents(events.filter((item) => item.category === currentOption));
		
		console.log(filteredBySelectEvents);
	};
	
	// useEffect(() => {
	//   setFilteredBySelectEvents(events);
	// }, [events]);
	
	return (
		<div className="date-picker-navigation">
			{/* <button>Month</button>
        <button>Week</button> */}
			<Button
				underlineView
				classNames="date-picker-navigation-btn-today"
				onClick={handlerTodayButton}
			>
				Today
			</Button>
			<Button
				underlineView
				classNames="date-picker-navigation-btn-today"
				onClick={handlerMonthButton}
			>
				Month
			</Button>
			<Button
				underlineView
				classNames="date-picker-navigation-set-day"
				onClick={handlerSetDateButton}
			>
				Set date
			</Button>
			{/*<input*/}
			{/*	className="date-picker-navigation-input-day"*/}
			{/*	onChange={handlerInputValue}*/}
			{/*	type="date"*/}
			{/*	value={inputValue}*/}
			{/*/>*/}
			<DataCustom
				selected={customDate}
				onChange={onCustomDate}
			/>
			<div className="filters">
				<div>Filters</div>
				<div className="date-picker-wrapper">
					<select
						className="date-picker-navigation-select"
						name=""
						id=""
						onChange={handlerSelectOptions}
					>
						<option value="all">All</option>
						{category.map((item, index) => (
							<option className="date-picker-navigation-option" key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div>
					{filteredBySelectEvents.map((item) => (
						<div key={item.id}>{item.title}</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default DatePickerNavigation;
