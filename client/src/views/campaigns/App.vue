<template>
  <div id="app">
    <ListOfCampaigns/>
  </div>
</template>

<script>
import ListOfCampaigns from '../../components/ListOfCampaigns.vue';

export default {
    name: 'campaigns',
    components: {
        ListOfCampaigns,
    },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
