<template>
  <div class="custom-page">
    <h1>My Custom Page</h1>
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
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
