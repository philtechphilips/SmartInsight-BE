import app from "./app";
import chalk from "chalk";
import config from "./config/index";
import { AppDataSource } from "./config/datasource";
import WebSocket from 'ws';
import Autobot from "./entity/Autobot";

// Initialize the data source
AppDataSource.initialize()
  .then(() => {
    console.log(
      `${chalk.blue(
        `SmartInsight Take-Home Assignment (SWE - JULAUG) on ${config.baseUrl}:${config.port}`
      )}`
    );

    // Start the HTTP server
    const server = app.listen(config.port, () => {
      console.log(`Server is running on ${config.baseUrl}:${config.port}`);
    });

    // Initialize WebSocket server
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
      console.log('New client connected');

      const sendAutobotsCount = async () => {
        try {
          const count = await AppDataSource.getRepository(Autobot).count();
          ws.send(JSON.stringify({ count }));
        } catch (error) {
          console.error('Error fetching autobots count:', error);
        }
      };

      // Send the initial count
      sendAutobotsCount();

      // Set up an interval to send the count every 30 seconds
      const intervalId = setInterval(sendAutobotsCount, 300);

      ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(intervalId);
      });
    });
  })
  .catch((error) => console.log('Error during Data Source initialization:', error));
