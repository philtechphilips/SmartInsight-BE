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
    console.log(`${new Date().toLocaleDateString()} reminders sent.`);
}

export default Scheduler;