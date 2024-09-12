import Prompts from "@models/prompt";
import { connectToDB } from "@utils/database";
import { revalidatePath } from "next/cache";

export const GET = async (request) => {
    try {
        await connectToDB()

        revalidatePath(request.url)
        const prompts = await Prompts.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error.message)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 