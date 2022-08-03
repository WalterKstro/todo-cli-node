const Table = require('cli-table');
require('colors')


const generateTable = (list=[]) => {
    
    const table = new Table({
        head: ['Title'.white,'Created'.white,'Status'.white]
    });
    
    for (const {_,title,date,state} of list) {
        table.push([title, date, state])
    }

    return table.toString();

}

module.exports = generateTable