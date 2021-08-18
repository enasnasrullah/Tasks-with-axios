const signout = document.getElementById('signout');
const AddNote = document.getElementById('AddNote');
const Disc = document.getElementById('disc');
const tasks = document.getElementById('tasks');
const deleteTodoId = document.getElementById('deleteTodoId');
const taskDisc = document.getElementById('taskDisc');
const edittaskid = document.getElementById('edittaskid');
const completedTask = document.getElementById('completedTask')


let token = localStorage.getItem('token')
signout.addEventListener('click', async function (e) {

    e.preventDefault();
    localStorage.clear()
    window.location.href = "./signin.html"

}

)

let openModal = function (id) {
    axios.get(`https://api-nodejs-todolist.herokuapp.com/task/${id}`,
    {

        headers: {
            Authorization: 'Bearer ' + token
        }


    }).then(function(res){
        taskDisc.value= res.data.data.description;
       
        completedTask.checked= res.data.data.completed;
        edittaskid.value=id;
        $('#EditTODO').modal('show');
       
    })
 

}
let deleteModal = function (id) {
    deleteTodoId.value = id;
    $('#deleteTODO').modal('show');

}

window.addEventListener("load", getAllTasks);


function getAllTasks() {
    axios.get("https://api-nodejs-todolist.herokuapp.com/task", {

        headers: {
            Authorization: 'Bearer ' + token
        }


    }).then(res => {
        tasks.innerHTML = ``;
        console.log(res.data)
        for (let index = 0; index < res.data.data.length; index++) {
            const task = res.data.data[index];
            const taskHTML = drawTask(task);
            tasks.innerHTML += taskHTML;
        }
    }).catch(err => window.location.href = "./signin.html")
}
function drawTask(task) {
    return `  <div class="col-md-3 p-3 text-center" >
<div class="caption m-3 p-3">
  <div class="dropdown text-right">
    <button class="btn btn-transparent dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
      aria-haspopup="true" aria-expanded="false"></button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <button onclick="openModal('${task._id}')" class="dropdown-item" type="button">
        edit
      </button>
      <button onclick="deleteModal('${task._id}')" class="dropdown-item" type="button">
        delete
      </button>
    </div>
  </div>

  <p >
 ${task.description}

  </p>
  <p class='taskcompletedColor'>completed : ${task.completed}</p>
</div>
</div>`
}



let note = { description: '' }
Disc.addEventListener("keyup", function (e) {

    note.description = e.target.value
    console.log(note)

});

AddNote.addEventListener('click', async function sendData(e) {
    e.preventDefault()
    console.log('done')
    await axios.post('https://api-nodejs-todolist.herokuapp.com/task', note, {

        headers: {
            Authorization: 'Bearer ' + token
        }


    }).then(function(){
        getAllTasks();
        $('#AddTODO').modal('hide')

    })
})


function deleteTask() {
    axios.delete(`https://api-nodejs-todolist.herokuapp.com/task/${deleteTodoId.value}`,
        {

            headers: {
                Authorization: 'Bearer ' + token
            }


        }).then(function () {
            getAllTasks();
            $('#deleteTODO').modal('hide');
        }
        )


}

function EditTask()
{
        
       

    let task = {
        "completed": completedTask.checked
    }
    axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${edittaskid.value}`,task,{

        headers: {
            Authorization: 'Bearer ' + token
        }


    }
    )
    .then(function () {
        getAllTasks();
        $('#EditTODO').modal('hide');
    }
    )

}
