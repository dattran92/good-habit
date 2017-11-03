<template>
  <section class="objective">
    <header>
      <h1 class="main-header">Objective</h1>
    </header>
    <section class="main-content">
      <input
        class="new-objective"
        autofocus
        autocomplete="off"
        placeholder="What's your objective"
        v-model="newObjective"
        @keyup.enter="addNew"/>
      <section class="main">
        <ul class="objective-list">
          <li v-for="(objective, index) in objectives"
            class="objective"
            :key="index">
            <span>{{ objective }}</span>
            <a v-on:click="confirmRemove(index)">&times;</a>
          </li>
        </ul>
      </section>
    </section>
    <confirm
      v-if="showConfirmRemove"
      @close="closeConfirmRemove"
      @confirm="remove"
      title="Remove Objective"
      message="Are you sure to remove this objective?">
    </confirm>
  </section>
</template>

<script>
import storage from '@/helpers/storage';
import Confirm from '@/components/Confirm';

export default {
  components: {
    Confirm,
  },
  name: 'Objective',
  data() {
    return {
      newObjective: '',
      objectives: storage.objective.fetch(),
      showConfirmRemove: false,
      currentRemoveId: null,
    };
  },
  methods: {
    addNew() {
      const newObjective = this.newObjective && this.newObjective.trim();
      this.newObjective = '';
      if (!newObjective) return;
      storage.objective.save(null, newObjective);
      this.newObjective = '';
      this.objectives = storage.objective.fetch();
    },
    confirmRemove(index) {
      this.showConfirmRemove = true;
      this.currentRemoveId = index;
    },
    closeConfirmRemove() {
      this.showConfirmRemove = false;
      this.currentRemoveId = false;
    },
    remove() {
      const index = this.currentRemoveId;
      if (!index) {
        return;
      }
      storage.objective.remove(index);
      this.objectives = storage.objective.fetch();
      this.showConfirmRemove = false;
      this.currentRemoveId = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
