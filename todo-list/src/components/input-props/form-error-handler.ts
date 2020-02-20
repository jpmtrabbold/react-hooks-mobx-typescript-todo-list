import { observable } from "mobx"

type FieldType<T> = keyof T | any

export default class FormErrorHandler<T extends any> {

    @observable errors = [] as {field: FieldType<T>, error: string}[]
    
    /** whether there's any error in any field */
    hasError = false

    /** use this method to add an error to field.
     * When using InputProps, field must be the the string property name of the field in the model that you are setting the error
     * When using UpdatableInputProps, field must be the updatable itself
     */
    error(field: FieldType<T>, error: string) {
        this.errors.push({field, error})
        this.hasError = true
    }

    /** checks whether a field has any error */
    fieldHasError(field: FieldType<T>) {
        return !!this.errors.find(item => item.field === field)
    }

    /** gets the error for any specific field */
    getFieldError(field: FieldType<T>) {
        const error = this.errors.find(item => item.field === field)
        if (error) {
            return {error: true, helperText: error.error}
        } else {
            return {error: false, helperText: ""}
        }
    }

    /** reset all errors */
    reset() {
        this.errors = []
        this.hasError = false
    }
}