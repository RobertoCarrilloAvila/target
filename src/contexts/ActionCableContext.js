import { createContext, useState, useEffect, useMemo } from 'react';
import * as ActionCable from '@rails/actioncable';

import UserService from 'services/userService';

const ActionCableContext = createContext();

const ActionCableContextProvider = ({ children }) => {
  const [cable, setCable] = useState(null);
  const { id: userId, email } = UserService.userData() || {};

  const socketUrl = useMemo(() => {
    const urlParams = new URLSearchParams({ user: userId, uid: email });
    return `${process.env.REACT_APP_ACTIONCABLE_HOST}?${urlParams}`;
  }, [userId, email]);

  useEffect(() => {
    const cable = ActionCable.createConsumer(socketUrl);
    setCable(cable);

    return () => {
      if (cable) cable.disconnect();
    };
  }, [socketUrl]);

  return (
    <ActionCableContext.Provider value={{ cable }}>
      {children}
    </ActionCableContext.Provider>
  );
};

export { ActionCableContext, ActionCableContextProvider };
