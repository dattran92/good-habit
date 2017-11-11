<template>
  <div id="app">
    <header id="app-header">
      <div class="container">
        <img id="logo" src="./assets/logo.png">
    		<nav id="main-nav">
    			<ul>
    				<router-link activeClass="active" to="/home/">Check In</router-link>
            <router-link activeClass="active" to="/objective/">Objective</router-link>
            <router-link activeClass="active" to="/chart/">Chart</router-link>
    			</ul>
    		</nav>
      </div>
  	</header>
    <div id="main-content" class="container">
      <router-view></router-view>
    </div>
    <footer>
      <div class="container">
        <div class="wrapper">
          <p><b>GOOD HABIT</b></p>
      		<p>Copyright &#169; 2017 - Dat Tran</p>
        </div>
      </div>
  	</footer>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
  @import "./assets/styles/styles.scss";

  #app-header {
    background: $primary-color;
    & > .container {
      padding: $base-padding;
      display: flex;
      align-items: center;
    }
  }

  #main-nav {
    margin-left: $base-margin;
    a {
      color: $white-color;
      text-decoration: none;
      padding: 0 $base-padding;
      &.active {
        font-weight: bold;
      }
    }
  }

  #logo {
    width: 30px;
    height: 30px
  }

  footer {
    border-top: 1px solid $light-grey-color;
    .wrapper {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
