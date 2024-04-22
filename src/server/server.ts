import express, { Express, Request, Response } from "express";
import slotMachine from "../slot-preparation";
import {readFile, readdir} from 'fs/promises';
import path from 'path';

const app: Express = express();
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', async (req: Request, res: Response)=> {

   //const homePage =  await readFile('./views/index.html', {encoding: 'utf8'});
    
  

})

app.get('/slot_settings', async (req: Request, res: Response) => {

   console.log('GET request succeeded!');
   const imagesArray = await readdir('../public/images');
   const imagesNames = imagesArray.map(image => image.slice(0, -4)); 
   res.json({...slotMachine.getReelsRows(), imagesNames})

})

app.post('/spin', (req:Request, res: Response) => {

   const visibleReels =  slotMachine.spin();

   console.log(visibleReels);
   
   res.json(visibleReels)


})

app.listen(3000, ()=> console.log('The server is listening on port 3000!'));