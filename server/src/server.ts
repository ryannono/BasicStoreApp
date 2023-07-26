import {app} from './app';

// ----------------------- Initialisation ----------------------- //

// initialize server and database client
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
