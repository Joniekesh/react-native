import { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { makeRequest } from "../axiosInstance";

const SignUp = ({ navigation }) => {
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async () => {
		if (fullname === "" || email === "" || password === "") {
			alert("All fields are required|");
		}

		if (password !== confirmPassword) {
			return alert("Passwords do not match!");
		}

		try {
			const res = await makeRequest.post("/auth", {
				fullname,
				email,
				password,
			});
			if (res.status === 200) {
				alert("Registration Success. You can now login.");
				navigation.navigate("SignIn");
				// console.log(res.data);
			}
			console.log(res);
		} catch (err) {
			console.log(err);
			if (err.response.data) {
				alert(err.response.data);
			}
		}
	};

	return (
		<View style={styles.signUp}>
			<View style={styles.container}>
				<Text style={styles.title}>Sign Up</Text>
				<View style={styles.form}>
					<View style={styles.inputContainer}>
						<Text style={styles.name}>FULL NAME</Text>
						<TextInput
							style={styles.signUpInput}
							value={fullname}
							onChangeText={(text) => setFullname(text)}
							autoCorrect={false}
						/>
					</View>
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
					<View style={styles.inputContainer}>
						<Text style={styles.name}>CONFIRM PASSWORD</Text>
						<TextInput
							style={styles.signUpInput}
							value={confirmPassword}
							onChangeText={(text) => setConfirmPassword(text)}
							autoCompleteType="password"
							secureTextEntry={true}
						/>
					</View>
					<TouchableOpacity
						type="submit"
						style={styles.btn}
						onPress={handleSubmit}
					>
						<Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.bottom}>
					<Text
						style={styles.text}
						onPress={() => navigation.navigate("SignIn")}
					>
						Already have an account? <Text style={styles.exist}> SignIn</Text>
					</Text>
				</View>
			</View>
		</View>
	);
};

export default SignUp;

const styles = StyleSheet.create({
	signUp: {
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
		// fontSize: 18,
	},
	exist: {
		fontSize: 18,
		color: "darkblue",
		fontWeight: "bold",
	},
});
