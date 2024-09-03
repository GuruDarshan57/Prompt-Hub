import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

export const GET = async (req, { params }) => {
    try {
        await connectToDB
        const res = await Prompt.findOne({ _id: params.id })
        return new Response(JSON.stringify(res), { status: 200 })

    } catch (err) {
        console.log(err.message)
        return new Response("Failed to get post.", { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const pos = await req.json()
    try {
        console.log(pos)
        await connectToDB
        const res = await Prompt.findByIdAndUpdate(params.id, { prompt: pos.post.prompt, tag: pos.post.tag })
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (err) {
        console.log(err.message)
        return new Response("Failed to edit post.", { status: 500 })
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB
        const res = await Prompt.findByIdAndDelete(params.id)
        return new Response(JSON.stringify(res), { status: 200 })

    } catch (err) {
        console.log(err.message)
        return new Response("Failed to delete post.", { status: 500 })
    }
}