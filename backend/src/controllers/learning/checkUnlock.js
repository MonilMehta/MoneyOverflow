import { LearningPath } from "../../models/lesson.models.js";
import { User } from "../../models/user.models.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const checkUnlock = asyncHandler(async (req, res) => {
  const { userId, id } = req.body;

  const learningPath = await LearningPath.findById(id);
  const user = await User.findById(userId);

  if (!learningPath) {
    throw new ApiError(404, "Learning Path Not Found");
  }

  if (learningPath.index > user.highestCompletedIndex + 1) {
    throw new ApiError(403, "Complete previous courses to unlock this one");
  }

  return res.status(200).json(new ApiResponse(200, {isUnlocked: true}, "This course is unlocked"));
});

