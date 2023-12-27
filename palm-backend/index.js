if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '.env' });
} else {
  require('dotenv').config({ path: '.env.development' });
}

const http = require('http');

const server = require('./server');

const { PORT } = process.env;

http.createServer({
}, server)
  .listen(8000, () => {
    console.log(`Server is listening on 8000port ${8000}`);
  });