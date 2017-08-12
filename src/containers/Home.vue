<template>
  <section class="activity">
    <header>
      <h1>Log Your Activity</h1>
    </header>
    <section>
      <div
        v-if="!hasObjective">
        You have not created any objective yet. <br />
        <router-link class="btn primary" to="/objective">Create Objective</router-link>
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
        <button
          v-on:click="checkout"
          v-if="currentActivity != null">
          Check Out
        </button>
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
  </section>
</template>

<script>
import storage from '@/helpers/storage';
import CustomPopup from '@/components/CustomPopup';

export default {
  components: {
    CustomPopup,
  },
  name: 'Home',
  data() {
    const objectives = storage.objective.fetch();
    return {
      checkinActive: false,
      hasObjective: objectives !== null && Object.keys(objectives).length > 0,
      objectives,
      selectedObjective: '',
      currentActivity: storage.activity.getCurrentActivity(),
    };
  },
  methods: {
    openCheckin() {
      this.checkinActive = true;
    },
    closeCheckin() {
      this.checkinActive = false;
    },
    checkin() {
      const startTime = new Date().getTime();
      const objectiveId = this.selectedObjective;
      if (!objectiveId) return;
      storage.activity.checkin(objectiveId, {}, startTime);
      this.currentActivity = storage.activity.getCurrentActivity();
      this.checkinActive = false;
    },
    checkout() {
      if (!this.currentActivity) return;
      const endTime = new Date().getTime();
      storage.activity.checkout(endTime);
      this.currentActivity = storage.activity.getCurrentActivity();
    },
  },
  filters: {
    displayTime(time) {
      return `${time.getHours()}:${time.getMinutes()}`;
    },
  },
};
</script>

<style scoped></style>
