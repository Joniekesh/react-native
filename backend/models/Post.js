const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
			required: true,
			max: 100,
		},
		desc: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: true,
		},
		views: {
			type: Number,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Post", PostSchema);
