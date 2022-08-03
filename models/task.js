const format = require("../helpers/formatDate")
const uid = require("../helpers/uid")

class Task {
    constructor(title) {
        this.id = uid()
        this.title = title
        this.date = format()
        this.state = 'uncompleted'
    }
    get getUi() {
        return this.id
    }

    get getTitle() {
        return this.title
    }

    get getDate() {
        return this.date
    }
    
    get getState() {
        return this.state
    }
}

module.exports = Task