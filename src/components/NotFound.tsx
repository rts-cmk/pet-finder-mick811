import { useNavigate } from "react-router";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>

            <button className="back-button" onClick={() => navigate("/")}>
                Go Home
            </button>
        </div>
    );
}
