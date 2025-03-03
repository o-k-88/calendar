import { current } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const overflowHidden = (param) => (document.body.style.overflow = param ? "auto" : "hidden"); // This functiom is used to hide the overflow of the body when a modal is open

export const formattingEvent = (data) => {
  const events = data.map(({ field_start_date, title, field_description, field_category, nid }) => {
    if (field_start_date === "") {
      return {};
    }
    const regex_data = /datetime="([^"]+)"/;
    let matchTime = field_start_date.match(regex_data);

    let currentHour = matchTime[1].split("T")[1].slice(0, 2);
    let currentMinute = matchTime[1].split("T")[1].slice(3, 5);
    let currentTime = dayjs().set("hour", currentHour).set("minute", currentMinute);

    const regex = /<time[^>]*>(\d+)<\/time>/;
    let matchData = field_start_date.match(regex)[1];
    let date = new Date(Number(matchData) * 1000);
    /*currentDate*/
    let currentFormatDate = field_start_date.match(regex)[1];
    const currentDate = new Date(Number(currentFormatDate) * 1000);

    return {
      id: nid,
      title,
      time: currentTime.format("hh:mm A"),
      description: field_description,
      date: `${date.getFullYear()}${date.getMonth()}${date.getDate()}`,
      currentDate: currentDate,
      category: field_category,
    };
  });

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
  console.log("urlParams", urlParams);
  return urlParams.get("token");
};
