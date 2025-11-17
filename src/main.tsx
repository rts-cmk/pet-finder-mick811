import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App";
import "./styles/base.scss"
import { SettingsProvider } from "./context/settingsContext";
import axios from "axios";
import Home from "./components/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: async () => {
            const [{ data: dogs }, { data: user }] = await axios.all([
              axios.get(`${import.meta.env.VITE_API_ENDPOINT}/dogs`),
              axios.get(`${import.meta.env.VITE_API_ENDPOINT}/user`)
            ]);
  
            return { dogs, user };
          }
        }
      ]
    }
  ]);

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
    <SettingsProvider>
        <RouterProvider router={router} />
    </SettingsProvider>
);

