import React, { createContext, useContext, useState } from 'react';

const CommentUpdateContext = createContext();

export const useCommentUpdate = () => useContext(CommentUpdateContext);

export const CommentUpdateProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);

  const triggerUpdate = () => {
    setUpdate((prev) => !prev); // Toggle to trigger useEffect
  };

  return (
    <CommentUpdateContext.Provider value={{ triggerUpdate }}>
      {children}
    </CommentUpdateContext.Provider>
  );
};
