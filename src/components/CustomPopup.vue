<template>
  <div class="overlay">
  	<div class="popup">
      <header>
    		<h2>{{ title }}</h2>
        <a class="close" v-on:click="closePopup">&times;</a>
      </header>
  		<slot>
        This is for the body
      </slot>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'CustomPopup',
  props: [
    'close',
    'title',
  ],
  methods: {
    closePopup() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";

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
    position: relative;
    transition: all 0.5s ease-in-out;

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
      right: 20px;
      transition: all 200ms;
      font-size: 30px;
      font-weight: bold;
      text-decoration: none;
      color: #333;
      cursor: pointer;

      &:hover {
        color: $primary-color;
      }
    }

    .content {
      max-height: 30%;
      overflow: auto;
    }

    footer {
      margin-top: 10px;
    }
  }
}

@include respond-to(desktop) {
  .popup {
    width: 30%;
  }
}

@include respond-to(mobile) {
  .popup {
    width: 80%;
  }
}

</style>
