import React, {useEffect} from "react";
import {useState} from "react";
import DataCustom from "../DataCustom/DataCustom.jsx";
import Button from "../../../Button/Button";
import SelectCustom from "../SelectCustom/SelectCustom";

import "./DatePickerNavigation.scss";

const DatePickerNavigation = (props) => {
	const {
        category,
        onStartDate,
        onShowMonthView,
        currentDay,
        onDateInput,
        onSelectOptions
    } = props
    
    const handlerTodayButton = () => {
		onStartDate(new Date());
	};
	
	const handlerMonthButton = () => {
		onShowMonthView(true);
	};
	
	return (
		<div className="date-picker-navigation">
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
			
			<DataCustom
				selected={currentDay}
				startDate={currentDay}
				onChange={(date) => onDateInput(date)}
			/>
			<div className="date-picker-filter">
				<SelectCustom
					data={category}
					onChange={onSelectOptions}
					className="date-picker-select"
					classNamePrefix="date-picker"
					// defaultMenuIsOpen // открыть выпадающее меню селектора
				/>
				{/*<select className="filter-select" onChange={onSelectOptions}>*/}
				{/*    {category.map((item, index) => (*/}
				{/*        <option className="date-picker-navigation-option" key={index} value={item}>*/}
				{/*            {item}*/}
				{/*        </option>*/}
				{/*    ))}*/}
				{/*</select>*/}
				<span className="filter-title">Filter</span>
			</div>
		</div>
	);
};

export default DatePickerNavigation;
