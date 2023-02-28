<template>
  <div class="main">
    <div class="logoBlock">
      <router-link
        to="/"
        @click="handleClickMainPage"
      >
        <img
          class="logo"
          src="./logo.png"
        >
      </router-link>
    </div>
    <div class="menu">
      <nav>
        <router-link
          to="/"
          @click="handleClickMainPage"
        >
          Главная
        </router-link>
        <router-link
          to="/about"
        >
          О тесте
        </router-link>
        <router-link
          to="/contact"
        >
          Контакт
        </router-link>
        <div id="indicator" />
      </nav>
    </div>
  </div>
</template>
<script>
import {received} from '@/App.vue'
export default {
    data : () => ({
       received
    }),
    methods : {
        handleClickMainPage () {
            received.testingPhase = '';
            received.clickInputCode = false;
            received.clickBeginTesting = false;
            received.showWelcomeBlock = true;
            received.resultInReferalCodeForFemale = '';
            received.resultVariable = '';
            localStorage.clear();
            return
        }
    }
    }
</script>
<style scoped>
html, body
{
    height: 100%;
}

body
{
    margin: 0;
    background-color: #292929;
}
.main {
    display: flex;
    align-items: flex-end;
    padding: 1% 2%;
}
.menu {
    width: 30%;
}
.logoBlock {
    width : 35%
}
nav
{
    width: 100%;
    display: table;
    margin: 0 auto;
    transform: translateY(0%);
    background: rgba(202, 233, 143, 0.438);
    border: 2px solid rgba(231, 157, 9, 0.712);
    border-radius: 1em;
}

nav a
{
    width: 33%;
    display: table-cell;
    text-align: center;
    color: #464444;
    text-decoration: none;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    padding: 2% 0;
    transition: 0.2s ease color;
}
nav a:before, nav a:after
{
    content: "";
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    transition: 0.2s ease transform;
}

nav a:before
{
    top: 0;
    left: 10%;
    width: 8px;
    height: 6px;
}
nav a:after
{
    top: 5px;
    left: 10%;
    width: 6px;
    height: 4px
}
#indicator
{
    position: absolute;
    left: 5%;
    bottom: 0;
    width: 25%;
    height: 3px;
    background-color: #fff;
    border-radius: 5px;
    transition: 0.2s ease left;
}
nav a:hover
{
    color: #fff;
}
nav a:hover:before, nav a:hover:after
{
    transform: scale(1);
}

nav a:nth-child(1):hover ~ #indicator
{
    background: linear-gradient(130deg, yellow, red);
}

nav a:nth-child(2):hover ~ #indicator
{
    left: 39%;
    background: linear-gradient(130deg, #00e2ff, #89ff00);
}

nav a:nth-child(3):hover ~ #indicator
{
    left: 70%;
    background: linear-gradient(130deg, purple, palevioletred);
}
.logo {
    width: 25%;
    height: auto;
}
@media(max-width: 600px) {
.main {
    display: flex;
    flex-direction: column-reverse;
    align-items: baseline;
} 
.logo, .logoBlock, .menu, nav{
    width: 100%;
}
}
</style>