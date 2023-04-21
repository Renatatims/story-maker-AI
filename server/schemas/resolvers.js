const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User } = require("../models");
const Story = require("../models/Story");
const { signToken } = require("../utils/auth");

const resolvers = {
  //Queries
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
      }
      throw new AuthenticationError("Not logged in");
    },
    storiesAI: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const stories = await Story.find({ user: context.user._id }).populate(
        "user"
      );
      return stories;
    },
  },
  //Mutations
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);
      console.log(correctPw);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

  },
};

module.exports = resolvers;
