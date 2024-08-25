import Feed from "@components/Feed"

const Home = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-[10px] sm:gap-1 text-center">
            <h1 className="mt-5 text-black text-5xl sm:text-6xl  font-extrabold leading-[1.2] sm:leading-[1.5">Discover & Share</h1>
            <div className="orange_gradient text-5xl sm:text-6xl font-extrabold text-center ">AI-Powered Prompts</div>
            <p className="text-base sm:text-lg text-slate-600 text-center tracking-widest sm:tracking-wider">Promp Hub is an open-source AI prompting tool for modern world to discover, create and share creative prompts</p>

            <Feed />
        </div>
    )
}

export default Home