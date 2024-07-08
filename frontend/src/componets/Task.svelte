<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import {
    BookOpenOutline,
    CheckCircleSolid,
    CloseCircleSolid,
  } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { fade } from "svelte/transition";
  import { z } from "zod";
  import History from "./History.svelte";
  import { deleteTask, getTask, updateTask } from "../services/task.services";

  const id = new URL(window.location.href).pathname.split("/").pop();

  const TOAST_DURATION = 3000;
  const MIN_LENGTH = 10;

  let isEditable = false;

  let message = "";
  let toastStatus = false;
  let toastIcon: "success" | "error" = "success";

  let completed = false;

  let formData = {
    title: "",
    description: "",
    type: "",
    completed,
  };

  onMount(async () => {
    try {
      //@ts-ignore
      const { data } = await getTask(id);
      const { task } = data;

      formData.title = task.title;
      formData.description = task.description;
      formData.type = task.type;
      completed = task.completed;
    } catch (error) {
      if (error instanceof Error) {
        showToast("error", error.message);
      }
    }
  });

  const formSchema = z.object({
    title: z
      .string()
      .trim()
      .min(MIN_LENGTH, {
        message: `Must be ${MIN_LENGTH} or more characters long`,
      }),
    description: z
      .string()
      .trim()
      .min(MIN_LENGTH, {
        message: `Must be ${MIN_LENGTH} or more characters long`,
      }),
    completed: z.boolean(),
    type: z.enum([
      "Daily",
      "Work",
      "Personal",
      "Leisure",
      "Health",
      "Relationship",
      "Finance",
    ]),
  });

  type FormSchema = z.infer<typeof formSchema>;

  let errors: Partial<FormSchema> = {};

  function toggleEditMode() {
    isEditable = !isEditable;
  }

  async function handleFormSubmissionUpateTask() {
    try {
      isEditable = !isEditable;
      formSchema.parse(formData);
      errors = {};

      //@ts-ignore
      const { data } = await updateTask(id, {
        title: formData.title,
        description: formData.description,
        completed,
      });

      const { message } = data;
      showToast("success", message);
      setTimeout(() => {
        navigate(`/tasks/${formData.type}`);
      }, TOAST_DURATION);
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors = error.formErrors.fieldErrors as Partial<FormSchema>;
      } else if (error instanceof Error) {
        showToast("error", error.message);
      }
    }
  }

  async function handleFormSubmissionDeleteTask() {
    try {
      // isEditable = !isEditable;
      //@ts-ignore
      const { data } = await deleteTask(id);
      const { message } = data;
      showToast("success", message);
      setTimeout(() => {
        navigate(`/tasks/${formData.type}`);
      }, TOAST_DURATION);
    } catch (error) {
      if (error instanceof Error) {
        showToast("error", error.message);
      }
    }
  }

  const showToast = (icon: "success" | "error", msg: string) => {
    toastStatus = true;
    toastIcon = icon;
    message = msg;
    setTimeout(() => (toastStatus = false), TOAST_DURATION);
  };
</script>

<History />

<div
  class="fixed left-0 top-6 right-0 flex items-start justify-center pointer-events-none"
>
  <Toast dismissable={false} color="green" transition={fade} bind:toastStatus>
    <div
      class="bg-[#333333] mt-4 space-x-2 flex items-center justify-center rounded-md py-2 pointer-events-auto"
    >
      {#if toastIcon === "success"}
        <CheckCircleSolid slot="icon" class="w-5 h-5 text-green-500" />
      {:else}
        <CloseCircleSolid slot="icon" class="w-5 h-5 text-red-500" />
      {/if}
      <span class="text-white">{message}</span>
    </div>
  </Toast>
</div>

<div class="grid h-screen place-items-center bg-[#1A1A1A]">
  <div class="grid w-full gap-y-4 p-4">
    <div class="flex justify-center">
      <BookOpenOutline class="h-40 w-40" color="white" size="lg" />
    </div>

    <div class="grid gap-y-4">
      <input
        type="text"
        class="rounded-lg bg-[#333333] px-2 py-3 text-white varela-round-regular"
        bind:value={formData.title}
        disabled={!isEditable}
      />
      {#if errors.title}
        <p class="text-red-500">
          {errors.title}
        </p>
      {/if}

      <textarea
        class="rounded-lg bg-[#333333] px-2 py-3 text-white varela-round-regular"
        bind:value={formData.description}
        disabled={!isEditable}
      ></textarea>
      {#if errors.description}
        <p class="text-red-500">
          {errors.description}
        </p>
      {/if}

      <div class="text-white flex place-items-center space-x-2">
        {#if completed}
          <span class="varela-round-regular">Task completed</span>
          <input
            type="checkbox"
            name=""
            id=""
            disabled={!isEditable}
            bind:checked={completed}
          />
        {:else}
          <span class="varela-round-regular">Complete task?</span>
          <input
            type="checkbox"
            name=""
            id=""
            disabled={!isEditable}
            bind:checked={completed}
          />
        {/if}
      </div>
    </div>

    <div class="flex space-x-4">
      {#if !isEditable}
        <button
          class="w-full rounded-md bg-blue-500 py-2 text-white varela-round-regular"
          on:click={toggleEditMode}>Edit</button
        >
        <button
          class="w-full rounded-md bg-red-500 py-2 text-white varela-round-regular"
          on:click={handleFormSubmissionDeleteTask}>Delete</button
        >
      {:else}
        <button
          class="w-full rounded-md bg-green-500 py-2 text-white varela-round-regular"
          on:click={handleFormSubmissionUpateTask}>Update</button
        >
      {/if}
    </div>
  </div>
</div>
