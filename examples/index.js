import Vue from "vue";

import App from "./app";

new Vue({
  el: document.body.appendChild(document.createElement("div")),
  render: h => h(App)
});
