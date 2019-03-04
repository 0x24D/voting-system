<template>
  <div class="Success">
    <md-card>
      <div id="text">
      <h3>Thank you</h3>
      <h3>Your vote has been cast.</h3>
      <h3>You can now logout of the system using the button below.</h3>

         <md-button id="logoutBtn" class="md-raised md-accent" @click="submitLogout()">Logout</md-button>
      </div>
    </md-card>
  </div>
</template>
<script>

export default {
    name: 'Success',
    methods: {
    submitLogout() {
      this.$axios
        // post to the api so logout can be processed 
        .post("http://localhost:3030/logout")
        .then(() => {
          // delete the token from browser storage
          delete localStorage.token;
          // navigate to the login screen
          window.location.href = "/login/";
        })
        .catch(error => {
          alert("Logout Failed");
        });
    }
    },
};
</script>

<style lang="scss" scoped>
#text {
  padding: 10px;
  text-align: center;
}
.Success {
  padding: 50px 500px;
}
</style>
