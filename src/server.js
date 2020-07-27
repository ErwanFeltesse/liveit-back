const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 4000);

//import des routes
const artists = require('./routes/artists');
const videos = require('./routes/videos');
const gigs = require ('./routes/gigs');
const concerts = require ('./routes/concerts');
const connectionArtists = require('./routes/connectionArtists');
const inscriptions = require('./routes/inscriptions');
const artistCards = require('./routes/artistCards');

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use('/artist', artists);
app.use('/video', videos);
app.use('/gig', gigs);
app.use('/concert', concerts);
app.use('/connection-artist', connectionArtists);
app.use('/inscription', inscriptions);
app.use('/artistcard', artistCards);

const server = app.listen(PORT, () => {
    console.log(`🌍 Server is running on port ${PORT}`);
  });
  
  module.exports = server;
  