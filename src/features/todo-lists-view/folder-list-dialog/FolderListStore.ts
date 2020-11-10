import { RootStore } from "../../RootStore";
import TodoListFolder from "entities/TodoListFolder";
import TodoList from "entities/TodoList";
import { createRef } from "react";
import { selectAllText } from "components/util/util";
import { makeAutoObservable } from "mobx";
import { FormErrorHandler } from "mobx-store-utils";

export class FolderListStore {
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }
    rootStore: RootStore
    errorHandler = new FormErrorHandler<FolderListStore>()
    showNameEditor = false
    folderOrListName = ""
    entityType?: 'list' | 'folder'
    actionType?: 'add' | 'edit'

    inputRef = createRef<HTMLInputElement | null>()
    folder?: TodoListFolder
    list?: TodoList

    focus = () => {
        setTimeout(() => {
            selectAllText(this.inputRef.current)
        }, 100)
    }

    addListToFolder(listFolder: TodoListFolder) {
        this.showNameEditor = true
        this.folderOrListName = ""
        this.entityType = 'list'
        this.actionType = 'add'
        this.folder = listFolder
        this.focus()
    }

    addList = () => {
        this.showNameEditor = true
        this.folderOrListName = ""
        this.entityType = 'list'
        this.actionType = 'add'
        this.folder = undefined
        this.focus()
    }

    addFolder = () => {
        this.showNameEditor = true
        this.folderOrListName = ""
        this.entityType = 'folder'
        this.actionType = 'add'
        this.focus()
    }

    renameFolder = (listFolder: TodoListFolder) => {
        this.folder = listFolder
        this.showNameEditor = true
        this.folderOrListName = listFolder.name
        this.entityType = 'folder'
        this.actionType = 'edit'
        this.focus()
    }

    renameList = (list: TodoList) => {
        this.list = list
        this.showNameEditor = true
        this.folderOrListName = list.name
        this.entityType = 'list'
        this.actionType = 'edit'
        this.focus()
    }

    confirmAction = () => {
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
    closeAddFolderList = () => {
        this.showNameEditor = false
    }
    onFolderEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            this.confirmAction()
        }
    }
}