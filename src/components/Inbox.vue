<template>
  <div v-if="currentEmail !== null">
    <p>Current email</p>
  </div>
  <table class="table" v-else>
    <thead>
      <tr>
        <th>From</th>
        <th>Subject</th>
        <th>Date/Time</th>
      </tr>
    </thead>
    <tbody>
      <email-row v-for="email in emails" :key="email.result.id" :email="email" />
    </tbody>
  </table>
</template>

<script>
import emailRow from "./EmailRow.vue";
export default {
  name: "Inbox",
  props: {
    emails: Array
  },
  components: {
    emailRow
  },
  computed: {
    currentEmail() {
      return this.$store.state.currentEmail;
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  border-collapse: separate;
  border-spacing: 0 5px;
}
</style>