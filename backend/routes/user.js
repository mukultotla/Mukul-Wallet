const express = require("express");
const { signUp, signIn, updateUser, userList } = require("../controllers/user");
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.put("/update", updateUser);
router.get('/bulk', userList)
module.exports = router;
