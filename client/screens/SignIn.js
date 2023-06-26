import { useContext, useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { makeRequest } from "../axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const SignIn = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { dispatch, loading } = useContext(AuthContext);

	const handleSubmit = async () => {
		if (email === "" || password === "") {
			return alert("All fields are required!");
		}
		dispatch({ type: "LOGIN_REQUEST" });
		try {
			const res = await makeRequest.post("/auth/login", { email, password });

			if (res && res.status === 200 && res.data) {
				dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
				dispatch({ type: "GET_PROFILE", payload: res.data });

				await AsyncStorage.setItem("user", JSON.stringify(res.data));
				navigation.navigate("Home");
			}
		} catch (err) {
			console.log(err);
			alert(err.response.data);
			dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
		}
	};

	return (
		<View style={styles.signIn}>
			<View style={styles.container}>
				<Text style={styles.title}>Sign In</Text>
				<View style={styles.form}>
					<View style={styles.inputContainer}>
						<Text style={styles.name}>EMAIL</Text>
						<TextInput
							style={styles.signUpInput}
							value={email}
							onChangeText={(text) => setEmail(text)}
							autoCompleteType="email"
							keyboardType="email-address"
						/>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.name}>PASSWORD</Text>
						<TextInput
							style={styles.signUpInput}
							value={password}
							onChangeText={(text) => setPassword(text)}
							autoCompleteType="password"
							secureTextEntry={true}
						/>
					</View>
					<TouchableOpacity style={styles.btn} onPress={handleSubmit}>
						<Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
							{loading ? "Loading..." : "Sign In"}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.bottom}>
					<Text>
						Dont't have an account?{" "}
						<Text
							style={styles.text}
							onPress={() => navigation.navigate("SignUp")}
						>
							{" "}
							SignUp
						</Text>
					</Text>
					<Text
						style={styles.exist}
						onPress={() => navigation.navigate("ForgotPassword")}
					>
						Forgot Password?
					</Text>
				</View>
			</View>
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	signIn: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	container: {
		justifyContent: "center",
		display: "flex",
		width: "90%",
	},
	name: {
		fontSize: 16,
	},
	title: {
		fontSize: 30,
		textAlign: "center",
		marginBottom: 30,
	},
	form: {
		// width: "100%",
	},
	inputContainer: {
		marginHorizontal: 24,
	},
	signUpInput: {
		height: 30,
		marginBottom: 30,
		borderBottomWidth: 0.5,
		borderBottomColor: "gray",
		fontSize: 20,
	},
	btn: {
		height: 50,
		backgroundColor: "darkblue",
		padding: 8,
		borderRadius: 5,
		marginHorizontal: 20,
	},
	bottom: {
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		gap: 10,
		marginTop: 20,
	},
	text: {
		fontSize: 18,
		color: "darkblue",
		fontWeight: "bold",
	},
	exist: {
		fontSize: 18,
		marginTop: 10,
		color: "darkblue",
		fontWeight: "bold",
	},
});
