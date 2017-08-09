<template>
  <div id="app">
    <header>
      <img id="logo" src="./assets/logo.png">
  		<nav id="mainNav">
  			<ul>
  				<router-link activeClass="active" to="/home">Home</router-link>
          <router-link activeClass="active" to="/objective">Objective</router-link>
          <router-link activeClass="active" to="/chart">Chart</router-link>
  			</ul>
  		</nav>
  	</header>
    <router-view></router-view>
    <footer>
  		<p>Copyright 2017 - Dat Tran</p>
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

  #logo {
    width: 30px;
    height: 30px
  }

  #mainNav {
    a.active {
      font-weight: bold;
    }
  }
</style>
