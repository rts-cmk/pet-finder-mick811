import { useLoaderData } from "react-router"
import { useMemo } from "react";
import Header from "./ui/header";
import ListView from "./ui/listview";
import Footer from "./ui/footer";
import { useSettings } from "../context/settingsContext";

export default function Home() {
    const { pets, user } = useLoaderData() as {
        pets: Array<Pet>;
        user: User;
    };
    const { settings, updateSettings } = useSettings();

    // Get unique cities from pets data
    const availableCities = useMemo(() => {
        const cities = new Set(pets.map(pet => pet.location));
        return ["All Cities", ...Array.from(cities).sort()];
    }, [pets]);

    // Use selectedCity from settings, or default to "All Cities"
    const selectedCity = settings.selectedCity || "All Cities";

    // Filter pets based on selected city and category
    const filteredPets = useMemo(() => {
        let filtered = pets;

        // Filter by city
        if (selectedCity && selectedCity !== "All Cities") {
            filtered = filtered.filter(pet => pet.location === selectedCity);
        }

        // Filter by category
        if (settings.selectedCategory) {
            filtered = filtered.filter(pet => {
                return pet.category === settings.selectedCategory;
            });
        }

        return filtered;
    }, [pets, selectedCity, settings.selectedCategory]);

    const handleCityChange = (city: string) => {
        updateSettings({
            ...settings,
            selectedCity: city
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
                onCityChange={handleCityChange}
                selectedCategory={settings.selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            <section className="list-view">
                <ListView pets={filteredPets} />
            </section>

            <Footer />
        </div>
    )
}
