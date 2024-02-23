import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    minLenght: [8, "Password mus be 8 characters"],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    minLenght: 8,
    maxLenght: 8,
    required: true,
  },
  role: {
    type: String,
    uppercase: true,
    enum: ["ADMIN", "CLIENT"],
    required: true,
  },
});

export default mongoose.model("user", userSchema);
