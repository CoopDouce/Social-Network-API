import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}).select("-__v");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v");
    if (!user) {
      res.status(404).json("User cant be found by that id");
      return;
    }
    res.status(200).json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!user) {
      res.status(404).json({ message: "User not found by that id" });
      return;
    }
    res.status(200).json(user);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    if (!user) {
      res.status(404).json({ message: "No user found by that id" });
      return;
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res
      .status(200)
      .json({ message: "User and their thoughts have been deleted" });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
};

export const addFriend = async (req: Request, res: Response) => {
  try {
    const friend = await User.findOne({ _id: req.params.friendId });
    if (!friend) {
      res
        .status(404)
        .json({ message: "This user cant be found to be added as a friend" });
      return;
    }
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: friend._id } },
      { new: true }
    ).populate("friends");
    if (!user) {
      res.status(404).json({ message: "Cannot be found by that id" });
      return;
    }

    res.status(201).json(user);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  try {
    const friend = await User.findOne({ _id: req.params.friendId });
    if (!friend) {
      res.status(404).json({ message: "Nobody not found by that id" });
      return;
    }
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: friend._id } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "User not found by that id" });
      return;
    }

    res.status(200).json({ message: "The friend is successfully deleted" });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
};