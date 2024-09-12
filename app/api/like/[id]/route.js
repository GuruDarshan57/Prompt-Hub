import Users from "@models/user";
import Prompts from '@models/prompt'
import { connectToDB } from "@utils/database";

export const POST = async (req, { params }) => {
    try {
        await connectToDB()

        const { uid, setlike } = await req.json();
        console.log(uid, setlike)
        const user = await Users.findOne({ _id: uid })
        setlike ? user.liked.push(params.id) : user.liked = user.liked.filter(ele => ele != params.id)
        await user.save()
        const prompt = await Prompts.findOne({ _id: params.id })
        setlike ? prompt.likes.push(uid) : prompt.likes = prompt.likes.filter(ele => ele != uid)
        await prompt.save()
        return new Response(setlike ? "Like added" : "Like deleted", { status: 200 })

    } catch (err) {
        console.log(err.message)
        return new Response("Server error", { status: 500 })
    }
}