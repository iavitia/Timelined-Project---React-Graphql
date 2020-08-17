const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { SECRET_KEY } = require('../../config');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../utils/validators');
const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      profilePic: user.profilePic,
      about: user.about,
      contact: {
        email: user.contact,
        facebook: user.contact,
        instagram: user.contact,
        twitter: user.contact,
      },
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find().sort({ createdAt: -1 });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUser(_, { username }) {
      try {
        const user = await User.findOne({ username: username });
        if (user) {
          return user;
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.username = 'User not found';
        throw new UserInputError(
          'There isn’t an account associated with this username',
          { errors }
        );
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.password = 'Wrong credentials';
        throw new UserInputError('The password you entered is incorrect', {
          errors,
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // make sure user and email doesn't already exist
      const user = await User.findOne({ username });
      const emailVal = await User.findOne({ email });

      if (user && emailVal) {
        throw new UserInputError('Username and Email Address in use', {
          errors: {
            username: 'Username already exists',
            email: 'Email already exists',
          },
        });
      }
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'Username already exists',
          },
        });
      }
      if (emailVal) {
        throw new UserInputError('Email Address in use', {
          errors: {
            email: 'Email already exists',
          },
        });
      }

      // hash password
      password = await bcrypt.hash(password, 12);

      // create new user
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      // create auth token
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
