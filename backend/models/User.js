import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
			min: 3,
			max: 100,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 30,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		img: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		resetCode: {
			type: String,
		},
		resetCodeExpire: {
			type: String,
		},
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

export default mongoose.model("User", UserSchema);
