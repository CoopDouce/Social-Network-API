import { User, Thought } from "../models/index.js";

const cleanDB = async () => {
  try {
    await User.deleteMany({});
    console.log("Users cleaned");

    await Thought.deleteMany({});
    console.log("Thoughts cleaned");
    } catch (err) {
    console.log("Error cleaning the db", err);
    process.exit(1);
  }
};

export default cleanDB;