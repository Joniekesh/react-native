import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log(`You Successfully Connected to MongoDB!`.yellow.bold.underline);
	} catch (err) {
		console.log(err);
	}
};
export { connectDB };
