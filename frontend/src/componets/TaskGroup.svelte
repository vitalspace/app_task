<script lang="ts">
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";

  export let taskName: string;
  export let taskCounter: number;
  export let totalTask: number;

  let percentage = 0;

  onMount(() => {
    setTimeout(() => {
      percentage = Math.round((taskCounter / totalTask) * 100);
    }, 0);
  });

  function setColor(taskName: string) {
    switch (taskName) {
      case "Daily":
        return "bg-blue-600";
      case "Work":
        return "bg-green-600";
      case "Personal":
        return "bg-yellow-600";
      case "Leisure":
        return "bg-purple-600";
      case "Health":
        return "bg-red-600";
      case "Relationship":
        return "bg-pink-600";
      case "Finance":
        return "bg-indigo-600";
      default:
        return "bg-gray-600";
    }
  }
</script>

<Link
  to={`/tasks/${taskName}`}
  class="bg-[#333333] flex flex-wrap gap-4 p-2 rounded-md hover:scale-105 transition-all"
>
  <div>
    <div class={`${setColor(taskName)} rounded-md`}>
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>

  <div class="w-full">
    <h2 class="varela-round-regular text-lg">{taskName}</h2>
  </div>

  <div class="w-full flex place-items-center space-x-2">
    <div class="w-full">
      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          class={`h-2.5 rounded-full ${setColor(taskName)}`}
          style="width: {percentage}%; transition: width 3s ease-in-out;"
        ></div>
      </div>
    </div>
    <div class={`${setColor(taskName)} rounded-md px-2 text-xs`}>
      <span class="varela-round-regular">{taskCounter}/{totalTask}</span>
    </div>
  </div>
</Link>
