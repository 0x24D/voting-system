<template>
  <div id="success">
    <md-card>
      <div id="body">
        <h3>Thank you {{ name }}</h3>
        <h3>Your vote has been cast.</h3>
        <h3>You can now logout of the system using the button below.</h3>
      </div>
      <md-card-actions class="md-alignment-center">
        <Logout/>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>
import Logout from './Logout.vue';
export default {
  name: 'Success',
  data() {
    return {
      name: '',
    };
  },
  components: {
    Logout,
  },
  created() {
    this.$axios
      .get(`http://localhost:8081/api/v1/voters/${localStorage.user}`)
      .then((response) => {
        this.name = response.data.name;
    });
  },
};
</script>

<style lang="scss" scoped>
#body {
  padding: 10px;
  text-align: center;
}
#success {
  padding: 50px 500px;
}
</style>
