import dayjs from "dayjs";

export const overflowHidden = (param) => (document.body.style.overflow = param ? "auto" : "hidden"); // This functiom is used to hide the overflow of the body when a modal is open

export const formattingEvent = (data) => {
  const events = data.map(({ field_start_date, title, field_description, field_category, nid }) => {
    const regex_data = /datetime="([^"]+)"/;
    let matchTime = field_start_date.match(regex_data);
    let currentHour = matchTime[1].split("T")[1].slice(0, 2);
    let currentMinute = matchTime[1].split("T")[1].slice(3, 5);
    let currentTime = dayjs().set("hour", currentHour).set("minute", currentMinute);
    const regex = /<time[^>]*>(\d+)<\/time>/;
    let matchData = field_start_date.match(regex)[1];
    let date = new Date(Number(matchData) * 1000);

    return {
      id: nid,
      title,
      time: currentTime.format("hh:mm A"),
      description: field_description,
      date: `${date.getFullYear()}${date.getMonth()}${date.getDate()}`,
      currentDate: field_start_date,
      category: field_category,
    };
  });
  return;
};

export const formattingCategory = (data) => {
  const categoriesArray = new Set([...data]);
  const removeEmptyString = [...categoriesArray].filter((item) => item !== "");
  const removeSymbol = removeEmptyString.map((item) => {
    if (item.includes("&#039;")) {
      return item.replace("&#039;", "'");
    }
    return item;
  });

  return removeSymbol;
};
