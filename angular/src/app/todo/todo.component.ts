import { Component, OnInit } from '@angular/core';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faDotCircle} from '@fortawesome/free-solid-svg-icons/faDotCircle';


import {Todo} from '../todo.model'
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private todoService:TodoService) { }

  inputValue:string;
  updateExistingTask:string='';

  todoList:Todo[]=[];
  todoListFilterArray:Todo[]=[];
  selectTodo:Todo;

  faCoffee = faPencilAlt;
  faCircle=faDotCircle;
  faTrash=faTrashAlt;
  faEdit=faPencilAlt;
  faCheckCircle=faCheckCircle;
  faCircleNotch=faCircleNotch;

  completed:number;
  stillActive:number;
  totalRecords:number;
  checkStatus:boolean=false;
  // contentEditableStatus:string="false"
  ngOnInit(): void {
    this.todoService.getAllTodoList().subscribe(data=>{
      console.log(data.list);
      this.todoList.push(...data.list)

      //Sort the records not started to started
      this.todoList.sort(function(a,b){
        var orderStatus=a.done>b.done;
        return orderStatus ? 1 : -1;
      })

      this.updateArray();

      this.todoListFilterArray=this.todoList;

    })
  }

  enterEvent(event){
      if(event.key==="Enter"){
        this.inputValue=(<HTMLInputElement>event.target).value;
        if(this.inputValue!==""){
                  this.todoService.addTodoItem(this.inputValue,false,false).subscribe( res =>{

                        this.todoList.push({
                          id:res.id,
                          name:res.name,
                          done:res.done,
                          trash:res.trash
                        });
                        (<HTMLInputElement>event.target).value="";

                        this.todoList.sort(function(a,b){
                          var orderStatus=a.done>b.done;
                          return orderStatus ? 1 : -1;
                        })

                        this.updateArray();
                    })
                  }
      }

  }


  toggleTodoStatus(id:string,done:boolean,name:string){
      this.todoService.updateTask(id,name,!done,false).subscribe(data=>{
      //Find index of specific object using findIndex method.
      let objIndex = this.todoList.findIndex((obj => obj.id == id));
      //Update object's name property.
      this.todoList[objIndex].done = !done;
      this.updateArray();
      })
  }

  updateTask(id:string,name:string,done:boolean){
      this.todoService.updateTask(id,name,done,false).subscribe(data=>{
      //Find index of specific object using findIndex method.
      let objIndex = this.todoList.findIndex((obj => obj.id == id));
      //Update object's name property.
      this.todoList[objIndex].name = name;
      this.updateArray();

      this.updateExistingTask="";
      this.selectTodo=null;
      })
  }

  onDelete(id:string){
    this.todoService.delete(id).subscribe(res=>{

      let objIndex = this.todoList.findIndex((obj => obj.id == id));
      if (objIndex > -1) {
        this.todoList.splice(objIndex, 1);
      }

      this.updateArray();

    })
  }

  updateArray(){
    this.completed    = this.todoList.filter((obj)=>obj.done==true).length;
    this.stillActive  = this.todoList.filter((obj)=>obj.done==false).length;
    this.totalRecords = this.todoList.length;
  }

  activeTodo(){
    this.todoListFilterArray=this.todoList.filter((obj)=>obj.done==false);
  }

  completedTodo(){
    this.todoListFilterArray=this.todoList.filter((obj)=>obj.done==true);
  }

  All(){
    this.todoListFilterArray=this.todoList;
  }


  onDoubleClickEditable(todo:Todo){
    this.selectTodo=todo;
    this.updateExistingTask=todo.name;
    console.log(this.selectTodo,'selected');

    // this.contentEditableStatus="true";
    // this.inputValue=(<HTMLInputElement>event.target).value;
    // console.log(this.inputValue);
    // console.log(this.contentEditableStatus);
  }

  onEdit(){
    console.log(this.updateExistingTask);
  }
}
