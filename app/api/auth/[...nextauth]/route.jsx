import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

import Users from '@models/user';
import { connectToDB } from '@utils/database';
import { signIn } from "next-auth/react";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.Google_ID,
            clientSecret: process.env.Google_Secret_Key,
        })
    ],
    callbacks: {
        async session({ session }) {

            try {
                await connectToDB();
                const sessionUser = await Users.findOne({ email: session.user.email });
                session.user.id = sessionUser._id.toString();
                session.user.fav = sessionUser.favourites

                return session;
            } catch (err) {
                console.log(err.message)
            }
        },
        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDB();

                // check if user already exists
                const userExists = await Users.findOne({ email: profile.email });

                // if not, create a new document and save user in MongoDB
                if (!userExists) {
                    await Users.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }

                return true
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false
            }
        }
    }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }