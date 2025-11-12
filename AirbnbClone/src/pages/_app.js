import "@/styles/globals.css";
import { Provider } from 'react-redux';
import store from '../store/store';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function App({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
  );
}
