const inquirer = require('inquirer')
const { read } = require('../store/store')

require('colors')

const listQuestions = [
    {
        type: 'checkbox',
        name: 'option',
        message: '¿Qué desea hacer?'.yellow,
        choices: [
            {
                value: '1',
                name: '1. Create task'.white
            },
            {
                value: '2',
                name: '2. List tasks'.white
            },
            {
                value: '3',
                name: '3. List completed tasks'.white
            },
            {
                value: '4',
                name: '4. List uncompleted tasks'.white
            },
            {
                value: '5',
                name: '5. Complete tasks'.white
            },
            {
                value: '6',
                name: '6. Delete task'.white
            },
            {
                value: '0',
                name: '0. Exit'.white
            }
        ]
    }
]
const menu = async () => {
    console.log('='.repeat(43))
    console.log(' SELECT ONE OPTION '.padStart(31, '*').padEnd(43, '*'))
    console.log('='.repeat(43).concat('\n'))

    return await inquirer.prompt(listQuestions)
}

const pause = async () => {
    return await inquirer.prompt([{
        type: 'input',
        message: 'Press ENTER to continue',
        name: 'confirm'
    }])
}

const input = async () => {
    return await inquirer.prompt([{
        type: 'input',
        name: 'answer',
        message: 'Title of the task: ',
        validate(value) {
            return (value != '') ? true : 'Plese input your task'
        }
    }])
}


const processData = ( isForCompleted = true ) => {
    const listTasks = Object.values(read())
    return (isForCompleted) 
            ? listTasks.map(({ id, title,state }) => ({ value: id, name: title,checked: (state == 'completed') ? true : false }))
            : listTasks.map(({ id, title }) => ({ value: id, name: title }))
}

const listTaskForDelete = async () => {
    return await inquirer.prompt([{
        type: 'checkbox',
        name: 'id',
        message: 'Really, you want a delete a one task?'.yellow,
        choices: processData( false )
    }])
}

const confirm = async ( message ) => {
    return await inquirer.prompt([{
        type: 'confirm',
        name: 'isOk',
        message: message.yellow,
    }])
}

const listTasksForCompleted = async () => {
    return await inquirer.prompt([{
        type: 'checkbox',
        name: 'listIds',
        message: 'Selecct it',
        choices: processData()
    }])
}


module.exports = {
    menu,
    pause,
    input,
    listTaskForDelete,
    listTasksForCompleted,
    confirm
}
