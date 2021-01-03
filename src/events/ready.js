module.exports = async client => {
	const chalk = require("chalk");
	const mongoose = require("mongoose");

  console.log(chalk.bgHex("#dbab79").hex("#000000").bold(`Logged on as ${client.user.tag}! (${client.user.id})`));

  await mongoose.connect(`mongodb+srv://${process.env.dbuser}:${process.env.dbpass}@cluster0.l7ckt.mongodb.net/sayuki?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }, (err) => {
    if (err) {
      console.error(`[ERROR] Unable to connect to the Mongo database.`);
      return process.exit(1);
    }
    console.info(`[INFO] Connected to the Mongo database.`)
  });
}