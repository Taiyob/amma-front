'use client';

import {Provider} from 'react-redux';
import {persistor, store} from '@/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import IdleLogoutManager from '@/components/auth/IdleLogoutManager';

const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <IdleLogoutManager />
      </PersistGate>
    </Provider>
  );
};

export default Providers;
