import {app} from './app';
const dotenv = require('dotenv');

// ----------------------- Initialisation ----------------------- //

// enable environment variables
dotenv.config();

// initialize server and database client
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
