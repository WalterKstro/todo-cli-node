const { save, read } = require('../store/store');
const generateTable = require('../helpers/table')
const Task = require('./task')
require('colors')

class Tasks {
    constructor() {
        this.list = read() ? read() : {}
    }

    create(title) {
        const task = new Task(title)
        this.list[task.id] = task
        save(this.list)
    }

    print(all = true) {

        const tasks = read() ? Object.values(read()) : false

        if (tasks == false) { return " There isn't any data".white }

        if (typeof all == 'boolean') {
            return generateTable(tasks.reverse())
        } else {
            const listFiltered = tasks.filter(task => task.state == all)
            return generateTable(listFiltered)
        }
    }

    delete(id = '') {
        const isId = this.list.hasOwnProperty(id)
        if( isId ) {
            delete this.list[id]
            save(this.list)
        }
    }

    completedOrUncompleted( listId = [] ) {
        for(let key in this.list){
            const task = this.list[key]
            listId.includes( key ) ? task.state='completed' : task.state = 'uncompleted';
        }
        save(this.list)
    }

}

module.exports = Tasks