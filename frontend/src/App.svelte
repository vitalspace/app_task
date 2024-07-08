<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import CreateTask from "./componets/CreateTask.svelte";
  import Dashboard from "./componets/Dashboard.svelte";
  import Home from "./componets/home.svelte";
  import Menu from "./componets/Menu.svelte";
  import NotFound from "./componets/NotFound.svelte";
  import Profile from "./componets/Profile.svelte";
  import ProtectedRoute from "./componets/protectedRoute.svelte";
  import PublicOnlyRoute from "./componets/publicOnlyRoute.svelte";
  import Signin from "./componets/signin.svelte";
  import Signup from "./componets/singup.svelte";
  import Task from "./componets/Task.svelte";
  import Tasks from "./componets/Tasks.svelte";

  import { onMount } from "svelte";
  import { auth } from "./stores/auth";

  onMount(() => {
    auth.initialize();
  });
</script>

<Router>
  <Menu />

  <Route path="/" component={Home} />
  <Route path="/signin">
    <PublicOnlyRoute component={Signin} />
  </Route>
  <Route path="/signup">
    <PublicOnlyRoute component={Signup} />
  </Route>
  <Route path="/dashboard">
    <ProtectedRoute component={Dashboard} />
  </Route>

  <Route path="/createtask">
    <ProtectedRoute component={CreateTask} />
  </Route>

  <Route path="/task/:id">
    <ProtectedRoute component={Task} />
  </Route>

  <Route path="/tasks/:id">
    <ProtectedRoute component={Tasks} />
  </Route>

  <Route path="/profile">
    <ProtectedRoute component={Profile} />
  </Route>

  <Route path="*" component={NotFound} />
</Router>

<!-- <Signup /> -->
<!-- <Signin /> -->

<!-- <Router>
  <nav class="border">
    <Link to="/">Home</Link>
  </nav>

  <div>
    <Route path="/"><Home /></Route>
  </div>
</Router> -->

<!-- <div class="grid place-content-center h-screen bg-[#0E0F12]">
  <div class="flex flex-col gap-8 p-4">
    <div>
      <img class="w-full h-80" src="https://p.turbosquid.com/ts-thumb/uw/xnDYEd/Vn/img2000/png/1635893198/600x600/fit_q87/7fb288de36f5431f04da143d5fba07a4fe761e66/img2000.jpg" alt="" />
    </div>
    <div class="">
      <h1 class="text-white text-4xl varela-round-regular ">Maximize your productivity with one app</h1>
    </div>
    <div class=" mx-auto grid gap-6 w-full">
      <div>
        <button class="bg-blue-700 text-white p-2 rounded-full w-full cursor-pointer varela-round-regular ">Sign in with Email</button>
      </div>
      <div class="flex space-x-4">
        <button class="rounded-full border border-white text-white p-2 w-full cursor-pointer varela-round-regular ">Google</button>
        <button class="rounded-full border border-white text-white p-2 w-full cursor-pointer varela-round-regular ">Github</button>
      </div>
    </div>
  </div>
</div> -->

<!-- <div class="grid place-items-center h-screen bg-[#0E0F12]">
  <div class="flex flex-col gap-8 p-4 w-full">
    <div class="grid gap-4">
      <div>
        <h1 class="varela-round-regular text-5xl font-bold text-white">
          Hello
          <p>Vital Rivera</p>
        </h1>
      </div>
      <div class="flex space-x-6">
        <button
          class="varela-round-regular w-full cursor-pointer rounded-full border border-transparent bg-blue-600 p-1 text-white"
          >Overview</button
        >
        <button
          class="varela-round-regular w-full cursor-pointer rounded-full border p-1 text-white"
          >Productivity</button
        >
      </div>
    </div>

    <div class="rounded-2xl bg-[#2D2D2D] p-2">
      <h2 class="varela-round-regular text-white">Daily progress</h2>
      <p class="varela-round-regular text-xs text-gray-400">
        Here you can see your daily task
      </p>
      <p class="text-white">76%</p>
    </div>

    <div class="grid gap-4">
      <div>
        <h2 class="varela-round-regular text-lg font-bold text-white">
          Categories
        </h2>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2 rounded-lg bg-[#2D2D2D] p-2">
          <div class="w-8 rounded-lg bg-blue-600 p-1">
            <svg
              class="h-6 w-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p class="text-xs text-white">5 new</p>
            <h2 class="text-base text-white">Book</h2>
          </div>
          <div>
            <p class="rounded-full bg-blue-600 px-2 text-xs text-white">9/24</p>
          </div>
        </div>

        <div class="grid gap-2 rounded-lg bg-[#2D2D2D] p-2">
          <div class="w-8 rounded-lg bg-yellow-500 p-1">
            <svg
              class="h-6 w-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
                clip-rule="evenodd"
              />
              <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
            </svg>
          </div>
          <div>
            <p class="text-xs text-white">5 new</p>
            <h2 class="text-base text-white">Book</h2>
          </div>
          <div>
            <p class="rounded-full bg-blue-600 px-2 text-xs text-white">9/24</p>
          </div>
        </div>

        <div class="grid gap-2 rounded-lg bg-[#2D2D2D] p-2">
          <div class="w-8 rounded-lg bg-purple-500 p-1">
            <svg
              class="h-6 w-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 11.917 9.724 16.5 19 7.5"
              />
            </svg>
          </div>
          <div>
            <p class="text-xs text-white">5 new</p>
            <h2 class="text-base text-white">Book</h2>
          </div>
          <div>
            <p class="rounded-full bg-blue-600 px-2 text-xs text-white">9/24</p>
          </div>
        </div>

        <div class="grid gap-2 rounded-lg bg-[#2D2D2D] p-2">
          <div class="w-8 rounded-lg bg-green-500 p-1">
            <svg
              class="h-6 w-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"
              />
            </svg>
          </div>
          <div>
            <p class="text-xs text-white">5 new</p>
            <h2 class="text-base text-white">Book</h2>
          </div>
          <div>
            <p class="rounded-full bg-blue-600 px-2 text-xs text-white">9/24</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> -->
