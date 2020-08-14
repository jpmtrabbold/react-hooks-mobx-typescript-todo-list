import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react"
import { LoadingModal } from ".";

export const executeLoading = async <T extends unknown>(message: React.ReactElement | string, action: () => Promise<T> | T) => {
   return new Promise<T>((resolve, reject) => {
      var div = document.createElement('div');
      ReactDOM.render(
         <LoadingModalExecute container={div} title={message} resolve={resolve} action={action}/>,
         document.body.appendChild(div)
      );
   })
}

interface LoadingModalExecuteProps<T> {
   container?: HTMLElement
   title?: React.ReactElement | string
   resolve: (value?: T | PromiseLike<T> | undefined) => void
   action: () => Promise<T> | T
}

const LoadingModalExecute = <T extends unknown>(props: LoadingModalExecuteProps<T>) => {
   const [visible, setVisible] = useState(true)
   const { resolve, action } = props

   useEffect(() => {
      async function run() {
         try {
            const x = async () => await action()
            resolve(await x()) 
         } catch (error) {
            setVisible(false)
            throw error
         }
         setVisible(false)
      }
      setTimeout(run)
      //run()
   }, [resolve, action])

   return (
      <LoadingModal {...props} visible={visible} />
   )
}