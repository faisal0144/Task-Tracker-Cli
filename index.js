const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const tasksFile = "./tasks.json";
let tasks = JSON.parse(fs.readFileSync(tasksFile, "utf-8"));
showTasks();
function showTasks() {
    console.log("Todo")
    tasks.todo.forEach(element => {
        console.log (element.id +"." +element.Task )
    });
    console.log("In Progress");
        tasks.inProgress.forEach(element => {
        console.log(element.id +"." +element.Task )
    });
 showMenu();   
}

function addTask(task){
    let recentId = tasks.recentId;
    let Id = tasks.recentId + 1;
    tasks.recentId = Id;
    tasks.todo.push({"id" : Id, "Task": task });
    fs.writeFile(tasksFile, JSON.stringify(tasks, null,2), ()=>{
        console.log("Succesfully added task");
        showMenu();
    });
}

function updateTodo(Id){
   let taskIndex = tasks.todo.findIndex(element => element.id == Id);
   let [task] = tasks.todo.splice(taskIndex, 1);
    
   tasks.inProgress.push(task);
       fs.writeFile(tasksFile, JSON.stringify(tasks, null,2), ()=>{
        console.log("Succesfully Updated task");
        showMenu();
    });
}

function updateInProgress(Id){
   let taskIndex = tasks.todo.findIndex(element => element.id == Id);
    let [task] = tasks.todo.splice(taskIndex, 1);
     tasks.done.push(task);

       fs.writeFile(tasksFile, JSON.stringify(tasks, null,2), ()=>{

        console.log("Succesfully Updated task");
        showMenu();
    });
}

function deleteTask(category, Id) {
    let list = tasks[category];
    let taskIndex = list.findIndex(element => element.id == Id);

    if (taskIndex !== -1) {
        list.splice(taskIndex, 1); 
        fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), () => {
            console.log("Task deleted successfully");
            showMenu();
        });}
    }


function showMenu() {
    console.log("\nChoose One Of these Actions");
    console.log("1: Add Task");
    console.log("2: Update Task");
    console.log("3: Delete Task");
    console.log("4: Exit");

    rl.question("Enter option: ", (action) => {
        if (action == "1") {
            rl.question("Enter Task Name: ", (task) => {
                addTask(task);
                
            });
        } 

        if (action == "2"){
            console.log("Choose one of the categories")
            console.log ("1: Todo \n2: In Progress");
            rl.question("Enter the Category Id: ", (category)=>{
                if (category == "1"){
                    rl.question("Enter the Task Id: ", (Id)=>{
                        updateTodo(Id);
                    })
                }
                if (category == "2"){
                    rl.question("Enter the Task Id: ", (Id)=>{
                        updateInProgress(Id);
                    })
                }
            })
        }

               if (action == "3"){
            console.log("Choose one of the categories")
            console.log ("1: Todo \n2: In Progress");
            rl.question("Enter the Category Id: ", (category)=>{
                if (category == "1"){
                    rl.question("Enter the Task Id: ", (Id)=>{
                        deleteTask("todo",Id);
                    })
                }
                if (category == "2"){
                    rl.question("Enter the Task Id: ", (Id)=>{
                        deleteTask("inProgress",Id);
                    })
                }
            })
        }

        else if (action == "4") {
            console.log("Exiting...");
            rl.close();
        } 
        else {
            console.log("Option not implemented yet.");
         
        }
    });
}
