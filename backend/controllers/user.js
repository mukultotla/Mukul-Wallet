const { z } = require("zod");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const userData = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string(),
    });
    const inputValidation = userData.safeParse(req.body);
    if (!inputValidation.success) {
      return res.status(403).json({
        msg: "Invalid user input",
        data: data,
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(403).json({
        message: "User already exists",
      });
    }
    // TODO - hash the password
    const user = await User.create({
      email: email,
      password: password,
      name: name,
    });
    const token = await generateToken(user._id);
    return res.status(200).json({
      msg: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "Please enter email and password",
      });
    }
    // Validating input email
    const emailCheck = z.string().email();
    const { success } = emailCheck.safeParse(email);
    if (!success) {
      return res.status(400).json({
        msg: "Invalid email",
      });
    }
    const user = await User.findOne({ email });
    // TODO - Compare the hashed password
    if (user && user.password === password) {
      const token = await generateToken(user._id);
      return res.status(200).json({
        msg: "User logged in successfully",
        token: token,
      });
    } else {
      return res.status(400).json({
        msg: "Invalid user credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const { password, name } = req.body;
    const updateUserSchema = z.object({
      password: z.string().min(6).optional(),
      name: z.string().optional(),
    });
    const { success } = updateUserSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        msg: "Incorrect input value for password/name",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.userId },
      { password, name },
      { new: true }
    );
    return res.status(200).json({
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong while updating the user info",
      error: error.message,
    });
  }
};

const userList = async (req, res) => {
  try {
    const filterName = req.query.filter;
    let userList = [];
    if(filterName) {
      userList = await User.find({name:{'$regex' : filterName, '$options' : 'i'}});
    } else {
      userList = await User.find();
    }
    return res.status(200).json({
      userList
    })
  } catch(error) {
    return res.status(500).json({
      msg: "Something went wrong while fetching user list",
      error: error.message,
    });
  }
}
const generateToken = async (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = { signUp, signIn, updateUser, userList };
