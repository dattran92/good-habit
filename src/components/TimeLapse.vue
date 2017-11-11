<template>
  <span v-if="secondLapsed != 0">
    {{ secondLapsed | displayTimeLapsed }}
  </span>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';

export default {
  name: 'TimeLapse',
  data() {
    return {
      secondLapsed: 0,
    };
  },
  props: {
    startTime: Number,
    interval: {
      default: 1000,
      type: Number,
    },
  },
  beforeMount() {
    this.intervalInstance = setInterval(() => {
      const now = new Date().getTime();
      const startTime = this.startTime;
      this.secondLapsed = now - startTime;
      Vue.console.debug('second lapsed', this.secondLapsed);
    }, this.interval);
  },
  beforeDestroy() {
    clearInterval(this.intervalInstance);
  },
  filters: {
    displayTimeLapsed(secondLapsed) {
      return moment.utc(secondLapsed).format('HH:mm:ss');
    },
  },
};
</script>

<style lang="scss" scoped></style>
