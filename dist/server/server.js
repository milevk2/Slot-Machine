"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const slot_preparation_1 = require("../slot-preparation");
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const slot_1 = __importDefault(require("../classes/slot"));
const configuration_1 = __importDefault(require("../configuration"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)());
const activeMachines = {};
app.get('/createMachine', async (req, res) => {
    const machineId = (0, uuid_1.v4)();
    const slotMachine = new slot_1.default(configuration_1.default.reelsCount, configuration_1.default.rowsCount, configuration_1.default.symbols, configuration_1.default.lines, configuration_1.default.reels, slot_preparation_1.subscriptions);
    activeMachines[machineId] = slotMachine;
    res.json(machineId);
});
app.get('/slot_settings', async (req, res) => {
    console.log('GET request succeeded!');
    const imagesArray = await (0, promises_1.readdir)('../public/images/symbols');
    const imagesNames = imagesArray.map(image => image.slice(0, -4));
    const paylines = configuration_1.default.lines.length;
    res.json({ ...slot_preparation_1.slotMachine.getReelsRows(), imagesNames, paylines });
});
app.post('/spin', (req, res) => {
    const id = req.body.id;
    const machine = activeMachines[id];
    const spinResult = machine.spin();
    res.json(spinResult);
});
app.get('/score', (req, res) => {
    const score = slot_preparation_1.slotMachine.displayScore();
    res.json(score);
});
app.post('/subscribe', (req, res) => {
    const { index, machineId } = req.body;
    activeMachines[machineId].subscribeToPayline(index);
    res.status(200).json(`Successfully subscribed to payline ${index}`);
});
app.post('/unsubscribe', (req, res) => {
    const { index, machineId } = req.body;
    activeMachines[machineId].unsubscribePayline(index);
    res.status(200).json(`Successfully unsubscribed from payline ${index}`);
});
app.listen(3000, () => console.log('The server is listening on port 3000!'));
