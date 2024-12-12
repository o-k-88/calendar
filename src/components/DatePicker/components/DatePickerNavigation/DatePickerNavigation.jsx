import React, {useEffect} from "react";
import {useState} from "react";
import DataCustom from "../DataCustom/DataCustom.jsx";
import Button from "../../../Button/Button";

import "./DatePickerNavigation.scss";

const DatePickerNavigation = ({
	                              category,
	                              onStartDate,
	                              onShowMonthView,
	                              currentDay,
	                              onDateInput,
	                              events
                              }) => {
	const [filteredBySelectEvents, setFilteredBySelectEvents] = useState([]);
	
	const handlerTodayButton = () => {
		onStartDate(new Date());
	};
	
	const handlerMonthButton = () => {
		onShowMonthView(true);
	};
	
	// const handlerInputValue = (e) => {
	// 	setInputValue(e.target.value);
	// };
	
	const handlerSelectOptions = (e) => {
		let currentOption = e.target.value;

		if (currentOption === "all") {
			setFilteredBySelectEvents(events);
			return;
		}

		// console.log(currentOption);
		setFilteredBySelectEvents(events.filter((item) => item.category === currentOption));

		// console.log(filteredBySelectEvents);
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
			{/*<input*/}
			{/*	className="date-picker-navigation-input-day"*/}
			{/*	onChange={handlerInputValue}*/}
			{/*	type="date"*/}
			{/*	value={inputValue}*/}
			{/*/>*/}
			<DataCustom
				selected={currentDay}
				startDate={currentDay}
				onChange={(date) => onDateInput(date)}
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
