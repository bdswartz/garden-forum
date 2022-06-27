const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Plant } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // authentication
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('posts')
          .populate('plants')
          .populate('friends');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('plants')
        .populate('posts');
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('plants')
        .populate('posts');
    },
    // get all posts
    posts: async () => {
      return Post.find().sort({ createdAt: -1 });
    },
    //   get post by post id
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
    plant: async (parent, { _id }) => {
      return Plant.findOne({ _id });
    },
    getUsers: async (parent, args) => {
      const { search } = args;

      let searchQuery = {};

      if (search) {
        searchQuery = {
          $or: [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { userName: { $regex: search, $options: 'i' } },
          ],
        };
      }

      const users = await User.find(searchQuery);

      return {
        users,
      };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { postId, commentBody }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              comments: { commentBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedPost;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addPlant: async (parent, args, context) => {
      if (context.user) {
        const plant = await Plant.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { plants: plant._id } },
          { new: true }
        );

        return plant;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    updatePlant: async (parent, args, context) => {
      if (context.user) {
        const {
          plantId,
          usda_zone,
          pruning,
          fertilization,
          water,
          common_name,
          description,
        } = args;
        console.log(common_name);
        const plant = await Plant.findByIdAndUpdate(
          plantId,
          {
            common_name: common_name,
            description: description,
            usda_zone: usda_zone,
            pruning: pruning,
            fertilization: fertilization,
            water: water,
          },
          { new: true }
        );
        console.log(plant);
        return plant;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removePlant: async (parent, { plantId }, context) => {
      if (context.user) {
        const plant = await Plant.findByIdAndDelete(
          plantId,
          function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              console.log('Deleted : ', docs);
            }
          }
        );
        return plant;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { postId, commentBody }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              comments: { commentBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedPost;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addPlantHistory: async (parent, { plantId, note_body }, context) => {
      if (context.user) {
        const updatedPlant = await Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $push: {
              plantHistory: { note_body },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedPlant;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removePlantHistory: async (parent, { plantId, historyId }, context) => {
      const updatedPlant = await Plant.findOneAndUpdate(
        { _id: plantId },
        {
          $pull: {
            plantHistory: { _id: historyId },
          },
        },
        { new: true, runValidators: true }
      );
      return updatedPlant;
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
