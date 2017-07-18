export function arrayDiff(array1, array2) {
    return array1.filter(item => {
        return array2.filter(item2 => {
            return item.Id === item2.Id;
        }).length === 0;
    });
}

export function processCheckbox(list, selectedItems) {
    function deselected() {
        list.forEach(item => {
            item.selected = false;
        });
    }

    if (selectedItems === 'all') {
        list.forEach(item => {
            item.selected = true;
        });
    } else if (selectedItems === 'none') {
        deselected();
    } else {
        deselected();
        selectedItems.forEach(item => {
            list[item].selected = true;
        });
    }
}

export function validateFieldGeneric(formState, name) {
    const textRequired = 'Поле обязательно для заполнения';

    if (!this.props[name]) {
        formState[`${name}ErrorText`] = textRequired;
        formState.isValid = false;
    } else {
        formState[`${name}ErrorText`] = '';
    }
}

export function validateEmailGeneric(formState, name) {
    const textRequired = 'Поле не является email';
    var regex = require('regex-email');

    if (formState[`${name}ErrorText`] === '') {
        if (!regex.test(this.props[name])) {
            formState[`${name}ErrorText`] = textRequired;
            formState.isValid = false;
        } else {
            formState[`${name}ErrorText`] = '';
        }
    }
}

export function formIsValidGeneric(formState) {
    for (var prop in formState) {
        if (prop.indexOf('ErrorText') !== -1) {
            if (formState[prop] !== '') {
                return false;
            }
        }
    }

    return true;
}
