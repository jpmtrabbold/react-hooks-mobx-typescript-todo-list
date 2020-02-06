import { observable } from 'mobx'
import moment from 'moment'
import { assignFromObjectToObject } from 'util/util'

export default class Todo {
    constructor(description?: string) {
        if (description) this.description = description
    }
    @observable done = false
    @observable description = ""
    
    @observable notes = ""
    @observable dueDate = moment(new Date()).add(1, 'day').toDate()
}