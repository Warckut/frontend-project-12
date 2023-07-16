import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';

import socket from './socket';
import App from './components/App';
import resources from './locales/index';
import store, { actions } from './slices/index';
import ChatProvider from './context/ChatProvider';
import AuthProvider from './context/AuthProvider';
import config from './rollbar/config';

const { dispatch } = store;

const {
  addMessage,
  addChannel,
  removeChannel,
  renameChannel,
} = actions;

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const ruDict = filter.getDictionary('ru');
  filter.add(ruDict);

  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    dispatch(removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
  });

  return (
    <RollbarProvider config={config}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <AuthProvider>
              <ChatProvider>
                <App />
              </ChatProvider>
            </AuthProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
