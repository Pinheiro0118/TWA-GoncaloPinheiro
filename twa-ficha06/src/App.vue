<template>
  <div>
    <nav class="nav-bar">
      <RouterLink to="/">Catálogo</RouterLink> |
      <RouterLink to="/items/new">Novo Jogo</RouterLink> |
      <RouterLink to="/pokemon">Pokémon</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.nav-bar {
  padding: 12px;
  background-color: #242424;
  margin-bottom: 16px;
  display: flex;
  gap: 12px;
}
a {
  color: #ffffff;
  text-decoration: none;
}
a.router-link-active {
  font-weight: bold;
  color: #646cff;
}
</style>