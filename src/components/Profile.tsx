import { useLoaderData } from "react-router";
import { useSettings } from "../context/settingsContext";
import Header from "./ui/header";
import Footer from "./ui/footer";

export default function Profile() {
    const { user } = useLoaderData() as { user: User };
    const { settings } = useSettings();

    return (
        <div className="home">
            <Header
                image={user.image}
                location={user.location}
                availableCities={[]}
                onCityChange={() => {}}
                selectedCategory={null}
                onCategoryChange={() => {}}
            />
            
            <section className="profile-section">
                <div className="profile-card">
                    <div className="profile-header">
                        <figure className="profile-avatar">
                            <img src={user.image} alt="Profile" />
                        </figure>
                        <h1>Profile</h1>
                    </div>

                    <div className="profile-info">
                        <div className="info-item">
                            <div className="info-label">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8 1.33334C5.3926 1.33334 2.66667 3.30435 2.66667 6.55073C2.66667 9.62319 7.40741 14.3188 7.58519 14.4928C7.70371 14.6087 7.82223 14.6667 8 14.6667C8.17778 14.6667 8.2963 14.6087 8.41482 14.4928C8.5926 14.3188 13.3333 9.62319 13.3333 6.55073C13.3333 3.30435 10.6074 1.33334 8 1.33334ZM8 8.44444C6.99259 8.44444 6.22222 7.67407 6.22222 6.66667C6.22222 5.65926 6.99259 4.88889 8 4.88889C9.00741 4.88889 9.77778 5.65926 9.77778 6.66667C9.77778 7.67407 9.00741 8.44444 8 8.44444Z" fill="#5533EA" />
                                </svg>
                                <span>Location</span>
                            </div>
                            <p className="info-value">{user.location}</p>
                        </div>

                        <div className="info-item">
                            <div className="info-label">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.45657 1.24754C7.85098 1.08411 8.27372 1 8.70064 1C9.12757 1 9.55031 1.08411 9.94472 1.24754C10.3391 1.41093 10.6973 1.6504 10.9991 1.95228C11.301 2.25405 11.5406 2.6125 11.704 3.00684C11.8674 3.40125 11.9516 3.82399 11.9516 4.25091C11.9516 4.67784 11.8674 5.10058 11.704 5.49499C11.5406 5.88936 11.3011 6.24767 10.9992 6.54947C10.9992 6.54949 10.9992 6.54944 10.9992 6.54947L6.5792 10.9695C6.38394 11.1647 6.06735 11.1647 5.87209 10.9695L1.45209 6.54947C0.842478 5.93985 0.5 5.11304 0.5 4.25091C0.5 3.38879 0.842478 2.56197 1.45209 1.95236C2.06171 1.34275 2.88852 1.00027 3.75065 1.00027C4.61277 1.00027 5.43958 1.34275 6.0492 1.95236L6.22565 2.12881L6.40201 1.95244C6.40198 1.95247 6.40204 1.95241 6.40201 1.95244C6.7038 1.65053 7.0622 1.41095 7.45657 1.24754ZM8.70064 2C8.40508 2 8.11241 2.05823 7.83936 2.17137C7.56631 2.28451 7.31823 2.45034 7.10928 2.65938L6.5792 3.18947C6.38394 3.38473 6.06735 3.38473 5.87209 3.18947L5.34209 2.65947C4.92001 2.23739 4.34755 2.00027 3.75065 2.00027C3.15374 2.00027 2.58128 2.23739 2.1592 2.65947C1.73712 3.08154 1.5 3.654 1.5 4.25091C1.5 4.84782 1.73712 5.42028 2.1592 5.84236L6.22565 9.90881L10.2921 5.84236C10.5011 5.63341 10.667 5.38525 10.7802 5.11219C10.8933 4.83914 10.9516 4.54648 10.9516 4.25091C10.9516 3.95535 10.8933 3.66268 10.7802 3.38963C10.667 3.11658 10.5012 2.86849 10.2922 2.65955C10.0832 2.45051 9.83498 2.28451 9.56193 2.17137C9.28887 2.05823 8.99621 2 8.70064 2Z" fill="#5533EA" />
                                </svg>
                                <span>Favorites</span>
                            </div>
                            <p className="info-value">{settings.favourites.length} pets</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

