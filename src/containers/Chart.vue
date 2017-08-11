<template>
  <section class="chart">
    <line-chart
      :width="400"
      :height="200"
      :chart-data="dataCollection">
    </line-chart>
  </section>
</template>

<script>
import LineChart from '@/components/LineChart';

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      dataCollection: {
        labels: ['1', '2'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [121321, 4214314],
          },
          {
            label: 'Data Two',
            backgroundColor: '#CCCCCC',
            data: [31321, 43143214],
          },
        ],
      },
    };
  },
};
// {
//   label: 'Data One',
//   backgroundColor: '#f87979',
//   data: [121321, 4214314],
// },
// {
//   label: 'Data Two',
//   backgroundColor: '#CCCCCC',
//   data: [31321, 43143214],
// },
</script>

<style lang="scss" scoped>
.chart {
  width: 900px;
  margin: 0 auto;
}
</style>
