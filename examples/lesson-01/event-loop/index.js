const fs = require('fs');

let asyncWork = () => { 
  fs.readFile('data.txt', (err, data) => {
    console.debug(data.length);
    setImmediate(() => console.debug(`setImmediate`));
    setTimeout(() => console.debug(`setTimeout`), 0);
  });

}

asyncWork()  