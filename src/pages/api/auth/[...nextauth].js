import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userModel from "@/schema/userModel";
import bcrypt from "bcryptjs";
import mongoDBConnect from "@/lib/mongodb_con";
mongoDBConnect();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;
        const user = await userModel.findOne({ username });
        if (!user) {
          throw new Error("username tidak di temukan");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("password salah");
        }

        return {
          id: user._id,
          username: user.username,
          password: user.password,
        };
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: "auth/signin",
  },
});
