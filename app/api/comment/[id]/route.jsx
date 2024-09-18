import Prompts from '@models/prompt'
import { connectToDB } from "@utils/database";

export const POST = async (req, { params }) => {
    try {
        await connectToDB()
        const newComment = await req.json()
        // console.log(newComment, params.id)
        const prompt = await Prompts.findOne({ _id: params.id })
        prompt.comments.push(newComment)
        await prompt.save()
        return new Response("Comment Added", { status: 200 })

    } catch (err) {
        console.log(err.message)
        return new Response("Failed to add comment", { status: 500 })
    }
}