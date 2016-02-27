import readline = require("readline");
import * as db from "./db/db.callback";
import {IArticle} from './models/article';

let rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt("title? ");
rl.prompt();

rl.on("line", (line: string) => {
    let q: string = line.toLowerCase().trim();
    switch (q) {
        case "":
            rl.prompt();
            break;

        case "exit":
            rl.close();
            break;

        default:
            find(line, (result: IArticle[]) => {
                write(result);
                rl.prompt();
            });
            break;
    }
});

rl.on("close", () => {
    process.exit();
});

function find(query: string, callback: (result: IArticle[]) => void) {
    db.find(query, (err, result: IArticle[]) => {
        if (err){
            throw err;
        }
        callback(result);
    });
}

function write(result: IArticle[]) {
    result.forEach((r: IArticle, i: number) => {
        console.log(`${i + 1}) ${r.pub_date.toLocaleDateString()} - ${r.title}`)
    });
}