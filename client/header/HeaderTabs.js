import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const HeaderTabs = () => {
	const { dispatch } = useContext(AuthContext);

	const navigation = useNavigation();

	const logout = async () => {
		dispatch({ type: "LOGOUT" });
		await AsyncStorage.removeItem("user");
		navigation.navigate("SignIn");
	};

	return (
		<SafeAreaView>
			<TouchableOpacity onPress={logout}>
				<FontAwesome5 name="sign-out-alt" size={25} color="darkmagenta" />
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default HeaderTabs;
