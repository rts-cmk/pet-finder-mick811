import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App";
import "./styles/base.scss"
import { SettingsProvider } from "./context/settingsContext";
import axios from "axios";
import Home from "./components/Home";
import DogDetails from "./components/DogDetails";
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
                    const [{ data: dogs }, { data: user }] = await axios.all([
                        axios.get(`${import.meta.env.VITE_API_ENDPOINT}/dogs`),
                        axios.get(`${import.meta.env.VITE_API_ENDPOINT}/user`)
                    ]);

                    return { dogs, user };
                }
            }
        ]
    },
    {
        HydrateFallback: App,
        path: "/dog/:id",
        element: <DogDetails />,
        ErrorBoundary: ErrorBoundary,
        loader: async ({ params }) => {
            const { id } = params;
            const { data: dog } = await axios.get<Pet>(
                `${import.meta.env.VITE_API_ENDPOINT}/dogs/${id}`
            )

            return { dog };
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

