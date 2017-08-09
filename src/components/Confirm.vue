<template>
  <custom-popup
    @close="closePopup"
    v-bind:title="title">
    <section>
      <div class="content">
        {{ message }}
      </div>
    </section>
    <footer>
      <button v-on:click="confirmIt" class="primary">OK</button>
      <button v-on:click="closePopup">Cancel</button>
    </footer>
  </custom-popup>
</template>

<script>
import CustomPopup from '@/components/CustomPopup';

export default {
  components: {
    CustomPopup,
  },
  name: 'Confirm',
  props: [
    'close',
    'confirm',
    'message',
    'title',
  ],
  methods: {
    closePopup() {
      this.$emit('close');
    },
    confirmIt() {
      this.$emit('confirm');
    },
  },
};
</script>

<style lang="scss" scoped></style>
