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
