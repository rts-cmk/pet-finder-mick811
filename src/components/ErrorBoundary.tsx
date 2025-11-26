import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";

export default function ErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="error-boundary">
                <h1>{error.status}</h1>
                <h2>{error.statusText || "Error"}</h2>
                <p>
                    {error.data 
                        ? typeof error.data === 'string' 
                            ? error.data 
                            : "An error occurred while loading this page."
                        : `We encountered a ${error.status} error. This might be due to a network issue or the requested resource not being available.`}
                </p>
                <button className="back-button" onClick={() => navigate("/")}>
                    Go Home
                </button>
            </div>
        );
    } else if (error instanceof Error) {
        return (
            <div className="error-boundary">
                <h1>Oops! Something went wrong</h1>
                <p>
                    <strong>Error:</strong> {error.message || "An unexpected error occurred"}
                </p>
                <p>
                    This error occurred while trying to load or process data. Please check your connection and try again, or return to the home page.
                </p>
                <button className="back-button" onClick={() => navigate("/")}>
                    Go Home
                </button>
            </div>
        );
    } else {
        return (
            <div className="error-boundary">
                <h1>Unknown Error</h1>
                <p>
                    An unexpected error occurred that we couldn't identify. This might be due to:
                </p>
                <ul>
                    <li>Network connectivity issues</li>
                    <li>Server problems</li>
                    <li>An unexpected application error</li>
                </ul>
                <p>Please try refreshing the page or return to the home page.</p>
                <button className="back-button" onClick={() => navigate("/")}>
                    Go Home
                </button>
            </div>
        );
    }
}

