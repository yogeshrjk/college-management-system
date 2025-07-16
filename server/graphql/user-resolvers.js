const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Activity = require("../model/activity-model");
const { getFormattedDateTime } = require("../utils/formatDateTime");
const user = require("../model/user-model");
const cloudinary = require("../utils/cloudinary");

const userResolvers = {
  Query: {
    getUser: async (_, { _id }) => {
      const foundUser = await user.findById(_id);
      if (!foundUser) throw new Error("User not found");
      return foundUser;
    },
  },
  Mutation: {
    //signup user
    signup: async (_, args) => {
      const {
        firstName,
        lastName,
        phoneNumber,
        dob,
        email,
        gender,
        password,
        profilePic,
      } = args;

      const existingUser = await user.findOne({ email });
      if (existingUser) throw new Error("User already exists.");

      const hashedPassword = await bcrypt.hash(password, 10);

      let profilePicUrl;
      if (profilePic) {
        const file = await profilePic;
        const stream = file.file.createReadStream();

        const result = await new Promise((resolve, reject) => {
          const cloudStream = cloudinary.uploader.upload_stream(
            {
              folder: "mycampus-profile-pics",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.pipe(cloudStream);
        });

        profilePicUrl = result.secure_url;
      }

      const newUser = await user.create({
        firstName,
        lastName,
        phoneNumber,
        dob,
        email,
        gender,
        password: hashedPassword,
        profilePic: profilePicUrl,
      });

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // LOG THE ACTIVITY
      const { date, time } = getFormattedDateTime();
      await Activity.create({
        message: `New user registered: ${newUser.firstName} ${newUser.lastName} (${newUser.email})`,
        type: "signup",
        action: "created",
        date,
        time,
      });

      return {
        ...newUser._doc,
        token,
      };
    },
    //login
    login: async (_, { email, password }) => {
      const foundUser = await user.findOne({ email }).select("+password");

      if (!foundUser || !foundUser.password) {
        throw new Error("Invalid email or password");
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign(
        { userId: foundUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return {
        ...foundUser._doc,
        token,
      };
    },

    //Change password

    changePassword: async (_, { _id, oldPassword, newPassword }) => {
      const foundUser = await user.findById(_id).select("+password");
      if (!foundUser) throw new Error("User not found");

      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        foundUser.password
      );
      if (!isPasswordValid) throw new Error("Old password is incorrect");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      foundUser.password = hashedPassword;
      await foundUser.save();

      return true;
    },

    //update user
    updateUser: async (_, args) => {
      const { _id, phoneNumber, dob, email, gender, profilePic } = args;

      const foundUser = await user.findById(_id);
      if (!foundUser) throw new Error("User not found");

      if (email) foundUser.email = email;
      if (dob) foundUser.dob = dob;
      if (phoneNumber) foundUser.phoneNumber = phoneNumber;
      if (gender) foundUser.gender = gender;

      if (profilePic) {
        const file = await profilePic;
        const stream = file.file.createReadStream();

        const result = await new Promise((resolve, reject) => {
          const cloudStream = cloudinary.uploader.upload_stream(
            {
              folder: "mycampus-profile-pics",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.pipe(cloudStream);
        });

        foundUser.profilePic = result.secure_url;
      }

      await foundUser.save();
      return foundUser;
    },
  },
};

module.exports = userResolvers;
