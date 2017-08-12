<template>
  <section class="chart">
    <ul id="filterBox">
      <li
        v-for="objective, index in objectives"
        :key="index"
      >
        <input
          type="checkbox"
          :value="index"
          v-model="currentObjectives"
          v-on:click="updateChart" />
        <label :for="index">
          {{ objective }}
        </label>
      </li>
    </ul>
    <line-chart
      :width="2"
      :height="1"
      :chart-data="dataCollection">
    </line-chart>
    <div class="chartName">
      Time spent on {{ today | displayMonth }} (min/day)
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash';
import storage from '@/helpers/storage';
import LineChart from '@/components/LineChart';

const colorList = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
];

function getLabels() {
  const labels = [];
  const today = new Date().getDate();
  for (let i = 1; i <= today; i++) {
    labels.push(i);
  }
  return labels;
}

function getColor(position) {
  return colorList[position];
}

function getActivityData(objectiveId, thisMonth, labels) {
  const activities = storage.activity.getActivities(objectiveId);
  const thisMonthActivities = activities.filter((activity) => {
    const startTime = new Date(activity.startTime);
    return startTime.getMonth() + 1 === thisMonth;
  });

  Vue.console.debug('thisMonthActivities', objectiveId, thisMonthActivities);

  const groupActivities = _.groupBy(thisMonthActivities, (activity) => {
    const startTime = new Date(activity.startTime);
    return startTime.getDate();
  });

  Vue.console.debug('groupActivities', objectiveId, groupActivities);

  const usedTime = _.mapValues(groupActivities, (list) => {
    return _.sumBy(list, (activity) => {
      return (activity.endTime - activity.startTime) / 1000;
    });
  });

  Vue.console.debug('usedTime', objectiveId, usedTime);

  // in minute
  return labels.map((label) => {
    return usedTime[label] ? Math.round(usedTime[label] / 60, 0) : 0;
  });
}

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      today: new Date(),
      objectives: storage.objective.fetch(),
      currentObjectives: [],
      dataCollection: {},
    };
  },
  methods: {
    updateChart() {
      const thisMonth = this.today.getMonth() + 1;
      const labels = getLabels();
      const objectives = this.objectives;
      const currentObjectives = this.currentObjectives;
      let datasets = [];
      Vue.console.debug('currentObjectives', currentObjectives);

      if (currentObjectives && currentObjectives.length > 0) {
        datasets = currentObjectives.map((objectiveId, index) => {
          return {
            label: objectives[objectiveId],
            backgroundColor: getColor(index),
            data: getActivityData(objectiveId, thisMonth, labels),
          };
        });
      }

      this.dataCollection = {
        labels,
        datasets,
      };
    },
  },
  filters: {
    displayMonth(date) {
      return date.toLocaleString('en-us', { month: 'long' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";

#filterBox {
  li {
    display: inline-block;
    margin-right: $base-margin;
  }
}

.chartName {
  width: 100%;
  text-align: center;
}
</style>
