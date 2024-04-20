const mongoose = require('mongoose');

/**
 * Schema definition for the 'User' model.
 * This schema defines the structure and data types of documents within the 'users' collection.
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,       // Data type for the username field
    required: true,     // Makes this field mandatory
    unique: true        // Ensures usernames are unique across documents
  },
  email: {
    type: String,       // Data type for the email field
    required: true,     // Makes this field mandatory
    unique: true        // Ensures email addresses are unique across documents
  },
  password: {
    type: String,       // Data type for the password field
    required: true      // Makes this field mandatory
  },
  age: {
    type: Number,       // Data type for the age field
    required: true      // Makes this field mandatory
  },
  picture: {
    type: String,       // Data type for the picture field (URL as a string)
    required: false     // This field is not mandatory
    // Could add 'default: null' if you want to explicitly define the default state
  }
});

/**
 * Model creation based on the schema.
 * 'User' is the name of the model. It corresponds to the 'users' collection in MongoDB,
 * where mongoose automatically looks for the lowercase, plural version of the model name.
 */
module.exports = mongoose.model('User', userSchema);
