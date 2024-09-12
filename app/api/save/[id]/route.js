import Users from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (req, { params }) => {
    try {
        await connectToDB()

        const { uid, setsave } = await req.json();
        // console.log(uid, setsave)
        const user = await Users.findOne({ _id: uid })
        setsave ? user.saved.push(params.id) : user.saved = user.saved.filter(ele => ele != params.id)
        await user.save()
        return new Response(setsave ? "Like added" : "Like deleted", { status: 200 })

    } catch (err) {
        console.log(err.message)
        return new Response("Server error", { status: 500 })
    }
}