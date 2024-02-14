import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Create a context to manage global state
export const Context = createContext({
  isAuthorized: false,
});

// Main component to wrap the App component and provide global state using Context API
const AppWrapper = () => {
  // Initialize state for authorization and user details
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  // Provide global state values to the App component using Context.Provider
  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      {/* Render the main App component */}
      <App />
    </Context.Provider>
  );
};

// Use React.createRoot to render the AppWrapper component
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Render the AppWrapper component */}
    <AppWrapper />
  </React.StrictMode>
);
