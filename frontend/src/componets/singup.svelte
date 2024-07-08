<script lang="ts">
  import { z } from "zod";
  import { signUp } from "../services/user.services";

  const formSchema = z.object({
    name: z.string().trim().min(8, { message: "Must be 8 or more characters long" }),
    username: z.string().trim().min(8, { message: "Must be 8 or more characters long" }),
    email: z.string().trim().email("Invalid email"),
    password: z.string().trim().min(8, { message: "Must be 8 or more characters long" }),
  });

  const formData = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  type FormSchema = z.infer<typeof formSchema>;

  let errors: Partial<FormSchema> = {};
  let responseMessage = "";
  let responseType = "";

  const handleFormSubmission = async () => {
    try {
      formSchema.parse(formData);
      errors = {};

      const result = await signUp(formData);
      await handleSignUpResponse(result);

    } catch (error) {
      if (error instanceof z.ZodError) {
        errors = error.formErrors.fieldErrors as Partial<FormSchema>;
      }
    }
  };

  const handleSignUpResponse = async (result?: Response) => {
  if (result) {
    const data = await result.json();
    responseMessage = data.message;
    responseType = result.ok? "success" : "error";
  }
};
</script>

<div class="grid h-screen bg-[#1A1A1A] place-items-center">
  <section class="flex flex-col p-4 gap-10 w-full">
    <div class="flex justify-center">
      <div class="border rounded-full">
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
            d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z"
          />
        </svg>
      </div>
    </div>

    <form class="grid gap-4" action="#" on:submit|preventDefault={handleFormSubmission}>
      <input
        class="w-full rounded-md bg-[#333333] py-2 pl-2 text-white"
        type="text"
        placeholder="Name"
        required
        bind:value={formData.name}
      />
      {#if errors.name}
        <p class="text-red-500">{errors.name}</p>
      {/if}

      <input
        class="w-full rounded-md bg-[#333333] py-2 pl-2 text-white"
        type="text"
        placeholder="Username"
        required
        bind:value={formData.username}
      />
      {#if errors.username}
        <p class="text-red-500">{errors.username}</p>
      {/if}
      <input
        class="w-full rounded-md bg-[#333333] py-2 pl-2 text-white"
        type="email"
        placeholder="Email"
        required
        bind:value={formData.email}
      />
      {#if errors.email}
        <p class="text-red-500">{errors.email}</p>
      {/if}
      <input
        class="w-full rounded-md bg-[#333333] py-2 pl-2 text-white"
        type="password"
        placeholder="Password"
        required
        bind:value={formData.password}
      />
      {#if errors.password}
        <p class="text-red-500">{errors.password}</p>
      {/if}
      <button
        class="w-full rounded-md border py-2 font-black text-white hover:border-green-600 transition-all"
        >Sign up</button
      >

      {#if responseType === "success"}
        <p class="text-green-500 text-center">{responseMessage} now <a href="/signin" class="text-white underline">Sign in.</a></p>
      {:else if responseType === "error"}
        <p class="text-red-500 text-center">{responseMessage} <a href="/signin" class="text-white underline">Sign in</a> instead.</p>
      {/if}

      <p class="text-center text-[#8B8B8B]">
        By Continuing you agree to the Terms and Conditions.
      </p>
    </form>
  </section>
</div>
