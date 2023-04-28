const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static assests 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/'));
});

// Get Image
app.get('/proxy-image', async (req, res) => {
  const imageUrl = req.query.url;

  try {
    const fetch = await import('node-fetch');
    const response = await fetch.default(imageUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });

    const buffer = await response.buffer();
    const base64 = buffer.toString('base64');
    res.send(base64);
  } catch (error) {
    console.error('Error proxying the image:', error);
    res.status(500).send('Error proxying the image');
  }
});

// Apollo server with GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};
  
// Async function to start the server
startApolloServer(typeDefs, resolvers);