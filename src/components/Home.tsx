import { useLoaderData } from "react-router"
import Header from "./ui/Header";

export default function Home() {
    const { dogs, user } = useLoaderData() as {
        dogs: Array<Pet>;
        user: User;
    };

    return (
        <div className="home">
            <Header image={user.image} location={user.location} />
        </div>
    )
}
