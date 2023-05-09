const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User } = require("../models");
const Story = require("../models/Story");
const Image = require("../models/Image");
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
    images: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const images = await Image.find({ user: context.user._id }).populate(
        "user"
      );
      return images;
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
    // Save a story to user's profile
    saveStory: async (parent, { storyData }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const user = await User.findById(context.user._id);

      const defaultTitle = `Story ${
        user.storiesAI ? user.storiesAI.length + 1 : 1
      }`;

      const story = new Story({
        stories: storyData.stories,
        title: storyData.title || defaultTitle,
        user: context.user._id,
      });

      const savedStory = await story.save();

      // Validate story title
      if (!savedStory.title) {
        throw new UserInputError("Story title cannot be null.");
      }

      user.storiesAI.push(savedStory);
      await user.save();

      return user;
    },

    // Update Story title
    updateStoryTitle: async (parent, { storyId, title }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const storyAI = await Story.findById(storyId);

      if (!storyAI) {
        throw new UserInputError("No Story found with that ID");
      }
      //Update the title property with the new title input and save new title
      storyAI.title = title;
      const updatedStory = await storyAI.save();

      return updatedStory;
    },

    // Delete a story from user's profile
    deleteStory: async (parent, { storyId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const user = await User.findById(context.user._id);

      // Check if the user has the story
      const storyIndex = user.storiesAI.findIndex(
        (story) => story._id.toString() === storyId
      );
      if (storyIndex === -1) {
        throw new UserInputError(
          "You don't have this story in your profile."
        );
      }

      if (storyIndex != null) {

      // Remove the story from the user's stories array
      user.storiesAI.splice(storyIndex, 1);
      await user.save();
      }

      // Delete the story from the Story model
      await Story.findByIdAndDelete(storyId);

      return user;
    },

    // Save image to user's profile
    saveImage: async (parent, { imageData }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const user = await User.findById(context.user._id);

      // Store the image in the Image model
      const image = new Image({
        image: imageData.image,
        user: context.user._id,
      });

      const savedImage = await image.save();

      user.images.push(savedImage);
      await user.save();

      return user;
    },
  },
};

module.exports = resolvers;
