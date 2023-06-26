import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";

import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(
		`SERVER running in ${process.env.NODE_ENV} mode on PORT ${process.env.PORT}`
			.bold.cyan.underline
	)
);
