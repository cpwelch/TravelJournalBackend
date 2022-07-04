const uuid = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Connor Welch",
    email: "cpw@test.com",
    password: "qwerty",
  },
  {
    id: "u2",
    name: "Connor Welch",
    email: "cpw@test.com",
    password: "qwerty",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs entered, please check your data", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user. This user already exists", 422);
  }

  const createdUser = {
    id: uuid.v4(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not find user. Please check the username and password",
      401
    );
  }
  res.json({ message: "You are logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
