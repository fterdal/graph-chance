const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressGraphql = require('express-graphql');

const { schema, resolverMap } = require('./graphql');
const PORT = process.env.PORT || 8080;
const app = express();

// Morgan logging can get annoying when running tests.
// Only turn on logging when not running tests.
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/graphql', expressGraphql({
  schema,
  rootValue : resolverMap,
  pretty : true,
  graphiql : true,
}));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

if (require.main === module) {
  app.listen(PORT, () => console.log(`Waiting for requests on port ${PORT}`));
}

module.exports = app;
