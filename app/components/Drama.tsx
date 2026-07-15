import { useState } from "react"

export const MovieSearch = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "URGENTTE",
            description:
                "Urgentte is a fast-paced thriller centered on a critical situation where every second counts, pushing ordinary people into extraordinary choices under pressure. ⏱️",
            poster:
                "https://i.pinimg.com/736x/de/48/49/de48494bb12ff31cff7a404811c507dd.jpg",
        },
        {
            id: 2,
            title: "Ballerina",
            description:
                "Ballerina is a powerful story of discipline, sacrifice, and passion, following a dancer’s relentless pursuit of perfection on and off the stage. 🩰",
            poster:
                "https://i.pinimg.com/1200x/19/fe/29/19fe292014ca910a14fe46810e00e188.jpg",
        },
        {
            id: 3,
            title: "Madaari",
            description:
                "Madari is a powerful social thriller about a common man who takes on a corrupt system after personal loss forces him to seek justice. 🎬",
            poster:
                "https://i.pinimg.com/1200x/73/79/75/7379753f96a5ffa68ce02cea5ebd95f1.jpg",
        },
        {
            id: 4,
            title: "Rebel Moon",
            description:
                "Rebel Moon is a sci-fi epic about a small colony that rises against a ruthless empire, led by a mysterious warrior with a hidden past. 🚀",
            poster:
                "https://i.pinimg.com/736x/d5/29/fd/d529fd528132f643f8cd6efa91b3bf2c.jpg",
        },
        {
            id: 5,
            title: "Ninjak vs The Valiant Universe",
            description:
                "Ninjak vs the Valiant Universe is an action-packed superhero film where a lone warrior faces powerful heroes to stop a world-ending threat. ⚔️",
            poster:
                "https://i.pinimg.com/1200x/e0/94/e8/e094e88b7fb93a5f0c1ba4cd951904d3.jpg",
        },
        {
            id: 6,
            title: "Deva",
            description:
                "Deva is an intense action drama about a fierce man driven by duty, rage, and justice as he takes on powerful enemies and his own past. 🎬",
            poster:
                "https://i.pinimg.com/1200x/b9/d4/d4/b9d4d49851ac564ad044e5f960890f77.jpg",
        },
        {
            id: 7,
            title: "Kingdom",
            description:
                "Kingdom is a gripping historical thriller where a deadly plague turns people into monsters, forcing a prince to fight for survival, truth, and his kingdom. 👑🧟‍♂️ 🇮🇳",
            poster:
                "https://i.pinimg.com/736x/db/98/6c/db986c6e218914771e3ad5a3b50d96c8.jpg",
        },
        {
            id: 8,
            title: "FIR",
            description:
                "FIR is a tense thriller about an innocent man trapped by suspicion and prejudice as he fights to prove the truth and reclaim his life. 🎬",
            poster:
                "https://i.pinimg.com/1200x/9a/6a/2a/9a6a2aef98b281ac5b569d20d5b7dd38.jpg",
        },
        {
            id: 9,
            title: "Twenty One Grams",
            description:
                "Ninjak vs the Valiant Universe is an action-packed superhero film where a lone warrior faces powerful heroes to stop a world-ending threat. ⚔️",
            poster:
                "https://i.pinimg.com/1200x/b5/d1/66/b5d1667096e431cf45b236937f23d551.jpg",
        },
        {
            id: 10,
            title: "Jeeg Robot",
            description:
                "Jeeg Robot is a gritty superhero story about an unlikely hero who gains mechanical powers and must choose between chaos and saving his city. 🤖",
            poster:
                "https://i.pinimg.com/736x/de/48/49/de48494bb12ff31cff7a404811c507dd.jpg",
        },
    ])

    return <div>
        <div className="w-full mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 rounded-lg p-2">
                {movies && movies.map((movie) =>
                    <ul>
                        <li className="bg-gray-900 p-2 shadow-lg/20 hover:shadow-indigo-500 rounded-lg transition-transform hover:scale-105 duration-150 cursor-pointer" key={movie.id}>
                            <h1 className="text-left text-white">{movie.title}</h1>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    </div>
}