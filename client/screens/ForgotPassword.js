import { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 30, marginBottom: 8 }}>Forgot Password</Text>
			<Text style={{ fontSize: 16, textAlign: "center", marginBottom: 100 }}>
				Please email password you used to register in this site
			</Text>
			<View style={styles.inputContainer}>
				<View style={styles.formInput}>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>Email:</Text>
					<TextInput
						style={styles.inpugtag}
						placeholder="Enter your email."
						autoCompleteType="email"
						keyboardType="email-address"
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>
				</View>
				<TouchableOpacity style={styles.btn}>
					<Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
						SUBMIT
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ForgotPassword;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		marginTop: 50,
		padding: 10,
		width: "100%",
	},
	inputContainer: {
		flex: 1,
		flexDirection: "column",
		gap: 100,
		width: "100%",
	},
	formInput: {
		display: "flex",
		flexDirection: "column",
		gap: 20,
		height: 30,

		fontSize: 20,
	},

	inpugtag: {
		marginBottom: 30,
		height: 30,
		width: "100%",
		borderBottomWidth: 0.5,
		borderBottomColor: "gray",
		fontSize: 20,
	},
	btn: {
		display: "flex",
		alignItems: "center",
		height: 50,
		width: "100%",
		backgroundColor: "darkblue",
		padding: 8,
		borderRadius: 5,
	},
});
