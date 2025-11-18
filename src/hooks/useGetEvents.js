import { useEffect, useMemo, useState, useContext } from "react";
import dayjs from "dayjs";

import {
  recurringUrl,
  eventsUrl,
  API_HOST,
  API_HOST_DEV,
  TOKEN_OBJECT_STRINGIFY_DEV,
  TOKEN_OBJECT_STRINGIFY,
} from "constants/";
import {
  formattingEventRecurring,
  formattingEvent,
  getOauthToken,
  sortEventsByTime,
} from "helpers/index.js";

import { Context } from "context/index.jsx";

export const useGetEvents = (currentDateMonth) => {
  const [allEvents, setAllEvents] = useState([]);

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [continuesEvents, setContinuesEvents] = useState([]);
  const [currentSideBarEventDay, setCurrentSideBarEventDay] = useState([]); //context
  const [currentCategory, setCurrentCategory] = useState({
    label: "All Categories",
    value: "All Categories",
  });

  const events = useMemo(() => {
    return [...allEvents, ...continuesEvents];
  }, [allEvents, continuesEvents]);

  const currentMonth = dayjs(currentDateMonth).format("YYYY-MM");

  const handlerSelectCategory = (value = currentCategory) => {
    if (value.value !== currentCategory.value) {
      setCurrentCategory(value);
    }

    if (value.value === "All Categories") {
      return setFilteredEvents(events);
    }
    setFilteredEvents(events.filter((event) => event.category === value.value));
  };

  const handleSelectEventDay = (date) => {
    const current = new Date(date);

    const currentDate = `${current.getFullYear()}${current.getMonth()}${current.getDate()}`;

    const filterEvent = events.filter(({ date }) => date === currentDate);

    const currentEvent = sortEventsByTime(filterEvent);

    setCurrentSideBarEventDay(currentEvent);
  };

  // useEffect(() => {
  //   setContinuesEvents((prev) => {
  //     const filteredContinuesEvents = allEvents.filter((item) => {
  //       const endDate = dayjs(item?.field_end_date).format("YYYYMMDD");
  //       const startDate = dayjs(item?.field_start_date).format("YYYYMMDD");
  //       return endDate > startDate;
  //     });

  //     const mappedContinuesEvents = filteredContinuesEvents
  //       .map((item) => {
  //         //how to count how many days between two dates
  //         const endDate = dayjs(item?.field_end_date);
  //         const startDate = dayjs(item?.field_start_date);
  //         const daysBetweenStartAndEnd = endDate.diff(startDate, "day");
  //         const updatedItem = new Array(daysBetweenStartAndEnd).fill("").map((_, index) => {
  //           return {
  //             ...item,
  //             date: startDate.add(index + 1, "day").format("YYYYMDD"),
  //             currentDate: startDate.add(index + 1, "day").toDate(),
  //           };
  //         });

  //         return [...updatedItem];
  //       })
  //       .flat();

  //     const unique = [
  //       ...new Map([...prev, ...mappedContinuesEvents].map((item) => [item.date, item])).values(),
  //     ];

  //     return unique;
  //   });
  // }, [allEvents]);

  useEffect(() => {
    getOauthToken(API_HOST, TOKEN_OBJECT_STRINGIFY)
      .then((data) => {
        const url = eventsUrl(API_HOST, currentMonth);

        fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + data.access_token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const events = data.response.rows || [];
            const formattedEvents = formattingEvent(events);

            setAllEvents((prev) => {
              const uniqueDates = new Set(
                prev.map((event) => new Date(event.currentDate).getTime())
              );
              const uniqueIds = new Set(prev.map((event) => event.uuid));
              const filtered = formattedEvents.filter(
                (event) =>
                  !uniqueIds.has(event.uuid) ||
                  !uniqueDates.has(new Date(event.start_date).getTime())
              );

              return filtered;
            });
            setFilteredEvents((prev) => {
              const uniqueDates = new Set(
                prev.map((event) => new Date(event.currentDate).getTime())
              );
              const uniqueIds = new Set(prev.map((event) => event.uuid));

              const filtered = formattedEvents.filter(
                (event) =>
                  !uniqueIds.has(event.uuid) ||
                  !uniqueDates.has(new Date(event.start_date).getTime())
              );
              return filtered;
            });

            setIsLoadingEvents(false);
          });
        return data;
      })
      .then(() => {
        getOauthToken(API_HOST, TOKEN_OBJECT_STRINGIFY).then((data) => {
          const url = recurringUrl(API_HOST, currentMonth);
          fetch(url, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + data.access_token,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (!data) {
                return null;
              }
              const formattedData = formattingEventRecurring(data.response.rows || []);

              setFilteredEvents((prev) => {
                if (prev.length === 0) {
                  return [...prev, ...formattedData];
                }
                const uniqueDates = new Set(
                  prev.map((event) => new Date(event.currentDate).getTime())
                );

                const uniqueIds = new Set(prev.map((event) => event.uuid));

                const filtered = formattedData.filter(
                  (event) =>
                    !uniqueIds.has(event.uuid) ||
                    !uniqueDates.has(new Date(event.start_date).getTime())
                );

                return [...prev, ...filtered];
              });
            });
        });
      });
  }, [currentDateMonth]);

  return {
    events,
    filteredEvents,
    isLoadingEvents,
    handlerSelectCategory,
    handleSelectEventDay,
    currentSideBarEventDay,
  };
};
