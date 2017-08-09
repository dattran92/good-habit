<template>
  <section class="activity">
    <header>
      <h1>Log Your Activity</h1>
    </header>
    <section>
      <button
        v-on:click="openCheckin"
        v-if="currentActivity == null">
        Check In
      </button>
      <button
        v-on:click="checkout"
        v-if="currentActivity != null">
        Check Out
      </button>
    </section>
    <custom-popup
      v-if="checkinActive"
      @close="closeCheckin"
      title="Check in your activity">
      <section>
        hello motor
      </section>
      <footer>
        <button
          class="primary"
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
    return {
      checkinActive: false,
      objectives: storage.objective.fetch(),
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
      // const startTime = new Date().getTime();
      // const objectiveId = 123;
    },
  },
};
</script>

<style scoped></style>
