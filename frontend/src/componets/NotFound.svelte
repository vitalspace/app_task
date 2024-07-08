<!-- NotFound.svelte -->
<script>
  import { link } from "svelte-routing";
</script>

<div class="not-found">
  <h1>404 - Página no encontrada</h1>
  <p>Lo sentimos, la página que estás buscando no existe.</p>
  <a href="/" use:link>Volver a la página principal</a>
</div>

<style>
  .not-found {
    text-align: center;
    padding: 2rem;
  }
</style>
