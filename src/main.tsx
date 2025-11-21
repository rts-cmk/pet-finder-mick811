import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App";
import "./styles/base.scss"
import { SettingsProvider } from "./context/settingsContext";
import axios from "axios";
import Home from "./components/Home";
import DogDetails from "./components/DogDetails";
import Favorites from "./components/Favorites";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

const transformImageUrl = (url: string): string => {
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
    if (!apiEndpoint) return url;
    
    // Replace localhost URLs with production API endpoint
    // Handles both http://localhost:4000 and http://localhost:PORT patterns
    return url.replace(/http:\/\/localhost:\d+/, apiEndpoint);
};

const transformPet = (pet: Pet): Pet => ({
    ...pet,
    image: transformImageUrl(pet.image)
});

const transformUser = (user: User): User => ({
    ...user,
    image: transformImageUrl(user.image)
});

const router = createBrowserRouter([
    {
        HydrateFallback: App,
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
                ErrorBoundary: ErrorBoundary,
                loader: async () => {
                    const [
                        { data: dogs }, 
                        { data: cats },
                        { data: birds },
                        { data: others },
                        { data: user }
                    ] = await axios.all([
                        axios.get(`${import.meta.env.VITE_API_ENDPOINT}/dog`),
                        axios.get(`${import.meta.env.VITE_API_ENDPOINT}/cat`),
                        axios.get(`${import.meta.env.VITE_API_ENDPOINT}/bird`),
                        axios.get(`${import.meta.env.VITE_API_ENDPOINT}/other`),
                        axios.get(`${import.meta.env.VITE_API_ENDPOINT}/user`)
                    ]);

                    // Add category to each pet and transform image URLs
                    const allPets = [
                        ...dogs.map((p: Pet) => transformPet({ ...p, category: "Dogs" })),
                        ...cats.map((p: Pet) => transformPet({ ...p, category: "Cats" })),
                        ...birds.map((p: Pet) => transformPet({ ...p, category: "Birds" })),
                        ...others.map((p: Pet) => transformPet({ ...p, category: "Other" }))
                    ];

                    return { pets: allPets, user: transformUser(user) };
                }
            }
        ]
    },
    {
        HydrateFallback: App,
        path: "/pet/:category/:id",
        element: <DogDetails />,
        ErrorBoundary: ErrorBoundary,
        loader: async ({ params }) => {
            const { id, category } = params;
            // Map frontend category to API endpoint
            const categoryMap: Record<string, string> = {
                "dogs": "dog",
                "cats": "cat",
                "birds": "bird",
                "other": "other"
            };
            const endpoint = categoryMap[category?.toLowerCase() || "dogs"] || "dog";
            
            const { data: dog } = await axios.get<Pet>(
                `${import.meta.env.VITE_API_ENDPOINT}/${endpoint}/${id}`
            )

            return { dog: transformPet(dog) };
        }
    },
    {
        path: "/favorites",
        element: <Favorites />,
        ErrorBoundary: ErrorBoundary,
        loader: async () => {
            const { data: user } = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/user`
            );
            return { user: transformUser(user) };
        }
    },
    {
        path: "/profile",
        element: <Profile />,
        ErrorBoundary: ErrorBoundary,
        loader: async () => {
            const { data: user } = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/user`
            );
            return { user: transformUser(user) };
        }
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
    <SettingsProvider>
        <RouterProvider router={router} />
    </SettingsProvider>
);

