import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Create a context with default values
export const Context = createContext({
  isAuthorized: false,
});

// Wrap the App component with the Context.Provider
const AppWrapper = () => {
  // State for authorization status
  const [isAuthorized, setIsAuthorized] = useState(false);
  // State for user data
  const [user, setUser] = useState({});

  return (
    // Provide the context values to the App component and its descendants
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      {/* Render the main application */}
      <App />
    </Context.Provider>
  );
};

// Render the AppWrapper component inside a root element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
