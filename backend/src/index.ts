import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { Elysia } from "elysia";

import { taskRoutes } from "./controllers/taskController";
import { userController } from "./controllers/userController";

import db from "./db/db";

interface IUser {
  name: string;
  userName: string;
  email: string;
  password: string;
}

interface iSigin {
  email: string;
  password: string;
}

interface IUpdateAvatar {
  avatar: string;
}

interface ITask {
  title: string;
  description: string;
  type: string;
}

db();

const app = new Elysia()
  .use(
    cors({
      origin: "localhost:5173",
      allowedHeaders: ["Content-Type"],
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  )
  // .get("/sign/:name", async ({ jwt, cookie: { auth }, params }) => {
  //   auth.set({
  //     value: await jwt.sign(params),
  //     httpOnly: true,
  //     maxAge: 7 * 86400,
  //     path: "/profile",
  //   });

  //   return `Sign in as ${auth.value}`;
  // })

  // .get("/profile", async ({ jwt, set, cookie: { auth } }) => {
  //   const profile = await jwt.verify(auth.value);

  //   if (!profile) {
  //     set.status = 401;
  //     return "Unauthorized";
  //   }

  //   return JSON.stringify(profile);
  // })

  // .post(
  //   "/signup",
  //   async ({ body, set }) => {
  //     try {
  //       const { name, userName, email, password }: IUser = body;

  //       const existedUser = await User.findOne({
  //         $or: [{ email }, { userName }],
  //       });

  //       if (existedUser) {
  //         set.status = 409;
  //         return { message: "User already exists" };
  //       }

  //       const hastPssword = await Bun.password.hash(password);

  //       const user = new User({
  //         name,
  //         userName,
  //         email,
  //         password: hastPssword,
  //       });

  //       await user.save();

  //       const createdUser = await User.findById(user._id).select("-password");

  //       set.status = 201;

  //       return { message: "User created successfully", user: createdUser };
  //     } catch (err) {
  //       set.status = 500;
  //       return { message: `Internal server error ${err}` };
  //     }
  //   },
  //   {
  //     body: t.Object({
  //       name: t.String({
  //         minLength: 8,
  //       }),
  //       userName: t.String({
  //         minLength: 8,
  //       }),
  //       email: t.String({
  //         format: "email",
  //       }),
  //       password: t.String({
  //         minLength: 8,
  //       }),
  //     }),
  //   }
  // )

  // .post(
  //   "/signin",
  //   async ({ body, set, jwt, cookie: { auth } }) => {
  //     try {
  //       const { email, password }: iSigin = body;

  //       const user = await User.findOne({
  //         $or: [{ email }],
  //       });

  //       if (!user) {
  //         set.status = 404;
  //         return { message: "User not found" };
  //       }

  //       const isPasswordCorrect = await Bun.password.verify(
  //         password,
  //         user.password
  //       );

  //       if (!isPasswordCorrect) {
  //         set.status = 404;
  //         return { message: "Invalid password" };
  //       }

  //       auth.set({
  //         value: await jwt.sign({
  //           //@ts-ignore
  //           id: user._id,
  //           avatar: user.avatar,
  //           name: user.name,
  //           userName: user.userName,
  //           email: user.email,
  //         }),
  //         httpOnly: true,
  //         maxAge: 7 * 86400,
  //         // path: "/profile",
  //       });

  //       return auth.value;
  //     } catch (err) {
  //       set.status = 500;
  //       return { message: `Internal server error ${err}` };
  //     }
  //   },
  //   {
  //     body: t.Object({
  //       email: t.String({
  //         format: "email",
  //       }),
  //       password: t.String({
  //         minLength: 8,
  //       }),
  //     }),
  //   }
  // )

  // .post(
  //   "/updateavatar",
  //   async ({ jwt, body, set, cookie: { auth } }) => {
  //     try {
  //       if (!auth) return error(401, "Unauthorized");
  //       const profile = await jwt.verify(auth.value);

  //       if (!profile || typeof profile.id !== "string")
  //         return error(401, "Unauthorized");

  //       const avatar = body as Partial<IUpdateAvatar>;

  //       const updatedUser = await User.findByIdAndUpdate(
  //         { _id: profile.id },
  //         { $set: { ...avatar } },
  //         { new: true }
  //       ).select("-password");

  //       if (!updatedUser)
  //         return error(404, `User with id: ${profile.id} was not found.`);

  //       return updatedUser;
  //     } catch (error) {
  //       set.status = 500;
  //       return { message: `Internal server error ${error}` };
  //     }
  //   },

  //   {
  //     body: t.Object({
  //       avatar: t.String({}),
  //     }),
  //   }
  // )

  .group("/api/v1", (app) => app.use(userController))
  .group("/api/v1", (app) => app.use(taskRoutes))

  .listen(3000);

console.log("server on port : ", app.server?.port);
