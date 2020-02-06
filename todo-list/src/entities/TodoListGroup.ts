import { observable } from 'mobx'
import TodoList from './TodoList'

export default class TodoListGroup {
    constructor(name?: string, lists?: TodoList[]) {
        if (name) this.name = name
        if (lists) this.lists = lists
    }
    @observable name = "New List Group"
    @observable lists = [] as TodoList[]
    @observable open = false
}