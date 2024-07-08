import axios from "./axios";

export const signUp = async (body: any) => await axios.post("/singup", body);
export const signIn = async (body: any) => await axios.post("/signin", body);
export const getProfile = async () => await axios.get("/profile");
export const updateProfile = async (body: any) => await axios.put("/update", body);

