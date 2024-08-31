import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { prompt, tag, uid } = await request.json();

    try {
        await connectToDB();
        const newPrompt = await Prompt.create({ creator: uid, prompt, tag });
        return new Response(JSON.stringify(newPrompt), { status: 200 })
    } catch (error) {
        console.log(error.message)
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}