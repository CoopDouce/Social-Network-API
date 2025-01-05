import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      res.status(404).json({ message: "No thought found by that id" });
      return;
    }
    res.status(200).json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "User not found by that id" });
    }
    res.status(201).json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res.status(404).json("Thought not found by that id");
      return;
    }
    res.status(200).json({ message: "Thought has been updated", thought });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const removeThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });
    if (!thought) {
      res.status(404).json({ message: "Thought cant be found by that id" });
      return;
    }
    const user = await User.findOneAndUpdate(
      {
        thoughts: req.params.thoughtId,
      },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json("No user associated with that thought id was found");
      return;
    }
    res.status(200).json({ message: "Thought has been deleted" });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const createReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $addToSet: { reactions: req.body },
      },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res.status(404).json({ message: "Thought not found by that id" });
      return;
    }
    res.status(200).json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: "No thought was found by that id" });
      return;
    }
    res
      .status(200)
      .json({ message: "Reaction has been removed from the thought", thought });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};