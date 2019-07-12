<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {}
};
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  width: 180px;
  line-height: 42px;
  color: grey;
  font-size: 20px;
  text-align: center;
  vertical-align: middle;
  border-radius: 3px;
  cursor: pointer;
}
</style>
