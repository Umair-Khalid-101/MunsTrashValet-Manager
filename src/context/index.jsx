import React, { useContext, createContext, useState } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // STATES
  const [storedCredentials, setStoredCredentials] = useState();
  const [selectedProperty, setSelectedProperty] = useState();

  return (
    <StateContext.Provider
      value={{
        storedCredentials,
        setStoredCredentials,
        selectedProperty,
        setSelectedProperty,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
