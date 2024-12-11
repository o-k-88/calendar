import React, {useState, useEffect, useMemo} from "react";
import DatePicker from "react-datepicker";
import cn from "classnames";
import DatePickerNavigation from "./components/DatePickerNavigation/DatePickerNavigation.jsx";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

const DatePickerView = (props) => {
	const {events, renderDay,renderMonth, handlerIsModal, className, category, onSelect} = props;
	
	const [startDate, setStartDate] = useState(new Date());
	const [showMonth, setShowMonth] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(null);
	const [customDate, setCustomDate] = useState(new Date());
	// const [inputValue, setInputValue] = useState(new Date().toISOString().slice(0, 10));
	
	const handlerStartDate = (date) => setStartDate(date);
	
	const renderDayContents = (day, date) => {
		const current = new Date(date);
		const filteredTooltipText = events?.filter(({date}) => {
			const currentDate = `${current.getFullYear()}${current.getMonth()}${current.getDate()}`;
			
			return date === currentDate;
		});
		
		return (
			<>
				<div className={"day"}>{day}</div>
				{filteredTooltipText.map((item, index) => (
					<div key={index}>
						{item?.title && <span className="label"/>}
						
						<span
							onClick={(e) => {
								handlerIsModal();
								onSelect(date, e);
							}}
							className={"title"}
						>
              {item?.time} - {item?.title}
            </span>
					</div>
				))}
			</>
		);
	};
	
	const renderMonthContent = (month, shortMonth, longMonth, day) => {

		const handlerSelectMonth = () => {
			const fullYear = new Date(day).getFullYear();
			setShowMonth(false)
			setCurrentMonth(new Date(`${fullYear}-01-${month + 1 < 10 ? `0${month + 1}` : month + 1}`))
			handlerStartDate(new Date(`${fullYear}-01-${month + 1 < 10 ? `0${month + 1}` : month + 1}`))
		}
		return <span onClick={handlerSelectMonth}>{shortMonth}</span>;
	};
	
	const date = useMemo(() => customDate ? customDate : startDate ,[startDate,customDate])
	
	return (
		<>
			<DatePickerNavigation
				category={category}
				onStartDate={handlerStartDate}
				setShowMonth={setShowMonth}
				currentMonth={currentMonth}
				customDate={customDate}
				onCustomDate={setCustomDate}
				events={events}
			/>
			
			<div className="wrapper-date-picker">
				<DatePicker
					calendarClassName={cn("g-date-picker", className)}
					selected={date}
					onChange={handlerStartDate}
					showMonthYearPicker={showMonth}
					onSelect={onSelect}
					renderDayContents={renderDay ? renderDay : renderDayContents}
					renderMonthContent={renderMonth? renderMonth : renderMonthContent}
					inline
				/>
			</div>
		</>
	);
};

export default DatePickerView;
