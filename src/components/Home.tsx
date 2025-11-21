import { useLoaderData } from "react-router"
import { useMemo } from "react";
import Header from "./ui/header";
import ListView from "./ui/listview";
import Footer from "./ui/footer";
import { useSettings } from "../context/settingsContext";

export default function Home() {
    const { dogs, user } = useLoaderData() as {
        dogs: Array<Pet>;
        user: User;
    };
    const { settings, updateSettings } = useSettings();

    // Get unique cities from dogs data
    const availableCities = useMemo(() => {
        const cities = new Set(dogs.map(dog => dog.location));
        return Array.from(cities).sort();
    }, [dogs]);

    // Use selectedCity from settings, or default to user.location
    const selectedCity = settings.selectedCity || user.location;

    // Filter dogs based on selected city
    const filteredDogs = useMemo(() => {
        if (!selectedCity || selectedCity === user.location) {
            return dogs;
        }
        return dogs.filter(dog => dog.location === selectedCity);
    }, [dogs, selectedCity, user.location]);

    const handleCityChange = (city: string) => {
        updateSettings({
            ...settings,
            selectedCity: city === user.location ? null : city
        });
    };

    return (
        <div className="home">
            <Header 
                image={user.image} 
                location={selectedCity} 
                availableCities={availableCities}
                defaultLocation={user.location}
                onCityChange={handleCityChange}
            />

            <section className="list-view">
                <ListView dogs={filteredDogs} />
            </section>

            <Footer />
        </div>
    )
}
