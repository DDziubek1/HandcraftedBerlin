import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import usersSchema from "../schema/usersSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

export const createUser = asyncHandler(async (req, res) => {
    const { error } = usersSchema.validate(req.body);  // Validate the request body
    if (error) {
        throw new ErrorResponse(error.details[0].message, 400);  // Handle validation errors
    }

    const { username, } = req.body;
    const found = await User.findOne({ username });
    if (found) throw new ErrorResponse("User already exists in DB", 400);

    const user = await User.create(req.body);
    res.status(201).json(user);
}
);

export const getProfile = asyncHandler(async (req, res, next) => {
    const {
      user: { _id, email },
    } = req;
  
    const user = await User.findById(_id);
    res.json(user);
  });

export const updateUser = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        throw new ErrorResponse("No token provided", 401);
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode the token
    } catch (error) {
        throw new ErrorResponse("Invalid token", 401);
    }

    const userId = decoded._id; // Extract user ID from the decoded token

    const user = await User.findByIdAndUpdate(
        userId, // Find user by ID
        req.body, // Data to update
        { new: true } // Return the updated user
    );

    if (!user) {
        throw new ErrorResponse("User not found", 404);
    }

    res.status(200).json(user);
}
);

export const getUserInfoById = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        throw new ErrorResponse("No token provided", 401);
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode the token
    } catch (error) {
        throw new ErrorResponse("Invalid token", 401);
    }

    const userId = decoded._id; // Extract user ID from the decoded token

    const user = await User.findById(userId); // Find user by ID

    if (!user) { 
        throw new ErrorResponse("User not found", 404);
    }

    res.status(200).json(user);
}
);




export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new ErrorResponse("User not found", 404);
    res.status(200).json({ message: "User deleted" });
}
);


export const signup = asyncHandler(async (req, res) => {
    const { error } = usersSchema.validate(req.body);  // Validate the request body
    if (error) {
        throw new ErrorResponse(error.details[0].message, 400);  // Handle validation errors
    }

    const { username, email, password } = req.body;
    const found = await User.findOne({ username });
    if (found) throw new ErrorResponse("User already exists in DB", 400);

    const hash = await bcrypt.hash(password, 5);

    const user = await User.create({ username, email, password: hash });

    const payload = { _id: user._id, username: user.username, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
           expiresIn: "500m", });

    res.json({
        token,
        user: { _id: user._id, username: user.username, email: user.email },
    });
}
);


export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

   
  if (!user) throw new ErrorResponse("Incorrect Email", 401);

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new ErrorResponse("Incorrect Password", 401);

    const payload = { _id: user._id, email: user.email, username: user.username };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "500m",
    });

    res.json({
        token,
        user: { _id: user._id, email: user.email, username: user.username },
    });

}
);
