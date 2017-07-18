import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { clientAddSuccess, clientEditSuccess }
    from '../../../actions/ClientActions.js';
import { addClient, editClient } from '../../../api/client.js';
import { validateFieldGeneric, validateEmailGeneric, formIsValidGeneric } from '../../../helper/helper.js';
import { closeForm, setName, setEmail, validate } from '../../../actions/ClientFormActions.js';

class ClientForm extends React.Component {
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

    handleSetEmail = event => {
        this.props.dispatch(setEmail(event.target.value));

        setTimeout(() => {
            this.validateField('email');
            this.validateEmail('email');
            this.props.dispatch(validate(this.formState));
        }, 1);
    };

    validateField = validateFieldGeneric.bind(this, this.formState);
    formIsValid = formIsValidGeneric.bind(this, this.formState);
    validateEmail = validateEmailGeneric.bind(this, this.formState);

    validateForm = () => {
        this.validateField('name');
        this.validateField('email');
        this.validateEmail('email');
        this.formState.isValid = this.formIsValid();
    };

    handleSave = () => {
        this.validateForm();
        this.props.dispatch(validate(this.formState));

        if (this.formState.isValid) {
            if (this.isCreate()) {
                return addClient({
                    Name: this.props.name,
                    Email: this.props.email
                }).then(result => {
                    this.props.dispatch(clientAddSuccess(result));
                    // this.props.dispatch(globalLoaderShow(false));
                    this.handleClose();
                    return result;
                }).catch((e) => {
                    // this.props.dispatch(globalLoaderShow(false));
                });
            } else {
                return editClient({
                    Id: this.props.id,
                    Name: this.props.name,
                    Email: this.props.email
                }).then(result => {
                    this.props.dispatch(clientEditSuccess(result));
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

        const title = this.isCreate() ? 'Создание клиента' : 'Редактирование клиента';

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
                        errorText={this.props.nameErrorText}
                        fullWidth={true}
                        value={this.props.name}
                        onChange={this.handleSetName}
                        /><br />
                    <TextField
                        hintText="Email"
                        floatingLabelText="Email"
                        errorText={this.props.emailErrorText}
                        fullWidth={true}
                        value={this.props.email}
                        onChange={this.handleSetEmail}
                        /><br />
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        id: store.ClientFormState.id,
        name: store.ClientFormState.name,
        nameErrorText: store.ClientFormState.nameErrorText,
        email: store.ClientFormState.email,
        emailErrorText: store.ClientFormState.emailErrorText,
        isValidForm: store.ClientGroupFormState.isValid
    };
};

export default connect(mapStateToProps)(ClientForm);
