<template>
  <div id="app">
    <h1>Gmail API demo</h1>

    <button id="authorize-button" class="btn btn-primary hidden" @click="handleAuthClick">Authorize</button>

    <table class="table table-striped table-inbox hidden">
      <thead>
        <tr>
          <th>From</th>
          <th>Subject</th>
          <th>Date/Time</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "app",
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
        loadGmailApi();
      }
    }
  }
};
</script>

<style scoped>
</style>
