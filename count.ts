import * as db from "./db.rx";

db.count()
    .subscribe((c: number) => {
        console.log(c);
    }, (err: Error) => {
        throw err;
    });
    