require('dotenv').config();

const app = require('./api/app');

const PORT = process.env.PORT || 4400;

app.listen(PORT, () => {
  console.log(`*** Server listening on ${PORT} ***`);
});
