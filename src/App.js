import React from "react";
import { Provider } from "react-redux";
import store from "./lib/redux";
import InboxScreen from "./components/InboxScreen";
import "./index.css";

const App = () => (
  <Provider store={store}>
    <InboxScreen />
  </Provider>
);

export default App;
