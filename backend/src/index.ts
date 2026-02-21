/***
 * imports
 */
import 'dotenv/config';
import connectToDatabase from '@/config/db.connection';
import app from '@/app';
import os from 'os';

const { PORT, HOST, NODE_ENV } = process.env;

const port = PORT ? parseInt(PORT, 10) : 3000;
const host = HOST || 'localhost';

const isProduction = NODE_ENV === 'production';

function getNetworkAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses: { ipv4: string[]; ipv6: string[] } = { ipv4: [], ipv6: [] };

  for (const name of Object.keys(interfaces)) {
    const nets = interfaces[name];
    if (!nets) continue;

    for (const net of nets) {
      // Skip internal (loopback) addresses
      if (!net.internal) {
        if (net.family === 'IPv4') {
          addresses.ipv4.push(net.address);
        } else if (net.family === 'IPv6') {
          addresses.ipv6.push(net.address);
        }
      }
    }
  }

  return addresses;
}

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
      const addresses = getNetworkAddresses();

      app.listen(port, host, () => {
        console.log(
          `\n\nServer running at http://${host}:${port}/ in 'development' mode`
        );
        if (addresses.ipv4.length > 0) {
          console.log('\nIPv4:');
          addresses.ipv4.forEach(ip => console.log(`  http://${ip}:${port}`));
        }

        if (addresses.ipv6.length > 0) {
          console.log('\nIPv6:');
          addresses.ipv6.forEach(ip => console.log(`  http://[${ip}]:${port}`));
        }

        console.log('');
      });
    }
  } catch (error) {
    throw new Error(`Server failed to start: ${error}`);
  }
};

server();
