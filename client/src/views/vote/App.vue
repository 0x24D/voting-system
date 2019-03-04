<template>
  <div id="app">
    <!--div v-if="authenticated()"-->
      <Vote/>
    <!--/div>
    <div v-else>
      <h1>Please login to view this page</h1>
    </div-->
  </div>
</template>

<script>
import Vote from "../../components/Vote.vue";

export default {
  name: "app",
  components: {
    Vote,
  },
  methods: {
    // see if the user is authenticated
    authenticated() {
      return localStorage.token;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
