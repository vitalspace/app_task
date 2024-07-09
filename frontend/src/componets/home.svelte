<script lang="ts">
  import { Link } from "svelte-routing";
  import { auth } from "../stores/authStore";

  let isAuthenticated: boolean;

  auth.subscribe((value) => {
    isAuthenticated = value;
  });
</script>

<div class="grid place-items-center h-screen bg-[#0E0F12]">
  <div class="flex flex-col gap-8 p-4 w-full">
    <div>
      <img
        class="w-full h-80"
        src="https://p.turbosquid.com/ts-thumb/uw/xnDYEd/Vn/img2000/png/1635893198/600x600/fit_q87/7fb288de36f5431f04da143d5fba07a4fe761e66/img2000.jpg"
        alt=""
      />
    </div>
    <div class="">
      <h1 class="text-white text-4xl varela-round-regular">
        Maximize your productivity with one app
      </h1>
    </div>
    <div class="mx-auto grid gap-6 w-full">
      {#if isAuthenticated}
        <Link
          to="/dashboard"
          class="rounded-full border border-white text-white p-2 w-full cursor-pointer varela-round-regular text-center hover:border-green-500 transition-all"
        >
          Go to Dashboard
        </Link>
      {:else}
        <div class="flex space-x-4">
          <Link
            to="/signup"
            class="rounded-full border border-white text-white p-2 w-full cursor-pointer varela-round-regular text-center"
          >
            Sign up
          </Link>
          <Link
            to="/signin"
            class="rounded-full border border-white text-white p-2 w-full cursor-pointer varela-round-regular text-center"
          >
            Sign in
          </Link>
        </div>
      {/if}
    </div>
  </div>
</div>
