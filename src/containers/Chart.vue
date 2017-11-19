<template>
  <section class="chart">
    <header>
      <h1 class="main-header">Chart</h1>
    </header>
    <section class="main-content">
      <select
        class="object-selection"
        v-model="currentObjective">
        <option value="">Select Objective</option>
        <option
          v-for="(objective, index) in objectives"
          v-bind:value="index">
          {{ objective }}
        </option>
      </select>
      <line-chart
        :width="3"
        :height="2"
        :chart-data="dataCollection">
      </line-chart>
      <div class="chart-name">
        Time spent on {{ today | displayMonth }} (min/day)
      </div>
      <div class="history-box">
        <div class="box-title">
          History
        </div>
        <ul>
          <li
            v-for="(history, index) in activityHistory"
          >
            <div>
              {{ history.startTime | displayTime }}
            </div>
            <div class="used-time">
              <b>{{ history | getUsedTime }}</b> min
            </div>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash';
import moment from 'moment';

import storage from '@/helpers/storage';
import LineChart from '@/components/LineChart';

const TIME_FORMAT = 'MMM DD - HH:mm';

function getLabels() {
  const labels = [];
  const today = new Date().getDate();
  for (let i = 1; i <= today; i++) {
    labels.push(i);
  }
  return labels;
}

function getActivityHistory(objectiveId, thisMonth) {
  const activities = storage.activity.getActivities(objectiveId);
  const thisMonthActivities = activities.filter((activity) => {
    const startTime = new Date(activity.startTime);
    return startTime.getMonth() + 1 === thisMonth;
  });

  return thisMonthActivities.map(activity => ({
    ...activity,
    test: true,
  }));
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
      currentObjective: '',
    };
  },
  computed: {
    dataCollection() {
      const thisMonth = this.today.getMonth() + 1;
      const labels = getLabels();
      const objectives = this.objectives;
      const currentObjective = this.currentObjective;
      let datasets = [];
      Vue.console.debug('currentObjective', currentObjective);

      if (currentObjective) {
        datasets = [
          {
            label: objectives[currentObjective],
            backgroundColor: '#F44336',
            data: getActivityData(currentObjective, thisMonth, labels),
          },
        ];
      }
      return {
        labels,
        datasets,
      };
    },
    activityHistory() {
      const thisMonth = this.today.getMonth() + 1;
      const currentObjective = this.currentObjective;
      Vue.console.debug('test currentObjective', currentObjective);
      if (!currentObjective) {
        return [];
      }

      return getActivityHistory(currentObjective, thisMonth);
    },
  },
  filters: {
    displayMonth(date) {
      return date.toLocaleString('en-us', { month: 'long' });
    },
    displayTime(timestamp) {
      return moment(timestamp).format(TIME_FORMAT);
    },
    getUsedTime(history) {
      const minutes = (history.endTime - history.startTime) / 1000 / 60;
      return Math.round(minutes, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";

.filter-box {
  margin-bottom: $base-margin;
  li {
    display: inline-block;
    margin-right: $base-margin;
    margin-bottom: $base-margin / 2;
  }
}

.chart-name {
  width: 100%;
  text-align: center;
}

.object-selection {
  margin-bottom: $base-margin;
}

.history-box {
  margin: $base-margin 0;
  .box-title {
    padding: $base-padding;
    background: $light-grey-color;
    text-align: center;
    font-weight: bold;
  }
  ul {
    li {
      display: flex;
      padding: $base-padding;
      border-bottom: 1px solid $light-grey-color;
      margin-bottom: $base-margin / 2;

      &> div {
        flex: 1;
      }
    }
  }
}
</style>
