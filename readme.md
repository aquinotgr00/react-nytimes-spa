# React NYTimes SPA

A single-page application built with React that displays top articles from The New York Times using their public API.

## 📌 Features

- Fetches and displays top news stories
- Responsive, mobile-friendly layout
- Basic error handling and loading states

## 🛠️ Prerequisites

- Node.js v14+ and npm/yarn installed
- A New York Times API key (get one from [https://developer.nytimes.com/](https://developer.nytimes.com/))

## 🚀 Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/aquinotgr00/react-nytimes-spa.git
    cd react-nytimes-spa
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up the API key:**
   - Create a file `.env.local` in the project root with:
     ```dotenv
     VITE_NYT_API_KEY=YOUR_API_KEY_HERE
     ```

4. **Run the app in development mode:**
    ```bash
    npm start
    # or
    yarn start
    ```
   Visit `http://localhost:3000` in your browser.

## 🧪 Available Scripts

- `npm start` — runs the app in development mode.
- `npm test` — launches the test runner (if tests are configured).
- `npm run build` — bundles the app for production (to `build/` folder).
- `npm run lint` — checks for linting issues (if ESLint is set up).

## 📄 License

This project is open‑source under the [MIT License](LICENSE).

---