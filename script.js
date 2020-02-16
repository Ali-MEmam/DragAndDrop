var taskForm = document.getElementById("tasker");
var progress = document.getElementById("inProgress");
var alertt = document.getElementById("Hold");
var allSections = document.getElementsByTagName("section")
var tasksId = []
var id = 0;
//self invoke function 
(function(){
    for(var i = 0 ; i < allSections.length; i++){
        allSections[i].addEventListener("dragover", dragovercall)
        allSections[i].addEventListener("drop",dropcall)
    }
    var local=getObjFromStorage("webstorage")
    if(local){
      id=local.length;
      console.log(local)
      local.map(function(elem){
          objectcreator(elem)
      })
    }
})()
//add listener on add button
taskForm.addEventListener("submit",function(e){
    e.preventDefault();
    //prosses of create new elem function take obj 
    var objId = new Object;
    objId.id= ++id;
    objId.name = taskForm.taskName.value;
    objId.parent = 'inProgress';
    objectcreator(objId)
    //Set the Object in The Web
setObjOnStorage("webstorage",JSON.stringify(tasksId))
})
//Get Object Divinsion
function getObjFromStorage(key){
    return JSON.parse(localStorage.getItem(key))
}
//Set Object Divinsion
function setObjOnStorage(key,value) {
    localStorage.setItem(key,value)   
}
//Drag Function Divison
function dragstartcall(event) {
    event.dataTransfer.setData('text',event.target.id)
}
// DragOver function Divinion
function dragovercall(event) {
    event.preventDefault();
    console.log(event)
}
//Drop Function 
function dropcall(event){
    if(event.target.tagName == "SECTION"){
        // To Catch the Object
    var x=tasksId.filter((el,i)=>{
        return el.id==event.dataTransfer.getData('text')
    })
    x[0].parent=event.target.id
    // To Update The Object
    setObjOnStorage("webstorage",JSON.stringify(tasksId))
    event.preventDefault();
    event.target.appendChild(document.getElementById(event.dataTransfer.getData('text')))
}
}
// Object Creating
function objectcreator(obj) {
    var task = document.createElement("p");
    task.innerHTML = obj.name;
    task.style.marginTop = "30px"
    task.setAttribute("draggable","true");
    task.setAttribute("id",obj.id);
    tasksId.push(obj)
    document.getElementById(obj.parent).appendChild(task);
    document.getElementById(obj.id).addEventListener("dragstart",dragstartcall)


}

