const path = require('path');
const express = require('express');
var expressStaticGzip = require('express-static-gzip');
const app = express();
const publicPath = path.join(__dirname, '..', 'dist');
const port = process.env.PORT || 8084;
   app.use(
    expressStaticGzip(publicPath, {
      enableBrotli: true,
      orderPreference: ['br', 'gz']
    })
  );

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up! on '+ port);
});
