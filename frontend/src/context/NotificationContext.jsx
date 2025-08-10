import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(null);

  return <NotificationContext.Provider value={{ notifications, setNotifications }}>{children}</NotificationContext.Provider>;
};
