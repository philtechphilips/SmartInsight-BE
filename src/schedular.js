import schedule from 'node-schedule';
import { createAutobots } from './controllers/AutoBot';

let Scheduler = {};

Scheduler.init = () => {
    schedule.scheduleJob('0 * * * *', () => {
        Scheduler.createBotUser();
    });    
}


Scheduler.createBotUser = () => {
    createAutobots();
    console.log(`${new Date().toLocaleDateString()} AI bot user, post comment created.`);
}

export default Scheduler;