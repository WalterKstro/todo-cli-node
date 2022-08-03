const inquirer = require('inquirer');
const Tasks = require('./models/tasks.js');
const { menu, pause, input, listTaskForDelete, confirm,listTasksForCompleted } = require('./helpers/inquirer.js')

const main = async () => {
    const list = new Tasks()
    
    do {
        
        console.clear()
        var { option } = await menu()
        const [opt] = option

        switch (opt) {
            case '1': {
                const { answer } = await input()
                list.create(answer)
                break;
            }
            case '2': {
                console.log( list.print() )
                break;
            }
            case '3':
                console.log( list.print('completed') )
                break;
            case '4':
                console.log( list.print('uncompleted') )
                break;
            case '5':
                const {listIds} = await listTasksForCompleted()
                list.completedOrUncompleted(listIds)
                break;
            case '6':
                const {id} = await listTaskForDelete()
                const {isOk} = await confirm("This process, cann't reversed")
                isOk && list.delete(id)
                break;
            default: console.log('Exit')
        }

        await pause()

    } while (option != '0');
}

main()