import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import os from 'os';
import ollamaRouter, { KEEP_ALIVE_INTERVAL, keepOllamaAwake } from './router/ollama.router';

const app = express();

const port = process.env.PORT  
const host = process.env.HOST

if(!port){
  console.error("PORT environment variable is not set");
  process.exit(1);
}
if(!host){
  console.error("HOST environment variable is not set");
  process.exit(1);
}


const origin = process.env.ALLOW_ORIGIN;

if(!origin){
  console.error("ALLOW_ORIGIN environment variable is not set");
  process.exit(1);
}

app.use(cors({
  origin: origin.split(','),  
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


// routers
app.use('/api/ollama', ollamaRouter);

const ollamaCall =()=>{
// Start keep-alive interval
keepOllamaAwake(); // Initial call to keep Ollama awake immediately
setInterval(keepOllamaAwake, KEEP_ALIVE_INTERVAL);
}

app.listen(Number(port), host, () => {
  const addresses = getNetworkAddresses();
  
  console.log(`\nServer is running on http://${host}:${port}`);
  console.log('\nNetwork Addresses:');
  
  if (addresses.ipv4.length > 0) {
    console.log('\nIPv4:');
    addresses.ipv4.forEach(ip => console.log(`  http://${ip}:${port}`));
  }
  
  if (addresses.ipv6.length > 0) {
    console.log('\nIPv6:');
    addresses.ipv6.forEach(ip => console.log(`  http://[${ip}]:${port}`));
  }
  
  console.log('');
  ollamaCall();
});


