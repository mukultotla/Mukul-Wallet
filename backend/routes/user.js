const express = require("express");
const { signUp, signIn, updateUser } = require("../controllers/user");
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.put("/update", updateUser);
module.exports = router;
