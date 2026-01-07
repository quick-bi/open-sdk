<template>
  <div class="custom-page">
    <h1>Custom Page</h1>
    <h3>Everything is created by yourself</h3>
  </div>
</template>

<script lang="ts">
export default {
  props: ['container', 'customProps'],
};
</script>

<style lang="sass">
.custom-page {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
