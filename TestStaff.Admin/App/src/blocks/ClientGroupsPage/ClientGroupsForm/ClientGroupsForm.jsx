import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { clientGroupsAddSuccess, clientGroupsEditSuccess }
    from '../../../actions/ClientGroupsActions.js';
import { closeForm, setName, validate } from '../../../actions/ClientGroupsFormActions.js';
import { addClientGroup, editClientGroup } from '../../../api/clientGroup.js';
import { validateFieldGeneric, formIsValidGeneric } from '../../../helper/helper.js';

class ClientGroupsForm extends React.Component {
    isCreate = () => !this.props.id;

    formState = {
        isValid: true
    };

    handleClose = () => {
        this.props.dispatch(closeForm());
    };

    handleSetName = event => {
        this.props.dispatch(setName(event.target.value));

        setTimeout(() => {
            this.validateField('name');
            this.props.dispatch(validate(this.formState));
        }, 1);
    };

    validateField = validateFieldGeneric.bind(this, this.formState);
    formIsValid = formIsValidGeneric.bind(this, this.formState);

    validateForm = () => {
        this.validateField('name');
        this.formState.isValid = this.formIsValid();
    };

    handleSave = () => {
        this.validateForm();
        this.props.dispatch(validate(this.formState));

        if (this.formState.isValid) {
            if (this.isCreate()) {
                return addClientGroup({
                    Name: this.props.name
                }).then(result => {
                    this.props.dispatch(clientGroupsAddSuccess(result));
                    // this.props.dispatch(globalLoaderShow(false));
                    this.handleClose();
                    return result;
                }).catch((e) => {
                    // this.props.dispatch(globalLoaderShow(false));
                });
            } else {
                return editClientGroup({
                    Id: this.props.id,
                    Name: this.props.name
                }).then(result => {
                    this.props.dispatch(clientGroupsEditSuccess(result));
                    // this.props.dispatch(globalLoaderShow(false));
                    this.handleClose();
                    return result;
                }).catch((e) => {
                    // this.props.dispatch(globalLoaderShow(false));
                });
            }
        }
    };

    render() {
        const actions = [
            <FlatButton
                label="Отмена"
                primary={true}
                onTouchTap={this.handleClose}
                />,
            <FlatButton
                label="Сохранить"
                primary={true}
                onTouchTap={this.handleSave}
                />
        ];

        const title = this.isCreate() ? 'Создание группы' : 'Редактирование группы';

        return (
            <div>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    >
                    <TextField
                        hintText="Название"
                        floatingLabelText="Название"
                        fullWidth={true}
                        value={this.props.name}
                        errorText={this.props.nameErrorText}
                        onChange={this.handleSetName}
                        /><br />
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        id: store.ClientGroupFormState.id,
        name: store.ClientGroupFormState.name,
        nameErrorText: store.ClientGroupFormState.nameErrorText,
        isValidForm: store.ClientGroupFormState.isValid
    };
};

export default connect(mapStateToProps)(ClientGroupsForm);
