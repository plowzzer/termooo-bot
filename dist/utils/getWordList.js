"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
// Disable HTTPS certification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        if (checkFile('fiveWordList')) {
            try {
                const data = fs.readFileSync('dist/fiveWordList.txt', 'utf-8');
                return data;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        }
        if (checkFile('wordList')) {
            try {
                const data = fs.readFileSync('dist/wordList.txt', 'utf-8');
                return dataTransform(data);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        }
        try {
            const { data } = yield axios_1.default.get('https://www.ime.usp.br/~pf/dicios/br-sem-acentos.txt');
            return dataTransform(data);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
}
exports.default = default_1;
function checkFile(file) {
    return fs.existsSync(`dist/${file}.txt`);
}
function dataTransform(data) {
    const allFiveLettersWords = [];
    const allWords = data.split('\n');
    allWords.forEach(word => {
        word.length === 5 && allFiveLettersWords.push(word);
    });
    writeFile('dist/fiveWordList.txt', allFiveLettersWords.join('\n'));
    return allFiveLettersWords;
}
function writeFile(file, data) {
    fs.writeFile(file, data, (err) => {
        if (err)
            throw err;
        console.log(file, "saved.");
    });
}
exports.writeFile = writeFile;
//# sourceMappingURL=getWordList.js.map