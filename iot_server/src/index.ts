require("module-alias/register");
import dotenv from "dotenv";
dotenv.config();

import './LoadEnv'; // Must be the first import
import app from '@server';
import { logger } from '@shared';

// Start the server
const port = Number(3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
