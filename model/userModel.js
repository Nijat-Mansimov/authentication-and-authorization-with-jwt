const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("@hapi/joi");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "Users", timestamps: true }
);

const schema = Joi.object({
  name: Joi.string().min(3).max(50).trim(),
  username: Joi.string().min(3).max(50).trim(),
  email: Joi.string().trim().email(),
  password: Joi.string().min(6).trim(),
});

UserSchema.methods.generateToken = async function () {
  const loggedInUser = this;
  const token = await jwt.sign(
    { _id: loggedInUser._id, active: false },
    "12345",
    { expiresIn: "2h" }
  );
  return token;
};

// Create Joi validation methods for POST
UserSchema.methods.joiValidation = (userObject) => {
  schema.required();
  return schema.validate(userObject);
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user._id;
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;

  return user;
};

UserSchema.statics.login = async (email, password) => {
  const { error, value } = schema.validate({ email });

  if (error) {
    throw createError(400, error);
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(
        400,
        "Please make sure you enter the correct email or password"
      );
    }

    const passwordControl = await bcrypt.compare(password, user.password);
    if (!passwordControl) {
      throw createError(
        400,
        "Please make sure you enter the correct email or password"
      );
    }

    return user;
  }
};

// Create Joi validation methods for PATCH
UserSchema.statics.joiValidationForUpdate = (userObject) => {
  return schema.validate(userObject);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
