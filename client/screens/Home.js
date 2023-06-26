import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
	// const { currentUser } = useContext(AuthContext);
	// const [user, setUser] = useState(null);

	// useEffect(() => {
	// 	if (!user) {
	// 		navigation.navigate("SignIn");
	// 	}
	// }, [user]);

	// console.log(user);

	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		const response = await AsyncStorage.getItem("user");
	// 		const parsed = JSON.parse(response);
	// 		setUser(parsed);
	// 	};
	// 	fetchUser();
	// }, []);

	// console.log(currentUser);

	// const isAuthenticated = currentUser !== null;

	// console.log(isAuthenticated);
	// console.log(currentUser.user.fullname);

	// useEffect(() => {
	// 	if (!isAuthenticated) {
	// 		navigation.navigate("SignIn");
	// 	}
	// }, [isAuthenticated]);

	return (
		<View style={styles.home}>
			<Text>Home</Text>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	home: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
});
