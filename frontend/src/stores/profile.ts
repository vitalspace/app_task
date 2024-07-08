import { writable } from "svelte/store";
import { getProfile } from "../services/user.services";

const createProfileStore = () => {
  const { subscribe, set } = writable();

  const initialize = async () => {
    try {
      const { data } = await getProfile();
      set(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error initializing profile store:", error);
      }
    }
  };

  const updateProfile = (newData: any) => {
    set(newData);
  };

  initialize();

  return {
    subscribe,
    initialize,
    updateProfile,
  };
};

export const profileStore = createProfileStore();
