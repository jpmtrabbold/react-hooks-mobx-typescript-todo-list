import { observable } from 'mobx'
import moment from 'moment'
import { createRef } from 'react'

export default class Todo {
    constructor(description?: string) {
        if (description) this.description = description
    }

    inputRef = createRef<HTMLInputElement>()
    
    @observable done = false
    @observable description = ""
    
    @observable notes = ""
    @observable dueDate = moment(new Date()).add(1, 'day').toDate()

    clone = () => {
        const newTodo = new Todo(this.description);
        newTodo.done = this.done 
        newTodo.notes = this.notes 
        newTodo.dueDate = this.dueDate
        return newTodo
    }

    copyFrom = (todo: Todo) => {
        this.description = todo.description
        this.done = todo.done 
        this.notes = todo.notes 
        this.dueDate = todo.dueDate
    }
}