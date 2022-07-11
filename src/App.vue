<template>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;1,300&display=swap");
#app {
  font-family: "Nunito Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: url(./assets/home.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: fixed;
}

button {
  @include m-bg();
  text-decoration: none;
  border: 0;
  border-radius: 2rem;
  padding: 1rem 2rem;
}
</style>
