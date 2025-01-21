import dayjs from "dayjs";

export const eventItem = (obj) => {
	// const regex_data = /datetime="([^"]+)"/;
	// let matchTime = obj.field_start_date.match(regex_data);
	// let currentHour = matchTime[1].split("T")[1].slice(0, 2);
	// let currentMinute = matchTime[1].split("T")[1].slice(3, 5);
	// let currentTime = dayjs().set("hour", currentHour).set("minute", currentMinute);
	// const regex = /<time[^>]*>(\d+)<\/time>/;
	// let matchData = obj.field_start_date.match(regex)[1];
	// let date = new Date(Number(matchData) * 1000);
	
	return {
		title: obj.title.value,
		time: obj.field_start_date.value,
		description: obj.field_description.value,
		date: obj.field_start_date.value,
		currentDate: `<time datetime="${obj.field_start_date.value}">1737662820</time>`,
		category: obj.field_category.value,
	};
}

/*
* field_end_date
:
"<time datetime=\"2025-01-23T20:07:00Z\">1737662820</time>\n"
field_start_date
:
"<time datetime=\"2025-01-23T20:07:00Z\">1737662820</time>\n"
* */

/*<time datetime=\"2025-01-23T20:07:00Z\">1737662820</time>\n*/
