import { useLoaderData } from "react-router"
import Header from "./ui/header";
import ListView from "./ui/listview";
import Footer from "./ui/footer";

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

            <Footer />
        </div>
    )
}
