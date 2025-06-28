const user = require("../model/user-model");

const userResolvers = {
  Query: {
    getUser: async (_, { id }) => {
      const foundUser = await user.findById(id);
      if (!foundUser) throw new Error("User not found");
      return foundUser;
    },
  },
};

module.exports = userResolvers;
