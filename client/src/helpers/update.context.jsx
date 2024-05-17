import React, { createContext, useContext, useState } from 'react';

const UpdateContext = createContext({
  triggerUpdate: () => {},
  updateCount: 0, // This counter will be used to trigger updates
});

export const UpdateProvider = ({ children }) => {
  const [updateCount, setUpdateCount] = useState(0);

  const triggerUpdate = () => {
    setUpdateCount((prevCount) => prevCount + 1); // Increment to trigger updates
  };

  return (
    <UpdateContext.Provider value={{ triggerUpdate, updateCount }}>
      {children}
    </UpdateContext.Provider>
  );
};

export const useUpdate = () => useContext(UpdateContext);
