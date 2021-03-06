<template>
  <section class="activity">
    <header>
      <h1 class="main-header">Log Your Activity</h1>
    </header>
    <section class="main-content">
      <div
        v-if="!hasObjective">
        <div>
          <span class="alert">
            You have not created any objective yet.
          </span>
        </div>
        <router-link class="btn primary" to="/objective/">CREATE OBJECTIVE</router-link>
      </div>
      <div v-if="hasObjective">
        <button
          class="primary"
          v-on:click="openCheckin"
          v-if="currentActivity == null">
          Check In
        </button>
        <div
          v-if="currentActivity != null">
          <span>You have started </span>
          <b>{{ objectives[currentActivity.objectiveId] }}</b>
          <span> since </span>
          <b>{{ new Date(currentActivity.startTime) | displayTime }}</b>
        </div>
        <div class="time-lapsed" v-if="currentActivity != null">
          <time-lapse v-bind:start-time="currentActivity.startTime" />
        </div>
        <button
          v-on:click="openCheckout"
          v-if="currentActivity != null">
          Check Out
        </button>
      </div>
      <div class="introduction">
        <h2 class="header">GOOD HABIT</h2>
        <div class="content">
          <b>As usual,</b> we have a lot of activities (reading, gymnastic, football, studying guitar, ...) in mind to make our life better.
          However, the more <b>objectives</b> you put, the <b>lazier</b> you are.<br /><br />

          So, Why not to write it down and have a plan to establish <b>Good Habit</b>?<br />
        </div>
        <h2 class="header">HOW?</h2>
        <div class="content">
          Basically, we have 3 actions:
          <ul class="guideline">
            <li>
              Create new <b><router-link to="/objective/">OBJECTIVE</router-link></b>.
            </li>
            <li>
              <b>CHECKIN</b> every time you begin the objective.
            </li>
            <li>
              <b><router-link to="/chart/">REVIEW</router-link></b> your activity logs last month.
            </li>
          </ul>
        </div>
      </div>
    </section>
    <custom-popup
      v-if="checkinActive"
      @close="closeCheckin"
      title="Check in your activity">
      <section>
        <select
          v-model="selectedObjective">
          <option value="">Select Objective</option>
          <option
            v-for="(objective, index) in objectives"
            v-bind:value="index">
            {{ objective }}
          </option>
        </select>
        <input
          type="text"
          class="time-input"
          v-model:value="checkinTime"
          placeholder="YYYY-MM-DD HH:mm:ss" />
      </section>
      <footer>
        <button
          class="primary"
          v-if="selectedObjective"
          v-on:click="checkin">
          Check In
        </button>
        <button
          v-on:click="closeCheckin"
          >
          Cancel
        </button>
      </footer>
    </custom-popup>
    <custom-popup
      v-if="checkoutActive"
      @close="closeCheckout"
      title="Check out your activity">
      <section>
        <p>
          <span>You have started </span>
          <b>{{ objectives[currentActivity.objectiveId] }}</b>
          <span> since </span>
          <b>{{ new Date(currentActivity.startTime) | displayTime }}</b>
        </p>
        <input
          type="text"
          class="time-input"
          v-model:value="checkoutTime"
          placeholder="YYYY-MM-DD HH:mm:ss" />
      </section>
      <footer>
        <button
          class="primary"
          v-on:click="checkout">
          Check Out
        </button>
        <button
          v-on:click="closeCheckout"
          >
          Cancel
        </button>
      </footer>
    </custom-popup>
  </section>
</template>

<script>
import moment from 'moment';
import storage from '@/helpers/storage';
import CustomPopup from '@/components/CustomPopup';
import TimeLapse from '@/components/TimeLapse';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export default {
  components: {
    CustomPopup,
    TimeLapse,
  },
  name: 'Home',
  data() {
    const objectives = storage.objective.fetch();
    return {
      checkinActive: false,
      checkoutActive: false,
      hasObjective: objectives !== null && Object.keys(objectives).length > 0,
      objectives,
      selectedObjective: '',
      currentActivity: storage.activity.getCurrentActivity(),
      checkinTime: null,
    };
  },
  methods: {
    openCheckin() {
      this.checkinActive = true;
      this.checkinTime = moment().format(TIME_FORMAT);
    },
    closeCheckin() {
      this.checkinActive = false;
    },
    checkin() {
      const startTime = moment(this.checkinTime, TIME_FORMAT).valueOf();
      const objectiveId = this.selectedObjective;
      if (!objectiveId) return;
      storage.activity.checkin(objectiveId, {}, startTime);
      this.currentActivity = storage.activity.getCurrentActivity();
      this.checkinActive = false;
    },
    openCheckout() {
      this.checkoutActive = true;
      this.checkoutTime = moment().format(TIME_FORMAT);
    },
    closeCheckout() {
      this.checkoutActive = false;
    },
    checkout() {
      if (!this.currentActivity) return;
      const endTime = moment(this.checkoutTime, TIME_FORMAT).valueOf();
      storage.activity.checkout(endTime);
      this.currentActivity = storage.activity.getCurrentActivity();
      this.checkoutActive = false;
    },
  },
  filters: {
    displayTime(time) {
      return `${time.getHours()}:${time.getMinutes()}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";

.introduction {
  text-align: left;
  margin-top: $base-margin * 2;
  .content {
    margin-bottom: $base-margin;
  }
}

ul.guideline {
  margin-top: $base-margin;
  li {
    list-style-type: disc;
    list-style-position: inside;
    margin-bottom: $base-margin;
  }
}

.time-lapsed {
  font-size: $heading-font-size;
  margin: $base-margin;
  font-weight: bold;
}

.main-content {
  text-align: center;
}

.alert {
  margin-bottom: $base-margin;
}

.time-input {
  margin-top: $base-margin;
}
</style>
