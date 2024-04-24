import express, { Express, Request, Response, json, urlencoded } from "express";
import {slotMachine, subscriptions} from "../slot-preparation";
import { readdir } from 'fs/promises';
import path from 'path';
import SpinResultInterface from "../interfaces/SpinResultInterface";
import { v4 as uuid } from 'uuid';
import Slot from "../classes/slot";
import configuration from "../configuration";
import ScoreInterface from "../interfaces/ScoreInterface";

const app: Express = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(json());
app.use(urlencoded());


const activeMachines: any = {};

app.get('/createMachine', async (req: Request, res: Response) => {

   const machineId: string = uuid();
   const slotMachine = new Slot(configuration.reelsCount, configuration.rowsCount, configuration.symbols, configuration.lines, configuration.reels, subscriptions);
   activeMachines[machineId] = slotMachine;
      
   res.json(machineId)

})

app.get('/slot_settings', async (req: Request, res: Response) => {

   console.log('GET request succeeded!');
   const imagesArray = await readdir('../public/images/symbols');
   const imagesNames = imagesArray.map(image => image.slice(0, -4));
   const paylines = configuration.lines.length;

   res.json({ ...slotMachine.getReelsRows(), imagesNames, paylines })

})

app.post('/spin', (req: Request, res: Response) => {

   const id: string = req.body.id;
   const machine = activeMachines[id];
   const spinResult: SpinResultInterface = machine.spin();
   res.json(spinResult);

})

app.get('/score', (req: Request, res: Response) => {

   const score: ScoreInterface = slotMachine.displayScore();
   res.json(score);

})

app.post('/subscribe', (req: Request, res:Response)=> {

   const {index, machineId} = req.body;

   activeMachines[machineId].subscribeToPayline(index);
   
   res.status(200).json(`Successfully subscribed to payline ${index}`);
})

app.listen(3000, () => console.log('The server is listening on port 3000!'));