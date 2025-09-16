export const API_HOST_DEV = "https://hybridcal.dev.sunyempire.edu";
export const API_HOST = "https://admin.calendar.sunyempire.edu";

export const ONGOING_EVENTS_API =
  "https://admin.calendar.sunyempire.edu/api/v2/calendar/ongoing/2025-04?_format=json";

export const ongoingEventsUrl = (host, date) =>
  `${host}/api/v2/calendar/ongoing/${date}?_format=json`;

/**
 *
 * @param {string} host - The API host URL
 * @param {string} date - The date in YYYY-MM format
 * @returns {string}
 */
export const recurringUrl = (host, date) =>
  `${host}/api/v2/calendar/event/recurring/${date}?_format=json`;

export const eventsUrl = (host, date) => `${host}/api/v2/calendar/event/${date}?_format=json`;

// https://admin.calendar.sunyempire.edu/api/v2/calendar/event/2025-02?_format=json --- events for month
// https://hybridcal.dev.sunyempire.edu/api/v2/calendar/event/recurring/2025-09?_format=json --- recurring events for month

export const TOKEN_OBJECT_DEV = {
  grant_type: "password",
  client_id: "IX9W9VGvHK0QcMYpqBby3UAe-c_kAg4enINuDlwMo_E",
  client_secret: "ThisIsASecret123!",
  username: "content_creator@sunyempire.edu",
  password: "Password123!",
};

export const TOKEN_OBJECT = {
  grant_type: "client_credentials",
  client_id: "3vZpK7y1CbEZ9J3Yhdd3_QIiClT8C-v4TZQmosgoke4",
  client_secret: "ThisIsASecret123!",
  scope: "content_editor",
  username: "content_creator@sunyempire.edu",
  password: "Password123!",
};

export const TOKEN_OBJECT_STRINGIFY = new URLSearchParams(TOKEN_OBJECT).toString();
export const TOKEN_OBJECT_STRINGIFY_DEV = new URLSearchParams(TOKEN_OBJECT_DEV).toString();
