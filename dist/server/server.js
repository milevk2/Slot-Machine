"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const slot_preparation_1 = __importDefault(require("../slot-preparation"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.get('/', async (req, res) => {
    //const homePage =  await readFile('./views/index.html', {encoding: 'utf8'});
});
app.get('/slot_settings', async (req, res) => {
    console.log('GET request succeeded!');
    const imagesArray = await (0, promises_1.readdir)('../public/images');
    const imagesNames = imagesArray.map(image => image.slice(0, -4));
    res.json({ ...slot_preparation_1.default.getReelsRows(), imagesNames });
});
app.post('/spin', (req, res) => {
    const visibleReels = slot_preparation_1.default.spin();
    console.log(visibleReels);
    res.json(visibleReels);
});
app.listen(3000, () => console.log('The server is listening on port 3000!'));
