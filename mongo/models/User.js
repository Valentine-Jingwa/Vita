const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  picture: { type: String, required: false}, // URL to the user's picture
});

module.exports = mongoose.model('User', userSchema);
