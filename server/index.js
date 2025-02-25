
const db = require('./db');

const init = async () => {
    console.log("App Initialization")
    db.init();
}
init();