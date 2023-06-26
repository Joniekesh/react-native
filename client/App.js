import { StatusBar } from "expo-status-bar";
import { AuthContextProvider } from "./context/AuthContext";
import Routes from "./routes/Routes";

export default function App() {
	return (
		<AuthContextProvider>
			<Routes />
			{/* <StatusBar style="auto" /> */}
		</AuthContextProvider>
	);
}
