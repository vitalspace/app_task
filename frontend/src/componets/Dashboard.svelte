<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { CloseCircleSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { getTasks } from "../services/task.services";
  import Task from "./TaskGroup.svelte";
  import { Link } from "svelte-routing";
  import { profileStore } from "../stores/profile";

  profileStore.initialize();

  let showEmptyMessage = false;

  const TOAST_DURATION = 5000;

  let message = "";
  let toastStatus = false;
  let toastIcon: "success" | "error" = "success";

  type TaskType =
    | "Daily"
    | "Work"
    | "Personal"
    | "Leisure"
    | "Health"
    | "Relationship"
    | "Finance";

  interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    author: string;
    type: TaskType;
    __v: number;
  }

  type TaskCounts = {
    [key: string]: number;
  };

  interface TotalTasks {
    [key: string]: number;
  }

  let taskCounts: TaskCounts = {
    Daily: 0,
    Work: 0,
    Personal: 0,
    Leisure: 0,
    Health: 0,
    Relationship: 0,
    Finance: 0,
  };

  let totalTasks: TotalTasks = {
    Daily: 0,
    Work: 0,
    Personal: 0,
    Leisure: 0,
    Health: 0,
    Relationship: 0,
    Finance: 0,
  };

  onMount(async () => {
    try {
      const { data } = await getTasks();
      const { tasks } = data;
      showEmptyMessage = tasks.length === 0;
      updateTaskCounts(tasks);
    } catch (error) {
      if (error instanceof Error) {
        showToast("error", error.message);
      }
    }
  });

  function updateTaskCounts(tasks: Task[]) {
    for (let type in taskCounts) {
      const filteredTasks = tasks.filter((task) => task.type === type);
      taskCounts[type as TaskType] = filteredTasks.filter(
        (task) => task.completed
      ).length;
      totalTasks[type as TaskType] = filteredTasks.length;
    }
  }

  const showToast = (icon: "success" | "error", msg: string) => {
    toastStatus = true;
    toastIcon = icon;
    message = msg;
    setTimeout(() => (toastStatus = false), TOAST_DURATION);
  };
</script>

<div class="fixed inset-0 flex items-start justify-center pointer-events-none">
  <Toast dismissable={false} color="green" transition={fade} bind:toastStatus>
    <div
      class="bg-[#333333] mt-4 space-x-2 flex items-center justify-center rounded-md py-2 pointer-events-auto"
    >
      {#if toastIcon === "error"}
        <CloseCircleSolid slot="icon" class="w-5 h-5 text-red-500" />
      {/if}
      <span class="text-white">{message}</span>
    </div>
  </Toast>
</div>

<div class="grid bg-[#1A1A1A] mt-10">
  <div class="grid gap-y-8 w-full p-4 pb-20">
    <div>
      <h2 class="text-white text-5xl varela-round-regular">
        Hello
        {#if $profileStore}
          <p>{$profileStore.name}</p>
        {/if}
      </h2>
    </div>
    <div class="text-white grid gap-y-4">
      <p class="varela-round-regular">Categories</p>

      {#if showEmptyMessage}
        <p class="varela-round-regular">
          This place looks like a desert
          <Link to="/createtask" class="text-green-500 underline"
            >add a task now!</Link
          >
        </p>
      {:else}
        <div class="grid grid-cols-2 gap-4">
          {#each Object.entries(taskCounts) as [taskName, count]}
            {#if totalTasks[taskName] > 0}
              <Task
                {taskName}
                taskCounter={count}
                totalTask={totalTasks[taskName]}
              />
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
