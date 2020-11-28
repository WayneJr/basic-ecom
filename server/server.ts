import express = require('express');
const indexRoutes = require('./api/routes/indexRoutes');
const app:express.Application = express();
const port = process.env.PORT || 3000;


app.use(indexRoutes);

app.listen(port, () => console.log('listening on port: ' + port));

