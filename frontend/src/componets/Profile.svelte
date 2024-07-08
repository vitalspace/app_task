<script lang="ts">
  import { UserOutline, UserEditOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { z } from "zod";
  import { formSchema, type FormSchema } from "../schemas/profileSchema";
  import { updateProfile } from "../services/user.services";
  import { profileStore } from "../stores/profile";
  import { type FormData } from "../types/generalTypes";
  import History from "./History.svelte";
  import Toast from "./Toast.svelte";

  onMount(() => {
    profileStore.subscribe((data: unknown) => {
      const e = data as Partial<FormData>;
      formData.avatar = e?.avatar;
      formData.username = e?.username;
      formData.name = e?.name;
      formData.email = e?.email;
    });
  });

  let showForm = false;

  function activeForm() {
    showForm = !showForm;
  }

  function hideForm() {
    showForm = !showForm;
  }

  let formData: Partial<FormData> = {
    avatar: "",
    name: "",
    username: "",
    email: "",
  };

  let errors: Partial<FormSchema> = {};
  let toastStatus = false;
  let toastIcon: "success" | "error";
  let message = "";

  const showToast = (icon: "success" | "error", msg: string) => {
    toastStatus = true;
    toastIcon = icon;
    message = msg;
    setTimeout(() => (toastStatus = false), 3000);
  };

  async function handleFormSubmission() {
    try {
      formSchema.parse(formData);
      errors = {};

      const response = await updateProfile(formData);

      if (response) {
        showForm = !showForm;
        profileStore.updateProfile(response.data);
        showToast("success", "Profile updated successfully");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors = error.formErrors.fieldErrors as Partial<FormSchema>;
      } else if (error instanceof Error) {
        showToast("success", error.message);
      }
    }
  }
</script>

<Toast {toastStatus} {toastIcon} {message} />
<History />
<div class="grid h-screen place-items-center bg-[#1A1A1A]">
  <div class="grid w-full gap-y-8 p-4">
    {#if !showForm}
      <div class="flex flex-col place-items-center gap-y-4">
        {#if $profileStore}
          <div class="rounded-full border">
            {#if formData.avatar !== ""}
              <img
                class="h-40 w-40 rounded-full"
                src={formData.avatar}
                alt=""
              />
            {:else}
              <UserOutline class="h-40 w-40" color="white" />
            {/if}
          </div>

          <div class="text-center">
            <h2
              class="text-2xl varela-round-regular text-white varela-round-regular"
            >
              {formData.name}
            </h2>
            <p class="text-xs varela-round-regular text-[#757575]">
              {formData.email}
            </p>
          </div>
        {/if}

        <div>
          <button
            class="cursor-pointer rounded-md bg-[#2997C7] px-4 py-2 text-white"
            on:click={activeForm}>Edit Profile</button
          >
        </div>
      </div>
    {/if}

    <div class="grid gap-y-4">
      {#if !showForm}
        <div>
          <label class="text-[#757575] varela-round-regular text-xs" for=""
            >Notifications</label
          >
          <div
            class="flex place-items-center justify-between rounded-md bg-[#333333] px-2 py-3"
          >
            <h2 class="text-white varela-round-regular">
              Turn on notifications
            </h2>
            <div class="pr-4">
              <label class="inline-flex cursor-pointer items-center">
                <input type="checkbox" value="" class="peer sr-only" />
                <div
                  class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2997C7] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label class="text-[#757575] varela-round-regular text-xs" for=""
            >Invite Link</label
          >
          <div
            class="flex place-items-center justify-between rounded-md bg-[#333333] px-2 py-2"
          >
            <h2 class="text-white varela-round-regular">Invite people</h2>
            <button
              class="cursor-pointer rounded-md bg-[#2997C7] px-4 py-2 text-white"
              >Invite</button
            >
          </div>
        </div>

        <div class="text-center">
          <a
            class="text-lg text-gray-400 transition-none hover:text-green-500"
            href="/"
            target="_blank"
          >
            Sign out
          </a>
        </div>
      {:else}
        <div class="grid gap-y-4">
          <div class="flex justify-center">
            <UserEditOutline class="h-40 w-40" color="white" />
          </div>
          <div class="grid gap-y-4">
            <label class="text-[#757575] varela-round-regular text-xs" for=""
              >Avatar Url</label
            >
            <input
              class="w-full bg-[#333333] px-2 py-2 rounded-md text-white"
              type="url"
              bind:value={formData.avatar}
            />
            {#if errors.avatar}
              <p class="text-red-500">
                {errors.avatar}
              </p>
            {/if}

            <label class="text-[#757575] varela-round-regular text-xs" for=""
              >Username</label
            >
            <input
              class="w-full bg-[#333333] px-2 py-2 rounded-md text-white"
              type="text"
              bind:value={formData.username}
            />
            {#if errors.username}
              <p class="text-red-500">
                {errors.username}
              </p>
            {/if}
            <label class="text-[#757575] varela-round-regular text-xs" for=""
              >Name</label
            >
            <input
              class="w-full bg-[#333333] px-2 py-2 rounded-md text-white"
              type="text"
              bind:value={formData.name}
            />
            {#if errors.name}
              <p class="text-red-500">
                {errors.name}
              </p>
            {/if}
            <label class="text-[#757575] varela-round-regular text-xs" for=""
              >Email</label
            >
            <input
              class="w-full bg-[#333333] px-2 py-2 rounded-md text-white"
              type="email"
              bind:value={formData.email}
            />
            {#if errors.email}
              <p class="text-red-500">
                {errors.email}
              </p>
            {/if}

            <div class="flex space-x-4 mt-2">
              <button
                class="w-full bg-rose-500 py-2 rounded-md text-white"
                on:click={hideForm}>Cancel</button
              >
              <button
                on:click={handleFormSubmission}
                class="w-full bg-green-500 py-2 rounded-md text-white"
                >Update</button
              >
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
