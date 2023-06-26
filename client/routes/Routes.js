import React, { useEffect, useState } from "react";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
import Home from "../screens/Home";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderTabs from "../header/HeaderTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRequest } from "../axiosInstance";

const Stack = createNativeStackNavigator();

const Routes = () => {
	const [user, setUser] = useState(null);

	console.log(user);

	useEffect(() => {
		const fetchUser = async () => {
			const response = await AsyncStorage.getItem("user");
			const parsed = JSON.parse(response);
			setUser(parsed);
		};
		fetchUser();
	}, []);

	// console.log(profile);

	// const config = {
	// 	headers: {
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// };
	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		const res = await makeRequest.get("/users/me", config);

	// 		dispatch({ type: "GET_PROFILE", payload: res.data });
	// 	};
	// 	fetchUser();
	// }, [token, dispatch]);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="SignIn">
				{user ? (
					<Stack.Screen
						name="Home"
						component={Home}
						options={{ headerRight: () => <HeaderTabs /> }}
					/>
				) : (
					<>
						<Stack.Screen name="SignIn" component={SignIn} />
						<Stack.Screen name="SignUp" component={SignUp} />
						<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
