<template>
  <div id="nav">
    <a @click="$router.go(-1)" href="#"> back </a>
  </div>
  <router-view :key="$route.path" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.btn {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}
.btn:disabled,
.btn[disabled] {
  @apply bg-gray-300 cursor-default;
}
</style>
