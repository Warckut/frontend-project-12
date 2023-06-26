/* eslint-disable import/no-extraneous-dependencies */
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import init from './init';
import store from './slices/index';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      {await init()}
    </Provider>,
  );
};

app();
