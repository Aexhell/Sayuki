const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userID: String,
	lang: String,
	dev: Boolean
});

module.exports = mongoose.model("User", userSchema);