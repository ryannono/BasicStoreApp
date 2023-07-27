"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv = require('dotenv');
// ----------------------- Initialisation ----------------------- //
// enable environment variables
dotenv.config();
// initialize server and database client
const PORT = process.env.PORT || 3001;
app_1.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map