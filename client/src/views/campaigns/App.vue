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
