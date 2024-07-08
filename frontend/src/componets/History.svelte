<script lang="ts">
  import { AngleLeftOutline } from "flowbite-svelte-icons";
</script>

<div class="fixed flex left-0 top-0 right-0 p-4">
  <div class="w-full">
    <button
      class="grid place-items-center rounded-md bg-[#2997C7] p-1"
      on:click={() => window.history.back()}
    >
      <AngleLeftOutline color="white" size="md" />
    </button>
  </div>
</div>
