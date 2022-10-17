## OnBoardOps Frontend (ReactJS)

**Dependencies used**

- Redux - Global State Management
- Redux Thunk - Middleware for Redux
- Redux Devtools - Manage and View State using extension
- React Quill - Used for Rich Text Editor
- DayJS - To Format date and time
- Bootstrap Icons - For UI Icons
- Axios - To fetch API's
- antD - CSS library, used throughout this application for all components and stylings.
- AntdIcons - For custom rendered icons.

**Folder Structure**

- Public Folder - Contains Index html files and Favicons
- Components - Contains all chunk resuable components used for building entire application
- Layout - Contains page layouts, eg: Sidebar which is showing in all pages.
- Pages - Contains all codes for rendering all pages.
- Redux - Contains all state management stuffs including actions: for calling api, reducer: for global state.
- Router - Container the app router files
- Utils - Contains the validations and axios reusable functions

**How to run Application**

- Check/Change API url from _src/utils.js/API_URL_
- Goto root folder and type
- `npm install --legacy-peer-deps`
- `npm start`
