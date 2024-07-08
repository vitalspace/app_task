<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import {
    AngleRightOutline,
    CloseCircleSolid,
    HourglassOutline,
    BadgeCheckOutline
  } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import { fade } from "svelte/transition";
  import { getByType } from "../services/task.services";
  import History from "./History.svelte";

  const TOAST_DURATION = 5000;
  let message = "";
  let toastStatus = false;
  let showEmptyMessage = false;
  let toastIcon: "success" | "error" = "success";
  let typeTask = new URL(window.location.href).pathname.split("/").pop();

  const showToast = (icon: "success" | "error", msg: string) => {
    toastStatus = true;
    toastIcon = icon;
    message = msg;
    setTimeout(() => (toastStatus = false), TOAST_DURATION);
  };

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

  let tasksArr: Task[] = [];
  let search: undefined = undefined;

  $: visibleTasks = search
    ? tasksArr.filter((task) => {
        return (
          task.title.match(`${search}.*`) ||
          task.description.match(`${search}.*`)
        );
      })
    : tasksArr;

  onMount(async () => {
    try {
      //@ts-ignore
      const { data } = await getByType(typeTask);
      const { tasks } = data;
      showEmptyMessage = tasks.length === 0;
      tasksArr = tasks;
    } catch (error) {
      if (error instanceof Error) {
        showToast("error", error.message);
      }
    }
  });
</script>

<History />

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

<div class="grid bg-[#1A1A1A] mt-11">
  <div class="grid w-full gap-8 p-4">
    <div class="grid gap-y-4">
      <div class="flex place-items-center justify-between">
        <div>
          <h2 class="text-2xl text-white varela-round-regular">
            {typeTask} Progress
          </h2>
        </div>
      </div>

      <div>
        <input
          class="w-full rounded-md bg-[#333333] px-2 py-2 text-white varela-round-regular"
          type="search"
          placeholder="Search"
          bind:value={search}
        />
      </div>

      <div class="flex space-x-4">
        <!-- <button
          class="w-full rounded-md bg-blue-500 px-4 py-2 text-white varela-round-regular"
          >All</button
        >
        <button
          class="w-full rounded-md border px-4 py-2 text-white varela-round-regular"
          >Favorite</button
        >
        <button
          class="w-full rounded-md border px-4 py-2 text-white varela-round-regular"
          >History</button
        > -->
      </div>
    </div>

    <div class="grid gap-y-4">
      {#if showEmptyMessage}
        <p class="varela-round-regular text-white">
          This place looks like a desert
          <Link to="/createtask" class="text-green-500 underline"
            >add a task now!</Link
          >
        </p>
      {:else}
        <div class="grid gap-y-4">
          {#each visibleTasks as task}
            {#if task.completed}
              <Link
                to="/task/{task._id}"
                class="rounded-md bg-[#333333] px-2 py-3 hover:scale-105 hover:mx-2 transition-all flex justify-between place-items-center border border-green-500"
              >
                <div class="flex place-items-center space-x-2">
                  <div class="bg-green-500 rounded-full p-1">
                    <BadgeCheckOutline color="white" />
                  </div>
                  <h2 class="text-white varela-round-regular">{task.title}</h2>
                </div>
                <div class="text-white">
                  <AngleRightOutline />
                </div>
              </Link>
            {:else}
              <Link
                to="/task/{task._id}"
                class="rounded-md bg-[#333333] px-2 py-3 hover:scale-105 hover:mx-2 transition-all flex justify-between place-items-center"
              >
                <div class="flex place-items-center space-x-2">
                  <div class="bg-red-500 rounded-full p-1">
                    <HourglassOutline color="white" />
                  </div>
                  <h2 class="text-white varela-round-regular">{task.title}</h2>
                </div>
                <div class="text-white">
                  <AngleRightOutline />
                </div>
              </Link>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
