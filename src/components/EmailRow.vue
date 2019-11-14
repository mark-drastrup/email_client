<template>
  <tr class="table__row">
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
.table__row:hover {
  background-color: #f5f5f5;
}

.table__row {
  background-color: #fff;
}

.table__row td {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 15px;
  cursor: pointer;
}

.table__row td:first-child {
  border-left: 1px solid black;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.table__row td:last-child {
  border-right: 1px solid black;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>