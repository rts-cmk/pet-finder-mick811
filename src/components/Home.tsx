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

        // Filter by category
        if (settings.selectedCategory) {
            const category = settings.selectedCategory.toLowerCase();
            // Singularize category name for searching (e.g. "Dogs" -> "dog")
            const searchTerm = category.endsWith('s') ? category.slice(0, -1) : category;
            
            filtered = filtered.filter(pet => {
                // 1. Check explicit category field if it exists
                if (pet.category) {
                    return pet.category.toLowerCase() === category || 
                           pet.category.toLowerCase() === searchTerm;
                }
                
                // 2. Fallback: Check if breed or description contains the category name
                // This works well for "Dogs" since "Bulldog", "Sheepdog" etc contain "dog"
                // and descriptions often mention "dog" or "cat"
                const searchableText = `${pet.breed} ${pet.long_description} ${pet.short_description}`.toLowerCase();
                return searchableText.includes(searchTerm);
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
