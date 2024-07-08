<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { CheckCircleSolid, CloseCircleSolid } from "flowbite-svelte-icons";
  import { navigate } from "svelte-routing";
  import { fade } from "svelte/transition";
  import { z } from "zod";
  import { createTask } from "../services/task.services";
  import History from "./History.svelte";

  const TOAST_DURATION = 3000;
  const MIN_LENGTH = 10;

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

  let formData: FormSchema = {
    title: "",
    description: "",
    type: "Daily",
  };

  let errors: Partial<FormSchema> = {};
  let toastStatus = false;
  let toastIcon: "success" | "error" = "success";
  let message = "";

  const handleFormSubmission = async (e: Event) => {
    e.preventDefault();

    try {
      formSchema.parse(formData);
      errors = {};

      const res = await createTask(formData);
      showToast("success", res.data.message);
      setTimeout(() => navigate("/dashboard"), TOAST_DURATION);
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors = error.formErrors.fieldErrors as Partial<FormSchema>;
      } else if (error instanceof Error) {
        showToast("error", error.message);
      }
    }
  };

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

<div class="grid h-screen place-items-center bg-[#1A1A1A] overflow-hidden">
  <div class="w-full p-4 grid gap-y-8">
    <div class="flex justify-center">
      <svg
        class="h-40 w-40 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <form class="grid gap-y-4" on:submit|preventDefault={handleFormSubmission}>
      <input
        bind:value={formData.title}
        class="w-full rounded-md bg-[#333333] py-2 pl-2 text-white"
        type="text"
        placeholder="Title"
      />
      {#if errors.title}
        <p class="text-red-500">
          {errors.title}
        </p>
      {/if}

      <textarea
        bind:value={formData.description}
        cols="0"
        rows="3"
        class="pl-2 bg-[#333333] rounded-md text-white"
        placeholder="Description"
      ></textarea>
      {#if errors.description}<p class="text-red-500">
          {errors.description}
        </p>
      {/if}

      <select
        bind:value={formData.type}
        class="rounded-md bg-[#333333] py-2 pl-2 text-white"
      >
        {#each Object.values(formSchema.shape.type.enum) as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
      {#if errors.type}
        <p class="text-red-500">
          {errors.type}
        </p>
      {/if}

      <button
        class="w-full rounded-md border py-2 text-white transition-all hover:border-green-500"
        >Submit</button
      >
    </form>
  </div>
</div>
