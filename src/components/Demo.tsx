import { useSettings } from "../context/settingsContext"

export default function Demo() {
    const { settings, updateSettings } = useSettings();

    return (
        <div className="demo">
            <figure>
                <img
                    src="/assets/Animal.svg"
                    width={400}
                    loading="lazy"
                />
                <figcaption>
                    <h3>My Pets</h3>
                    <p>
                        Taking care of a pet is my favorite, it helps me to gaimr stress and fatigue.
                    </p>
                </figcaption>
            </figure>
            <button
                type="button"
                className="skip-button"
                onClick={() => {
                    updateSettings({ ...settings, showDemo: false, })
                }}
            >
                Skip
            </button>
        </div>
    )
}
