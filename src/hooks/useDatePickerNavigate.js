import { useState } from "react";

export const useDatePickerNavigate = (events) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isErrorInput, setIsErrorInput] = useState(false);
  const [noEventsFound, setNoEventsFound] = useState(false);

  const handleClearFilterData = () => {
    setFilteredData([]);
    setIsErrorInput(false);
    setNoEventsFound(false);
  };

  const handleFilterData = ({ search_input, start_date, end_date }) => {
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

    filtered.length === 0 ? setNoEventsFound(true) : setNoEventsFound(false);
  };

  return { filteredData, isErrorInput, noEventsFound, handleFilterData, handleClearFilterData };
};
