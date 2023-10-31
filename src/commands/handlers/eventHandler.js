const path = require('path');
const getAllFiles = require("../../utils/getAllFiles");

module.exports = (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, "..","..", "events"), true);

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);

        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
        console.log(eventName)
    }
};