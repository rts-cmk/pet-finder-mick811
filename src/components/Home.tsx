import { useLoaderData } from "react-router"
import Header from "./ui/Header";
import ListView from "./ui/listview";

export default function Home() {
    const { dogs, user } = useLoaderData() as {
        dogs: Array<Pet>;
        user: User;
    };

    return (
        <div className="home">
            <Header image={user.image} location={user.location} />

            <section className="list-view">
                <ListView dogs={dogs} />
            </section>
        </div>
    )
}
