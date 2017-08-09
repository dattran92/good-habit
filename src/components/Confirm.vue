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

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: visible;
  opacity: 1;

  .popup {
    margin: 70px auto;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    width: 30%;
    position: relative;
    transition: all 5s ease-in-out;

    h2 {
      margin-top: 0;
      color: #333;
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 14px;
    }

    .close {
      position: absolute;
      top: 20px;
      right: 30px;
      transition: all 200ms;
      font-size: 30px;
      font-weight: bold;
      text-decoration: none;
      color: #333;

      &:hover {
        color: #06D85F;
      }
    }

    .content {
      max-height: 30%;
      overflow: auto;
    }

    footer {
      margin-top: 10px;
    }

    button {
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 14px;
      padding: 8px 16px;

      &.primary {
        background: red;
      }
    }
  }
}

@media screen and (max-width: 700px){
  .popup {
    width: 70%;
  }
}
</style>
