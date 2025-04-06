# Search Places App

Search Places allows users to search cities with decent UI using GeoDB API. It is responsive and supports pagination, keyboard shortcuts, and result customization.

## Features

- Responsive search interface
- Pagination with page selection
- Limit API result count (5–10)
- Keyboard shortcut: `Ctrl/Cmd + /` focuses search
- Country flags fetched from `https://flagsapi.com/`
- Debounced search (500ms delay)

## Tech Stack

- React
- Axios for API requests
- Vanilla CSS for styling (no framework)

## Getting Started

```bash
# Clone the repo

npm install
npm run dev
```

## Folder Structure

```text
src/
├── App.jsx
├── App.css
├── components/
│   ├── SearchBox.jsx
│   ├── ResultsTable.jsx
│   ├── PaginationControls.jsx
│   ├── SearchBox.css
│   ├── ResultsTable.css
│   └── PaginationControls.css
```

## API Reference

- Base URL: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`
- Required headers:

  ```json
  {
    "x-rapidapi-key": "YOUR_API_KEY",
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
  }
  ```

- Query params:
  - `namePrefix`: Search term
  - `limit`: Number of results (5–10)
  - `offset`: Pagination offset

## Bonus Functionality

- API calls are debounced to avoid firing on every keystroke
- User can customize number of items shown in table (default 3)

## Responsive Design

All views are responsive down to 300px width.

---
