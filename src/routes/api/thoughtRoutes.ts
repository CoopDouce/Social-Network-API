import { Router } from "express";
const router = Router();

import {
  createReaction,
  createThought,
  getAllThoughts,
  getSingleThought,
  removeReaction,
  removeThought,
  updateThought,
} from "../../controllers/thoughtController.js";

router.get("/", getAllThoughts);
router.get("/:thoughtId", getSingleThought);
router.post("/", createThought);
router.put("/:thoughtId", updateThought);
router.delete("/:thoughtId", removeThought);
router.post("/:thoughtId/reactions", createReaction);
router.delete("/:thoughtId/reactions/:reactionId", removeReaction);

export default router;