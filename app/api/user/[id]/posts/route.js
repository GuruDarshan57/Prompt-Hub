import Prompts from '@models/prompt'
import { connectToDB } from '@utils/database'

export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const res = await Prompts.find({ creator: params.id }).populate("creator")
        return new Response(JSON.stringify(res), { status: 200 })
    }
    catch (err) {
        console.log(err.message);
        return new Response("Error while fecthing posts by user", { status: 500 })
    }

}