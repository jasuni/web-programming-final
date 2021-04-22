<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <router-view/>
    <footer>
      <p>About 11 hours worked </p>
      <p><a href="https://github.com/jasuni/web-programming-final">github repository</a></p>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: aliceblue;
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

footer {
  background: aliceblue;
  display: flex;
  justify-content: space-around;
}
</style>
