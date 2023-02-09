const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/JuicyMadRepo'

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  autoIndex: true, //make this also true
})
  .then(response => console.log(`Connected to Mongo! Database name: '${response.connections[0].name}'`))
  .catch(err => console.error('Error connecting to mongo', err))

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

module.exports.MONGO_URL = MONGO_URL