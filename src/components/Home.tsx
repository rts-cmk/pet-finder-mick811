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

    // Filter dogs based on selected city and category
    const filteredDogs = useMemo(() => {
        let filtered = dogs;

        // Filter by city
        if (selectedCity && selectedCity !== user.location) {
            filtered = filtered.filter(dog => dog.location === selectedCity);
        }

        // Filter by category (if category exists in Pet data)
        if (settings.selectedCategory) {
            // For now, since all pets are dogs, we'll filter by category when it's available
            // If category field exists, use it; otherwise, assume all are "Dogs"
            filtered = filtered.filter(dog => {
                const petCategory = (dog as any).category || 'Dogs';
                return petCategory === settings.selectedCategory;
            });
        }

        return filtered;
    }, [dogs, selectedCity, user.location, settings.selectedCategory]);

    const handleCityChange = (city: string) => {
        updateSettings({
            ...settings,
            selectedCity: city === user.location ? null : city
        });
    };

    const handleCategoryChange = (category: string | null) => {
        updateSettings({
            ...settings,
            selectedCategory: category
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
                selectedCategory={settings.selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            <section className="list-view">
                <ListView dogs={filteredDogs} />
            </section>

            <Footer />
        </div>
    )
}
