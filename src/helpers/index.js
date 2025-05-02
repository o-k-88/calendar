import { current } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { API_HOST, TOKEN_OBJECT, TOKEN_OBJECT_STRINGIFY } from "../const";
export const overflowHidden = (param) => (document.body.style.overflow = param ? "auto" : "hidden"); // This functiom is used to hide the overflow of the body when a modal is open

export const formattingEvent = (data) => {
  const events = data.map(
    ({
      start_date: field_start_date,
      end_date: field_end_date,
      title,
      field_description,
      field_category,
      field_location,
      nid,
      path,
      uid,
      uuid,
      status,
    }) => {
      if (field_start_date === "") {
        return {};
      }
      const dateFromStr = new Date(field_start_date);

      const formattedTime = dateFromStr.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const year = dateFromStr.getFullYear();
      const month = dateFromStr.getMonth(); // getMonth() is zero-based
      const day = dateFromStr.getDate();

      // Format as "YYYYDMM"
      const formattedDate = `${year}${month}${day}`;

      return {
        currentDate: dateFromStr,
        time: formattedTime,
        date: formattedDate,
        id: nid,
        title,
        description: field_description,
        category: field_category,
        field_location,
        path,
        uid,
        uuid,
        status,
        field_end_date,
      };
    }
  );

  return events;
};

export const formattingCategory = (data) => {
  const categoriesArray = data
    .map((item) => item.category ?? "") // Use optional chaining and default to an empty string
    .filter((category) => category !== ""); // Remove empty strings immediately

  const uniqueCategories = [...new Set(categoriesArray)];

  const formattedCategories = uniqueCategories.map((item) =>
    item.includes("&#039;") ? item.replace("&#039;", "'") : item
  );

  return ["All Categories", ...formattedCategories];
};

export const getTokenFromCurrentUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get("token");
};

export const getOauthToken = () => {
  return fetch(`${API_HOST}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: TOKEN_OBJECT_STRINGIFY,
  }).then((response) => response.json());
};

export async function getAllFormattedEvents(totalPages, token) {
  try {
    const requests = totalPages.map(async (url) => {
      return await sendRequest(url, "GET", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    });

    const eventsResponse = await Promise.allSettled(requests);
    const events = eventsResponse.map(({ value }) => value.response.rows).flat();

    const formattedEvents = formattingEvent(events);
    return formattedEvents;
  } catch (e) {
    console.log(e.message);
  }
}

export async function sendRequest(url, method = "GET", options) {
  const response = await fetch(url, {
    method: method,
    ...options,
  });
  return response.json();
}

export const sortEventsByTime = (data) => {
  const sortedEvents = data.sort((a, b) => {
    const timeA = new Date(a.currentDate).getTime();
    const timeB = new Date(b.currentDate).getTime();
    return timeA - timeB;
  });

  return sortedEvents;
};
