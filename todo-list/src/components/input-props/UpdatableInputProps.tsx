import { observer } from "mobx-react-lite"
import React, { useMemo, useCallback } from 'react'
import fieldProps, { IUpdatable, OnValueChangeType, InputPropsVariant, InputPropsConfig, OnValueChangedType } from "./field-props"
import FormErrorHandler from "./form-error-handler"

interface UpdatableInputPropsProps {
    /**
     * the component that you want InputProps to control. InputProps will add the `value`
     * and `onChange` props to the component to automate the state update to 
     * updatable.value and updatable.updated
     */
    children: React.ReactElement
    /**
     * updatable object {value: '', updated: false | true} that holds this state
     */
    updatable: IUpdatable
    /**
     * in case you want to be notified about when a change will take place. Your callback
     * can return a promise that, if fulfilled with a return of false, will preven the 
     * update to happen.
     */
    onValueChange?: OnValueChangeType
    /**
     * in case you want to be notified about when a change has happened
    */
    onValueChanged?: OnValueChangedType
    /**
    * in case you are using a FormErrorHandler to handle the form errors
    */
    errorHandler?: FormErrorHandler<unknown | any>
    /**
     * some built-in variants
     */
    variant?: InputPropsVariant
    /**
     * some built-in configurations
     */
    config?: InputPropsConfig
}

export const UpdatableInputProps = observer(({
    config = {},
    ...props
}: UpdatableInputPropsProps) => {
    const isCheckbox = (config.isCheckbox === undefined ? typeof props.updatable.value === 'boolean' : config.isCheckbox)
    const newFieldProps = fieldProps(props.updatable, props.onValueChange, props.variant, { ...config, isCheckbox }, props.onValueChanged)

    const onChange = useCallback(newFieldProps.onChange, [props.updatable])
    const value = useMemo(() => newFieldProps.value, [newFieldProps.value])
    
    const errorProps = !!props.errorHandler && props.errorHandler.errors && props.errorHandler.getFieldError(props.updatable)
    const newProps = isCheckbox ? { onChange, checked: value, ...errorProps } : { onChange, value, ...errorProps }

    const newElement = React.cloneElement(props.children, newProps)

    return newElement
})