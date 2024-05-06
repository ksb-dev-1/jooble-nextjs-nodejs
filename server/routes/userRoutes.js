import { Router } from "express";

const router = Router();
import {
  authenticateUser,
  authorizePermissions,
} from "../middlewares/authentication.js";
import {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  getKeySkills,
  updateUserProfile,
  createKeySkills,
  updateKeySkills,
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  updateUserEmail,
  updateUserPassword,
} from "../controllers/userController.js";

// router
//   .route("/")
//   .get(authenticateUser, authorizePermissions("admin"), getAllUsers);
// router.route("/getMe").get(authenticateUser, getCurrentUser);
// router.route("/updateUser").patch(authenticateUser, updateUser);
// router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
// router.route("/:id").get(authenticateUser, getSingleUser);

router.route("/").get(getAllUsers);

router.route("/get-current-user").get(authenticateUser, getCurrentUser);

router.route("/update-profile").patch(authenticateUser, updateUserProfile);

router.route("/get-key-skills").get(authenticateUser, getKeySkills);
router.route("/create-key-skills").post(authenticateUser, createKeySkills);
router.route("/update-key-skills").patch(authenticateUser, updateKeySkills);

router.route("/get-projects").get(authenticateUser, getProjects);
router.route("/get-project/:id").get(authenticateUser, getProject);
router.route("/create-project").post(authenticateUser, createProject);
router.route("/update-project/:id").patch(authenticateUser, updateProject);
router.route("/delete-project/:id").delete(authenticateUser, deleteProject);

router.route("/update-email").patch(updateUserEmail);

router.route("/update-password").patch(updateUserPassword);

router.route("/:id").get(getSingleUser);

export default router;
