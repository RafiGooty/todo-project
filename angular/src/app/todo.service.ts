import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Todo} from './todo.model'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

constructor( private http:HttpClient) { }


addTodoItem( name:string,done:boolean,trash:boolean){
  let todo:Todo={    id:null,    name:name,    done:done,    trash:trash  }
  return this.http.post<{message:string,id:string,name:string,done:boolean,trash:boolean}>('http://localhost:3000/api/todo',todo)
}

getAllTodoList(){
 return  this.http.get<{message:string,todoList:any,totalPages:number}>('http://localhost:3000/api/todo')
        .pipe(map(todoData=>{
          return {list:todoData.todoList.map(listMap=>{
                        return { id:listMap._id,name:listMap.name,done:listMap.done,trash:listMap.trash}
                      }),
                  totalPages:todoData.totalPages
        }
        }))
}

updateTask(id:string,name:string,done:boolean,trash:boolean){

  let todo:Todo={id:id,name:name,done:done,trash:trash};
  return  this.http.put<{message:string,todoId:string,done:boolean}>('http://localhost:3000/api/todo/'+ id,todo);
}

delete(id:string){
  return  this.http.delete<{message:string,todoId:string}>('http://localhost:3000/api/todo/'+ id);
}

}
