import React, {useState, useEffect} from "react";

import DatePicker from "../../composition/DatePicker/DatePicker.jsx";
import ModalCalendar from "../../composition/ModalCalendar/ModalCalendar.jsx";
import ModalSearch from "../../composition/ModalSearch/ModalSearch.jsx";
import ModalCreateEvent from "../../composition/ModalCreateEvent/ModalCreateEvent.jsx";
import RightSideBar from "../../composition/RightSideBar/RightSideBar.jsx";
import Widget from "../../layout/Widget/Widget.jsx";
import Layout from "../../layout/Layout.jsx";


import {formattingEvent, formattingCategory, overflowHidden} from "../../helpers/index.js";



const PageCalendar = () => {
	const [events, setEvents] = useState([]);
	const [category, setCategory] = useState(["All Categories"]);
	const [filteredEvents, setFilteredEvents] = useState([]);
	
	const [popupData, setPopupData] = useState({});
	const [isShow, setIsShow] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const [createEvent, setCreateEvent] = useState(false);
	
	const [filteredData, setFilteredData] = useState([]);
	const [isErrorInput, setIsErrorInput] = useState(false);
	
	
	const handleFilterData = ({search_input, start_date, end_date}) => {
		// If search_input is empty, set filteredData to an empty array
		if (search_input.trim() === "") {
			setIsErrorInput(true);
			setFilteredData([]);
			return;
		}
		
		const start = start_date ? new Date(start_date) : null;
		const end = end_date ? new Date(end_date) : null;
		
		const filtered = events.filter((event) => {
			const eventDate = new Date(event.currentDate);
			
			// Check if event date is within range
			const isWithinDateRange = (!start || eventDate >= start) && (!end || eventDate <= end);
			
			// Check if search input matches title, description, or category
			const matchesSearch =
				event.title.toLowerCase().includes(search_input.toLowerCase()) ||
				event.description.toLowerCase().includes(search_input.toLowerCase()) ||
				event.category.toLowerCase().includes(search_input.toLowerCase());
			
			return isWithinDateRange && matchesSearch;
		});
		setIsErrorInput(false);
		setFilteredData(filtered);
	};
	
	// https://hybridcal.dev.sunyempire.edu/api/v1/calendar/all?_format=json
	
	useEffect(() => {
		const data = fetch("https://hybridcal.dev.sunyempire.edu/api/v1/calendar/all?_format=json");
		data
			.then((data) => {
				return data.json();
			})
			.then((current) => {
				const data = formattingEvent(current.rows);
				const categories = formattingCategory(data);
				return {
					data,
					categories,
				};
			})
			.then(({data, categories}) => {
				setEvents(data);
				setFilteredEvents(data);
				setCategory(categories);
			})
			.catch((e) => {
				console.error(e);
			});
	}, []);
	
	const handlerSelect = (dateSelect, e) => {
		const currentEventTitle = e.target.textContent.replace(/^\d{2}:\d{2} [APM]{2} -\s*/, ""); //I'm not sure if this is the best way to do this
		setPopupData(events.find((item) => item.title === currentEventTitle));
	};
	
	const handlerIsModal = () => {
		setIsShow(!isShow);
		overflowHidden(isShow);
	};
	
	const handlerPopup = () => {
		setIsSearch(!isSearch);
		overflowHidden(isSearch);
	};
	
	const handlerClosePopupSearch = () => {
		setFilteredData([])
		setIsErrorInput(false)
		handlerPopup()
	};
	
	const handleCreateEvent = () => {
		setCreateEvent(!createEvent);
		overflowHidden(createEvent);
	};
	
	const handlerSelectOptions = (value) => {
		setFilteredEvents(events.filter((event) => event.category === value.value));
	};
	
	return (
		<>
			<Layout>
				<Widget>
					<DatePicker
						className={"asdasdsadsa"}
						events={filteredEvents}
						onModal={handlerIsModal}
						onSearch={handlerPopup}
						category={category}
						onSelect={handlerSelect}
						onSelectOptions={handlerSelectOptions}
						onCreateEvent={handleCreateEvent}
					/>
				</Widget>
				<RightSideBar/>
			</Layout>
			<ModalCalendar
				isOpen={isShow}
				data={popupData}
				onClose={handlerIsModal}
			/>
			<ModalSearch
				isOpen={isSearch}
				filteredData={filteredData}
				isErrorInput={isErrorInput}
				onClose={handlerClosePopupSearch}
				onFilterData={handleFilterData}
			/>
			<ModalCreateEvent
				isOpen={createEvent}
				onClose={handleCreateEvent}
			/>
		</>
	);
};


export default PageCalendar