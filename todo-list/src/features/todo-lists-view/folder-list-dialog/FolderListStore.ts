import { observable, action } from "mobx";
import { RootStore } from "../../RootStore";
import FormErrorHandler from "components/input-props/form-error-handler";
import TodoListFolder from "entities/TodoListFolder";
import TodoList from "entities/TodoList";
import { createRef } from "react";
import { selectAllText } from "components/util/util";

export class FolderListStore {
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore

    }
    rootStore: RootStore
    @observable errorHandler = new FormErrorHandler<FolderListStore>()
    @observable showNameEditor = false
    @observable folderOrListName = ""
    @observable entityType?: 'list' | 'folder'
    @observable actionType?: 'add' | 'edit'

    inputRef = createRef<HTMLInputElement | null>()
    folder?: TodoListFolder
    list?: TodoList

    focus = () => {
        setTimeout(() => {
            selectAllText(this.inputRef.current)
        }, 100)
    }

    @action addListToFolder(listFolder: TodoListFolder) {
        this.showNameEditor = true
        this.folderOrListName = ""
        this.entityType = 'list'
        this.actionType = 'add'
        this.folder = listFolder
        this.focus()    
    }

    @action addList = () => {
        this.showNameEditor = true
        this.folderOrListName = ""
        this.entityType = 'list'
        this.actionType = 'add'
        this.folder = undefined
        this.focus()
    }

    @action addFolder = () => {
        this.showNameEditor = true
        this.folderOrListName = ""
        this.entityType = 'folder'
        this.actionType = 'add'
        this.focus()
    }

    @action renameFolder = (listFolder: TodoListFolder) => {
        this.folder = listFolder
        this.showNameEditor = true
        this.folderOrListName = listFolder.name
        this.entityType = 'folder'
        this.actionType = 'edit'
        this.focus()
    }

    @action renameList = (list: TodoList) => {
        this.list = list
        this.showNameEditor = true
        this.folderOrListName = list.name
        this.entityType = 'list'
        this.actionType = 'edit'
        this.focus()
    }

    @action confirmAction = () => {
        this.errorHandler.reset()
        if (!this.folderOrListName) {
            this.errorHandler.error('folderOrListName', "Mandatory")
            return
        }
        if (this.entityType === 'list') {
            if (this.actionType === 'add') {
                this.rootStore.addNewList(new TodoList(this.folderOrListName), this.folder)
                
                if (!this.folder?.collapsibleStore?.collapsed) {
                    this.folder?.collapsibleStore?.toggleOpen()
                }
            } else {
                this.list!.name = this.folderOrListName
            }
            this.closeAddFolderList()
        } else {
            if (this.actionType === 'add') {
                this.rootStore.addNewFolder(new TodoListFolder(this.folderOrListName))
            } else {
                this.folder!.name = this.folderOrListName
            }
            this.closeAddFolderList()
        }

    }
    @action closeAddFolderList = () => {
        this.showNameEditor = false
    }
    @action onFolderEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            this.confirmAction()
        }
    }
}