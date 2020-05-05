import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./reducers";
import ReactGA from "react-ga";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faUsers,
  faLock,
  faEdit,
  faArrowsAltH,
  faEye,
  faPencilAlt,
  faSearch,
  faUser,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css";
import "./index.css";

ReactGA.initialize("UA-136429373-5");
library.add(faGithub);
library.add(
  faUsers,
  faLock,
  faEdit,
  faArrowsAltH,
  faEye,
  faPencilAlt,
  faSearch,
  faUser,
  faStar
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
