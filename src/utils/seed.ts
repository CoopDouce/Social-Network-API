import db from "../config/connection.js";
import{ User, Thought } from "../models/index.js";
import cleanDB from "./cleanDB.js";
import { getRandomUsers, getRandomThoughts } from "./data.js";
import { Types } from "mongoose";

try {
    await db();
    await cleanDB();

    const thoughts = getRandomThoughts();
    const createdThoughts = await Thought.insertMany(thoughts);
    const createdIDs = createdThoughts.map(
      (thought) => new Types.ObjectId(thought._id as string)
    );
    const users = getRandomUsers(createdIDs);
    await User.insertMany(users);

    console.table(users);
    console.table(thoughts);
    console.info("Seed successful");
    process.exit(0);
}   catch(err) {
    console.log("error seeding the db", err);
}