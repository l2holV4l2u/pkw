const { GraphQLString, GraphQLID } = require("graphql");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const db = require("./db"); // Assuming db connection is set up (e.g., with pg-promise)

const UserType = require("./types/UserType"); // Define your UserType
const ProfileType = require("./types/ProfileType"); // Define your ProfileType

const resolvers = {
  Mutation: {
    async createUser(_, { username, email, password, full_name }) {
      // Check if username or email already exists
      const existingUser = await db.oneOrNone(
        "SELECT * FROM users WHERE username = $1 OR email = $2",
        [username, email]
      );

      if (existingUser) {
        throw new Error("Username or email already taken");
      }

      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const newUser = await db.one(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at, updated_at",
        [username, email, passwordHash]
      );

      // Insert the profile into the database
      const newProfile = await db.one(
        "INSERT INTO profiles (user_id, full_name) VALUES ($1, $2) RETURNING id, user_id, full_name, created_at, updated_at",
        [newUser.id, full_name || null]
      );

      // Attach profile data to the user response
      newUser.profile = newProfile;

      return newUser;
    },
  },

  Query: {
    async getUser(_, { id }) {
      const user = await db.oneOrNone("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      if (!user) {
        throw new Error("User not found");
      }
      const profile = await db.oneOrNone(
        "SELECT * FROM profiles WHERE user_id = $1",
        [id]
      );
      user.profile = profile;
      return user;
    },
  },
};

module.exports = resolvers;
