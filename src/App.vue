<template>
  <div id="app">
    <h1>Gmail API demo</h1>
    <inbox :emails="emails" />
    <button id="authorize-button" class="btn btn-primary hidden" @click="handleAuthClick">Authorize</button>
    <button id="authorize-button" class="btn btn-primary hidden" @click="displayInbox">Display inbox</button>
  </div>
</template>

<script>
import inbox from "./components/Inbox.vue";
import { extractHeader, decodeMessageBody } from "@/utilities/index.js";
export default {
  name: "app",
  data() {
    return {
      emails: []
    };
  },
  components: {
    inbox
  },
  mounted() {
    this.$nextTick(() => {
      this.handleClientLoad();
    });
  },
  methods: {
    handleClientLoad() {
      setTimeout(() => {
        gapi.client.setApiKey(process.env.VUE_APP_API_KEY);
        window.setTimeout(this.checkAuth, 1);
      }, 500);
    },
    checkAuth() {
      gapi.auth.authorize(
        {
          client_id: process.env.VUE_APP_CLIENT_ID,
          scope: "https://www.googleapis.com/auth/gmail.readonly",
          immediate: true
        },
        this.handleAuthResult
      );
    },
    handleAuthClick() {
      gapi.auth.authorize(
        {
          client_id: process.env.VUE_APP_CLIENT_ID,
          scope: "https://www.googleapis.com/auth/gmail.readonly",
          immediate: false
        },
        this.handleAuthResult
      );
      return false;
    },
    handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        this.loadGmailApi();
      }
    },
    loadGmailApi() {
      gapi.client.load("gmail", "v1", this.displayInbox);
    },
    displayInbox() {
      var request = gapi.client.gmail.users.messages.list({
        userId: "me",
        labelIds: "INBOX",
        maxResults: 10
      });

      request.execute(response => {
        const messages = [];
        response.messages.forEach(async message => {
          let messageRequest = await gapi.client.gmail.users.messages.get({
            userId: "me",
            id: message.id
          });
          //this.appendMessageRow(messageRequest);
          messages.push(messageRequest);
        });
        this.emails = messages;
      });
    },
    appendMessageRow(message) {
      const from = extractHeader(message.result.payload.headers, "From");
      const messageContent = decodeMessageBody(message);
    }
  }
};
</script>

<style scoped>
</style>
