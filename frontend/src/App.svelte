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
  import { auth } from "./stores/authStore";

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