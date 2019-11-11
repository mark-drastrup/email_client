<template>
  <tr>
    <td>{{showHeader("From")}}</td>
    <td>{{showHeader("Subject")}}</td>
    <td>{{showHeader("Date")}}</td>
  </tr>
</template>

<script>
import { extractHeader, decodeMessageBody } from "../utilities/index";
export default {
  name: "EmailRow",
  props: {
    email: Object
  },
  methods: {
    showHeader(type) {
      return extractHeader(this.email.result.payload.headers, type);
    }
  }
};
</script>

<style scoped>
</style>