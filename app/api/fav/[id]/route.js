import Users from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (req, { params }) => {
    try {
        const { uid, fav } = await req.json();
        // console.log(uid, fav)
        const user = await Users.findOne({ _id: uid })
        fav ? user.favourites.push(params.id) : user.favourites = user.favourites.filter(ele => ele != params.id)
        await user.save()
        return new Response(fav ? "Added to Favourites" : "Deleted from Favourites", { status: 200 })

    } catch (err) {
        console.log(err.message)
        return new Response("Server error", { status: 500 })
    }
}