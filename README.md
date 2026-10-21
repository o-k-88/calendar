# SUNY Empire Events Calendar

A React single-page app for browsing the SUNY Empire State University events calendar. It pulls events, recurring events and categories from the university's Drupal calendar API (`admin.calendar.sunyempire.edu`). Visitors can browse by month, filter by category, search events and open event details. Staff can sign in with Microsoft (Azure AD) SSO to add events.

**Owner and author:** Oleh Kyrylenko ([@o-k-88](https://github.com/o-k-88))

---

## Features

- **Month calendar view.** Built on `react-datepicker`. Days with events are marked, and the events for the selected day are shown in a sidebar sorted by time, with a header image for each month.
- **Today / Month navigation.** Jump to today or open a month picker.
- **Category filter.** Categories are loaded from the API (`/api/v2/calendar/categories`).
- **Search.** Matches text in an event's title, description or category, with an optional start/end date range.
- **Event details modal.** Opens when you click an event.
- **Regular and recurring events.** Both are fetched for each month and combined.
- **Quick links.** Term calendar bookmark PDFs for 2025–26, 2026–27 and 2027–28, plus the Diversity, Equity & Inclusion calendar on SharePoint.
- **SSO login (staff).** Opening the app with `/?sso=esc2902931876` shows a Login button that redirects to Microsoft login. The returned `?token=` JWT is decoded with `jwt-decode`, saved in `sessionStorage`, and turns on the user info, **Log out** and **Add event** actions in the header. **Add event** links to the Drupal admin.

## Tech stack

| Area      | Tools                                                  |
| --------- | ------------------------------------------------------ |
| Framework | React 18, Vite 6                                       |
| Routing   | React Router 7                                         |
| State     | React Context (`src/context`), custom hooks            |
| Forms     | Formik                                                 |
| UI        | react-datepicker, react-select, Bootstrap 5, SCSS      |
| Utilities | dayjs, classnames, jwt-decode, prop-types              |
| Tooling   | ESLint 9 (react, react-hooks, react-refresh plugins)   |

Redux Toolkit is installed but not used yet.

## Getting started

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
├── main.jsx            # entry point: BrowserRouter + ContextProvider
├── App.jsx             # renders PageCalendar
├── containers/
│   └── PageCalendar/   # main page: wires the hooks, calendar, sidebar and modals together
├── composition/        # feature components
│   ├── DatePicker/         # calendar, navigation bar, category select
│   ├── ModalCalendar/      # event details
│   ├── ModalSearch/        # search form and results
│   ├── ModalCreateEvent/   # create-event form (currently turned off)
│   ├── ModalOngoingEvents/
│   ├── FormCreateEvent/
│   └── LoginForm/
├── components/         # shared UI: Button, Modal, Portal, Header, Footer,
│                       # EventSideBar, Loader, Container
├── layout/             # Layout and Widget wrappers
├── hooks/
│   ├── useGetEvents.js          # fetch, merge and filter events for a month
│   ├── useGetCategories.js      # fetch categories
│   ├── useDatePickerNavigate.js # search filtering
│   ├── useLogin.js / useLogout.js
├── context/            # app-wide auth/user state
├── helpers/            # event formatting, OAuth token request, sorting
└── constants/          # API hosts, endpoint builders, auth config
```

These path aliases are set in `vite.config.js` and `jsconfig.json`: `components`, `composition`, `containers`, `constants`, `helpers`, `hooks`, `context` and `layout`. For example: `import Header from "components/Header/Header"`.

## API

The endpoints are defined in `src/constants/index.js`:

| Purpose          | Endpoint                                               |
| ---------------- | ------------------------------------------------------ |
| OAuth token      | `POST {host}/oauth/token`                              |
| Monthly events   | `GET {host}/api/v2/calendar/event/{YYYY-MM}`           |
| Recurring events | `GET {host}/api/v2/calendar/event/recurring/{YYYY-MM}` |
| Ongoing events   | `GET {host}/api/v2/calendar/ongoing/{YYYY-MM}`         |
| Categories       | `GET {host}/api/v2/calendar/categories`                |

Hosts: production `https://admin.calendar.sunyempire.edu`, development `https://hybridcal.dev.sunyempire.edu`.

## Deployment

`npm run build` writes a static bundle to `dist/`. `public/_redirects` (`/* /index.html 200`) sends every route to `index.html`, so client-side routing works on Netlify-style hosts.

## Owner

This project is owned and maintained by **Oleh Kyrylenko** ([@o-k-88](https://github.com/o-k-88)).
Repository: <https://github.com/o-k-88/calendar>

© Oleh Kyrylenko. All rights reserved. No license is granted to use, copy or redistribute this code without the owner's permission.
