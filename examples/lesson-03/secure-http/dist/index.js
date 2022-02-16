"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const options = {
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, '../selfsigned.key')),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, '../selfsigned.crt'))
};
app.get('', (req, res) => {
    res.json({
        "message": "Hello, HTTPS! 👋"
    });
});
https_1.default.createServer(options, app).listen(port, () => {
    console.log(`Running 'secure-http' on ${port}`);
});
