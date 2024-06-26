// globalContext.js (Global Context)
import React, { createContext, useContext, useState } from 'react';
import { OnboardingContext } from '../(onboarding)/page';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({});

  // Accessing state from AuthContext
  const { isLoggedIn, user, state } = useContext(OnboardingContext);

  // You can perform any actions with auth state here and update globalState accordingly

  // Example: If user is logged in, update global state
  if (isLoggedIn && user) {
    setGlobalState({ ...globalState, user });
  }

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};
