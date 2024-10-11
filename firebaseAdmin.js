const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your-service-account-file.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gaming-club-5ee5b-default-rtdb.firebaseio.com/' // Use seu URL aqui
});

module.exports = admin;
