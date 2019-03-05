<template>
  <div id="success">
    <md-card>
      <div id="body">
        <h3>Thank you</h3>
        <h3>Your vote has been cast.</h3>
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
#body {
  padding: 10px;
  text-align: center;
}
#success {
  padding: 50px 500px;
}
</style>
