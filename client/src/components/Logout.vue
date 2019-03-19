<template>
  <div id="logoutButton">
    <md-button class="md-raised md-primary" @click="logoutClicked()">Logout</md-button>
  </div>
</template>

<script>

export default {
  name: 'Logout',
  methods: {
    logoutClicked() {
      this.$axios
        .post('http://localhost:8081/api/v1/authentication/logout')
        .then(() => {
          delete localStorage.token;
          delete localStorage.user;
          window.location.reload();
        });
    },
  },
};
</script>
