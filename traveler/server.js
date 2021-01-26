const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('ПОМИЛКА! Завершуємо роботу...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Успішне підключення до БД!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Веб-додаток працює на порті ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('ПОМИЛКА! Завершуємо роботу...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
