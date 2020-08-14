import { observable } from 'mobx'
import Todo from './Todo'

export default class TodoList {
    constructor(name?: string, todos?: Todo[]) {
        if (name) this.name = name
        if (todos) this.todos = todos
    }
    @observable name = "New List"
    @observable todos = [] as Todo[]
}