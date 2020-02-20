import { createContext } from "react";
import { observable, action } from "mobx";
import { TodoListsStore } from "./TodoListsStore";
import FormErrorHandler from "components/input-props/form-error-handler";
import TodoListFolder from "entities/TodoListFolder";

export class TodoFolderStore {
    constructor(rootStore: TodoListsStore) {
        this.rootStore = rootStore

    }
    rootStore: TodoListsStore
    @observable errorHandler = new FormErrorHandler<TodoFolderStore>()
    @observable isAddingFolder = false
    @observable newFolderName = ""

    @action addFolder = () => {
        this.isAddingFolder = true
        this.newFolderName = ""
    }
    @action confirmAddFolder = () => {
        this.errorHandler.reset()
        if (!this.newFolderName) {
            this.errorHandler.error('newFolderName', "Mandatory")
            return
        }
        this.rootStore.addNewFolder(new TodoListFolder(this.newFolderName))
        this.closeAddFolder()
    }
    @action closeAddFolder = () => {
        this.isAddingFolder = false
    }
    @action onFolderEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            this.confirmAddFolder()
        }
    }
    
}
