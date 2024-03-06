import { createContext, useState, useEffect } from 'react';
import * as ActionCable from '@rails/actioncable';

import UserService from 'services/UserService';

const ActionCableContext = createContext();

const socketUrl = () => {
  const { id: userId, email } = UserService.userData() || {};
  const urlParams = new URLSearchParams({ user: userId, uid: email });
  return `${process.env.REACT_APP_ACTIONCABLE_HOST}?${urlParams}`;
};

const ActionCableContextProvider = ({ children }) => {
  const [cable, setCable] = useState(null);

  useEffect(() => {
    const cable = ActionCable.createConsumer(socketUrl());
    setCable(cable);

    return () => {
      if (cable) cable.disconnect();
    };
  }, []);

  return (
    <ActionCableContext.Provider value={{ cable, setCable }}>
      {children}
    </ActionCableContext.Provider>
  );
};

export { ActionCableContext, ActionCableContextProvider };
