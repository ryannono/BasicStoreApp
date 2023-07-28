import {app} from './app';
require('dotenv').config();

// ----------------------- Initialisation ----------------------- //

// initialize server and database client
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
