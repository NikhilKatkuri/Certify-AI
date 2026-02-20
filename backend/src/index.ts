/***
 * imports
 */
import 'dotenv/config';
import connectToDatabase from '@/config/db.connection';
import app from '@/app';

const { PORT, HOST, NODE_ENV } = process.env;

const port = PORT ? parseInt(PORT, 10) : 3000;
const host = HOST || 'localhost';

const isProduction = NODE_ENV === 'production';

const server = async () => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Start server
    if (isProduction) {
      app.listen(port, () => {
        console.log(`Server running in 'production' mode`);
      });
    } else {
      app.listen(port, host, () => {
        console.log(
          `Server running at http://${host}:${port}/ in 'development' mode`
        );
      });
    }
  } catch (error) {
    throw new Error(`Server failed to start: ${error}`);
  }
};

server();
