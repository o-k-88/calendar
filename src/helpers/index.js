import { current } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { API_HOST, TOKEN_OBJECT } from "../const";
export const overflowHidden = (param) => (document.body.style.overflow = param ? "auto" : "hidden"); // This functiom is used to hide the overflow of the body when a modal is open

// export const formattingEvent = (data) => {
//   const events = data.map(({ field_start_date, title, field_description, field_category, nid }) => {
//     if (field_start_date === "") {
//       return {};
//     }
//     const regex_data = /datetime="([^"]+)"/;
//     let matchTime = field_start_date.match(regex_data);

//     let currentHour = matchTime[1].split("T")[1].slice(0, 2);
//     let currentMinute = matchTime[1].split("T")[1].slice(3, 5);
//     let currentTime = dayjs().set("hour", currentHour).set("minute", currentMinute);

//     const regex = /<time[^>]*>(\d+)<\/time>/;
//     let matchData = field_start_date.match(regex)[1];
//     let date = new Date(Number(matchData) * 1000);
//     /*currentDate*/
//     let currentFormatDate = field_start_date.match(regex)[1];
//     const currentDate = new Date(Number(currentFormatDate) * 1000);

//     return {
//       id: nid,
//       title,
//       time: currentTime.format("hh:mm A"),
//       description: field_description,
//       date: `${date.getFullYear()}${date.getMonth()}${date.getDate()}`,
//       currentDate: currentDate,
//       category: field_category,
//     };
//   });

//   return events;
// };

export const formattingEvent = (data) => {
  const events = data.map(
    ({
      field_start_date,
      field_end_date,
      title,
      field_description,
      field_category,
      nid,
      path,
      uid,
      uuid,
      status,
    }) => {
      if (field_start_date === "") {
        return {};
      }
      const dateFromStr = new Date(field_start_date.replace(" ", "T") + "Z");
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
      "Content-Type": "application/json",
    },
    body: JSON.stringify(TOKEN_OBJECT),
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
