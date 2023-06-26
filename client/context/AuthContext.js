import { createContext, useEffect, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const INITIAL_STATE = {
	currentUser: null,
	loading: false,
	error: null,
};
const AuthReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN_REQUEST":
			return {
				currentUser: null,
				profile: null,
				loading: true,
				error: null,
			};

		case "LOGIN_SUCCESS":
			return {
				currentUser: action.payload,
				loading: false,
				error: null,
			};

		case "LOGIN_FAILURE":
			return {
				currentUser: null,
				loading: false,
				error: action.payload,
			};

		case "GET_PROFILE":
			return {
				profile: action.payload,
			};

		case "LOGOUT":
			return {
				INITIAL_STATE,
			};

		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	useEffect(() => {
		const setUser = async () => {
			await AsyncStorage.setItem("user", JSON.stringify(state.currentUser));
		};
		setUser();
	}, [state.currentUser]);

	return (
		<AuthContext.Provider
			value={{
				currentUser: state.currentUser,
				loading: state.loading,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
