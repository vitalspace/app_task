<!-- PublicOnlyRoute.svelte -->
<script lang="ts">
    import { navigate } from 'svelte-routing';
    import { auth } from '../stores/auth';
    import { onMount } from 'svelte';
  
    export let component: any;
    // export let props = {};
  
    let isAuthenticated = false;
  
    onMount(() => {
      const unsubscribe = auth.subscribe(value => {
        isAuthenticated = value;
        if (isAuthenticated) {
          navigate('/dashboard');
        }
      });
  
      return unsubscribe;
    });
  </script>
  
  {#if !isAuthenticated}
    <!-- <svelte:component this={component} {...props} /> -->
    <svelte:component this={component}  />

  {/if}