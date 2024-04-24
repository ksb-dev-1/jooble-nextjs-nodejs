import { Router } from "express";

const router = Router();
import {
  authenticateUser,
  authorizePermissions,
} from "../middlewares/authentication.js";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  getKeySkills,
  editKeySkills,
  editUserProfile,
  updateUserEmail,
  updateUserPassword,
} from "../controllers/userController.js";

// router
//   .route("/")
//   .get(authenticateUser, authorizePermissions("admin"), getAllUsers);
// router.route("/showMe").get(authenticateUser, showCurrentUser);
// router.route("/updateUser").patch(authenticateUser, updateUser);
// router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
// router.route("/:id").get(authenticateUser, getSingleUser);

router.route("/").get(getAllUsers);
router.route("/show-me").get(authenticateUser, showCurrentUser);
router.route("/edit-profile").patch(authenticateUser, editUserProfile);
router.route("/get-key-skills").get(authenticateUser, getKeySkills);
router.route("/edit-key-skills").patch(authenticateUser, editKeySkills);
router.route("/update-email").patch(updateUserEmail);
router.route("/update-password").patch(updateUserPassword);
router.route("/:id").get(getSingleUser);

export default router;
