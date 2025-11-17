import { useSettings } from "./context/settingsContext";

export default function App() {
  const { settings } = useSettings()

  if(settings.showDemo) {
    return <div>Show Demo</div>
  }

  return <div>Hello World</div>
}
