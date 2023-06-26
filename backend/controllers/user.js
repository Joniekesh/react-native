import User from "../models/User.js";

// Get profile
const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		const { password, ...rest } = user._doc;

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
};

export { getProfile };
