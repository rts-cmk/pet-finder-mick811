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
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

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

                    // Add category to each pet
                    const allPets = [
                        ...dogs.map((p: Pet) => ({ ...p, category: "Dogs" })),
                        ...cats.map((p: Pet) => ({ ...p, category: "Cats" })),
                        ...birds.map((p: Pet) => ({ ...p, category: "Birds" })),
                        ...others.map((p: Pet) => ({ ...p, category: "Other" }))
                    ];

                    return { pets: allPets, user };
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

            return { dog };
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
            return { user };
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

