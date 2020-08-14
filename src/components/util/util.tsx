export const htmlSpace = '\u00A0'
export const htmlDash = '\u2013'
export const htmlDashSeparator = htmlSpace + htmlDash + htmlSpace

export function cloneObject<T extends object>(obj: T) {
    return JSON.parse(JSON.stringify(obj)) as T
}

export function removeItemFromArray<T>(array: T[], item: T) {
    const index = array.indexOf(item)
    if (index >= 0) {
        array.splice(index, 1)
    }
}

export function removeFromArray<T>(array: T[], predicate: (item: T) => boolean) {
    const index = array.findIndex(predicate)
    if (index >= 0) {
        array.splice(index, 1)
        return true
    }
    return false
}

export function isArray(v: any): v is Array<any> {
    // works for both simple arrays and mobx observables as well
    return !!v && !!v.map && !!v.slice && !!v.splice
}

export function setCaretPosition(ctrl: HTMLInputElement, pos: number) {
    // Modern browsers
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);

        // IE8 and below
    } else if ((ctrl as any).createTextRange) {
        var range = (ctrl as any).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

export function focusWithStartingCaret(input: HTMLInputElement | null) {
    if (input) {
        input.focus()
        setTimeout(() => {
            setCaretPosition(input, 0)
        });
    }
}

export function selectAllText(ctrl: HTMLInputElement | null) {
    if (!ctrl) {
        return
    }

    // Modern browsers
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(0, ctrl.value.length);

        // IE8 and below
    } else if ((ctrl as any).createTextRange) {
        ctrl.focus();
        var range = (ctrl as any).createTextRange();
        range.collapse(true);
        range.moveEnd('character', ctrl.value.length);
        range.moveStart('character', 0);
        range.select();
    }
}