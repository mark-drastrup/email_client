<template>
  <table>
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
  }
};
</script>

<style scoped>
</style>