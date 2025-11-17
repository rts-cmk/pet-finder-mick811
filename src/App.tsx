import Demo from "./components/Demo";
import { useSettings } from "./context/settingsContext";

export default function App() {
  const { settings } = useSettings()

  if(settings.showDemo) {
    return <Demo />
  }

  return <div>Hello World</div>
}
