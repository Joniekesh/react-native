import User from "../models/User.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";

// Register
const register = async (req, res) => {
	const { fullname, email, password } = req.body;

	if (!fullname) {
		return res.status(400).json("Full name is required.");
	}

	if (!email) {
		return res.status(400).json("Email is required.");
	}

	if (!password || password.length < 6) {
		return res
			.status(400)
			.json("Password of 6 or more characters is required.");
	}

	const newUser = new User({
		fullname,
		email,
		password,
	});

	try {
		const user = await User.findOne({ email });

		if (user) {
			return res
				.status(400)
				.json(`A user with email ${user.email} already exist.`);
		}

		const savedUser = await newUser.save();

		res.status(200).json(savedUser);

		// const resetCode = nanoid(5).toUpperCase();

		// // Set reset code expire date
		// user.resetCodeExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
};

// Login
const login = async (req, res) => {
	const { email } = req.body;

	if (!email) return res.status(400).json("email is required.");

	if (!req.body.password || req.body.password.length < 6)
		return res
			.status(400)
			.json("Password of 6 or more characters is required.");

	try {
		const user = await User.findOne({ email });

		if (!user) return res.status(404).json("Invalid Credentials");

		const isMatch = await bcrypt.compare(req.body.password, user.password);

		if (!isMatch) return res.status(404).json("Invalid Credentials.");

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

		const { password, ...rest } = user._doc;

		res.status(200).json({
			user: rest,
			token,
		});
	} catch (err) {
		res.status(500).json(err);
	}
};

// Forgot password
const forgotPassword = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res
			.status(400)
			.json("Please provide your registered email with this site.");
	}

	try {
		let user = await User.findOne({ email });

		if (user.email !== email) {
			return res
				.status(400)
				.json(`The email address you provided is not found in the database!`);
		}

		const resetCode = nanoid(5).toUpperCase();
		user.resetCode = resetCode;

		// Set reset code expire date
		user.resetCodeExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

		await user.save();

		//HTML Message
		const message = `
		<h1>You have requested for a password reset.</h1>
      <p>Your RESET CODE is:</p> <b>${resetCode}</b>
		`;

		try {
			await sendEmail({
				to: user.email,
				subject: "Password Reset Request.",
				text: message,
			});

			res
				.status(200)
				.json("Email sent. Please check your inbox for a reset code.");
		} catch (error) {
			res.status(500).json(error);

			user.resetCode = undefined;
			user.resetCodeExpire = undefined;

			await user.save();
		}
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
};

// Reset password
const resetPassword = async (req, res) => {
	const { email, resetCode, password } = req.body;

	if (!password || password.length < 6) {
		return res
			.status(400)
			.json("Password of 6 or more characters is required.");
	}

	if (!resetCode) {
		return res.status(400).json("Reset code is required.");
	}

	if (!email) {
		return res.status(400).json("Email is required.");
	}

	try {
		let user = await User.findOne({
			email,
			resetCode,
			resetCodeExpire: { $gt: Date.now() },
		});

		if (!user) {
			return res
				.status(400)
				.json(`Invalid/expired reset code. Please Resend Reset Request.`);
		}

		user.password = password;
		user.resetCode = undefined;
		user.resetCodeExpire = undefined;
		await user.save();

		res.status(200).json("Password reset Successfull. You can now login.");
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
};

export { register, login, forgotPassword, resetPassword };
