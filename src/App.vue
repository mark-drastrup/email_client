<template>
  <div id="app">
    <h1>Gmail API demo</h1>

      <button id="authorize-button" class="btn btn-primary hidden">Authorize</button>

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
  name: 'app',
  mounted () {
    console.log(process.env.VUE_APP_CLIENT_ID)
    console.log(process.env.VUE_APP_API_KEY)
  }
}
</script>

<style scoped>

</style>
