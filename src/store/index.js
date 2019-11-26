import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentEmail: null
  },
  mutations: {
    setCurrentEmail(state, email) {
      state.currentEmail = email;
    }
  },
  actions: {
    async decodeEmail({ commit, dispatch }, email) {
      let encodedBody = "";
      if (email.result.payload.parts === undefined) {
        encodedBody = email.result.payload.body.data;
      } else {
        encodedBody = await dispatch(
          "extractHTMLPart",
          email.result.payload.parts
        );
      }
      encodedBody = encodedBody
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .replace(/\s/g, "");
      const message = decodeURIComponent(escape(window.atob(encodedBody)));
      commit("setCurrentEmail", message);
    },
    extractHTMLPart({ commit, dispatch }, arr) {
      for (var x = 0; x <= arr.length; x++) {
        if (typeof arr[x].parts === "undefined") {
          if (arr[x].mimeType === "text/html") {
            return arr[x].body.data;
          }
        } else {
          return extractHTMLPart(arr[x].parts);
        }
      }
      return "";
    }
  },
  modules: {}
});
