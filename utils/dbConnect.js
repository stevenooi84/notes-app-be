const mongoose = require('mongoose');

const DBCluster = process.env.DATABASE;
const DBLocal = process.env.DATABASE_LOCAL;

let DB_URL = DBCluster;

DB_URL = DB_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
DB_URL = DB_URL.replace('<DB_NAME>', process.env.DB_NAME);

if (process.argv[2] && process.argv[2] === 'dblocal')
  DB_URL = DBLocal;

console.log(`DB_URL`, DB_URL);

module.exports = () => {
  console.log('connecting to DB...');

  const mongoUri = `mongodb://${process.env.db_service_name}:${process.env.MONGO_PORT}/${process.env.db_name}`;

  return mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(() => console.log(`DB connection successful!`.blue.bold))
  .catch((err) => {
    console.log('DB Connection Failed !');
    console.log(`err`, err);
  });
};
