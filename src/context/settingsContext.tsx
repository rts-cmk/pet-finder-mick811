import { createContext, useContext, useState } from "react";

export type UserSettings = {
  showDemo: boolean,
  favourites: Pet[],
  selectedCity: string | null,
  selectedCategory: string | null
}

const defaultSettings: UserSettings = {
    showDemo: true,
    favourites: [],
    selectedCity: null,
    selectedCategory: null,
  };

export const SettingsContext = createContext({
	settings: defaultSettings,
	updateSettings: (_values: UserSettings) => {},
});

export const SettingsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [currentSettings, setCurrentSettings] = useState<UserSettings>(() => {
		const rawSettings = localStorage.getItem("user_settings");
		if (rawSettings) {
			try {
				return {
					...defaultSettings,
					...(JSON.parse(rawSettings) as UserSettings),
				};
			} catch (error) {
				console.warn(
					`failed parse settings with error ${error}\n\n with data`,
					rawSettings,
				);
			}
		}
		return defaultSettings;
	});

	const updateSettings = (values: UserSettings) => {
		window.localStorage.setItem("user_settings", JSON.stringify(values));
		setCurrentSettings(values);
	};

	return (
		<SettingsContext.Provider
			value={{ settings: currentSettings, updateSettings }}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => useContext(SettingsContext);
