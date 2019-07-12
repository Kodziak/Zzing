<template>
  <div class="dropdown">
    <select v-model="selected" @change="optValue($event)">
      <option v-for="(option, id) in options" :key="id" :value="option.value">
        {{ option.value }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      options: [
        {
          id: 1,
          value: "Food"
        },
        {
          id: 2,
          value: "Bills"
        },
        {
          id: 3,
          value: "Car"
        },
        {
          id: 4,
          value: "Other"
        }
      ],
      selected: ""
    };
  },
  methods: {
    optValue(event) {
      this.$emit("optvalue", this.selected);
    }
  }
};
</script>

<style lang="scss" scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 300px;
  height: 30px;
  font-size: 16px;
  background: white;
  border: 1px solid grey;
  border-radius: 0;
  padding: 5px;
}
</style>
