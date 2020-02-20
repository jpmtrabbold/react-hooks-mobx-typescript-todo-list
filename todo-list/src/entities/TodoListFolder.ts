import { observable } from 'mobx'
import TodoList from './TodoList'

export default class TodoListFolder {
    constructor(name?: string, lists?: TodoList[]) {
        if (name) this.name = name
        if (lists) this.lists = lists
    }
    @observable name = "New List Folder"
    @observable lists = [] as TodoList[]
}