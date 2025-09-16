import { useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  recurringUrl,
  eventsUrl,
  API_HOST,
  API_HOST_DEV,
  TOKEN_OBJECT_STRINGIFY_DEV,
  TOKEN_OBJECT_STRINGIFY,
} from "../const/";
import {
  formattingCategory,
  formattingEventRecurring,
  formattingEvent,
  getOauthToken,
} from "../helpers/index.js";

export const useGetEvents = (currentDateMonth) => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState(["All Categories"]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  const currentMonth = dayjs(currentDateMonth).format("YYYY-MM");

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

            const categories = formattingCategory(events);
            setEvents((prev) => {
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
            setCategory(categories);
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
    category,
    filteredEvents,
    isLoadingEvents,
    setFilteredEvents,
  };
};
