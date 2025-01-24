import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "./DataCustom.scss";

const getCurrentYear = new Date().getFullYear();
const years = Array.from({length: 50}, (v, i) => getCurrentYear + i);

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const getYear = (date) => {
	return new Date(date).getFullYear();
};
const getMonth = (date) => {
	return new Date(date).getMonth();
};

function DataCustom(props) {
	return (
		<DatePicker
			className="data-custom"
			renderCustomHeader={({
                 date,
                 changeYear,
                 changeMonth,
                 decreaseMonth,
                 increaseMonth,
                 prevMonthButtonDisabled,
                 nextMonthButtonDisabled,
             }) => {
				return (
					<div
						style={{
							margin: 10,
							display: "flex",
							justifyContent: "center",
						}}
					>
						<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
							{"<"}
						</button>
						<select value={getYear(date)} onChange={({target: {value}}) => changeYear(value)}>
							{years.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
						
						<select
							value={months[getMonth(date)]}
							onChange={({target: {value}}) => changeMonth(months.indexOf(value))}
						>
							{months.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
						
						<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
							{">"}
						</button>
					</div>
				);
			}}
			{...props}
		/>
	);
}

export default DataCustom;
