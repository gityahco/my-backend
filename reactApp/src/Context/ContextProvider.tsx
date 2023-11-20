import React, { ReactNode, createContext, useContext, useState } from "react";

interface User {
  // Define the structure of the user object
  id: string;
  name: string;
  // ... other properties
}

interface StateContextProps {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
}

const StateContext = createContext<StateContextProps>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider: React.FC<{children: ReactNode}>= ({ children }) => {
  const [user, setUser] = useState<User >({
    name: 'John',
    id: 'asdf'
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem('ACCESS_KEY'));

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("ACCESS_TOKEN", newToken);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken: handleSetToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
