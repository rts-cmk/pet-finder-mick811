import { useLoaderData } from "react-router";
import { useSettings } from "../context/settingsContext";
import ListView from "./ui/listview";
import Header from "./ui/header";
import Footer from "./ui/footer";

export default function Favorites() {
    const { user } = useLoaderData() as { user: User };
    const { settings } = useSettings();

    return (
        <div className="home">
            <Header
                image={user.image}
                location={user.location}
                availableCities={[]}
                onCityChange={() => {}}
            />
            
            <section className="list-view">
                {settings.favourites.length > 0 ? (
                    <ListView dogs={settings.favourites} />
                ) : (
                    <div className="empty-favorites">
                        <p>No favorites yet. Start adding dogs to your favorites!</p>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}

