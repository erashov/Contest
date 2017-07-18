import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { contestAddSuccess, contestEditSuccess } from '../../../actions/ContestActions.js';
import { closeForm, setName, setDescription, setResult, validate } from '../../../actions/ContestFormActions.js';
import { addContest, editContest } from '../../../api/contest.js';
import { validateFieldGeneric, formIsValidGeneric } from '../../../helper/helper.js';

class ContestForm extends React.Component {
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

    handleSetDescription = event => {
        this.props.dispatch(setDescription(event.target.value));

        setTimeout(() => {
            this.validateField('description');
            this.props.dispatch(validate(this.formState));
        }, 1);
    };

    handleSetResult = event => {
        this.props.dispatch(setResult(event.target.value));

        setTimeout(() => {
            this.validateField('result');
            this.props.dispatch(validate(this.formState));
        }, 1);
    };

    validateField = validateFieldGeneric.bind(this, this.formState);
    formIsValid = formIsValidGeneric.bind(this, this.formState);

    validateForm = () => {
        this.validateField('name');
        this.validateField('description');
        this.validateField('result');
        this.formState.isValid = this.formIsValid();
    };

    handleSave = () => {
        this.validateForm();
        this.props.dispatch(validate(this.formState));

        if (this.formState.isValid) {
            if (this.isCreate()) {
                return addContest({
                    Name: this.props.name,
                    Description: this.props.description,
                    Result: this.props.result
                }).then(result => {
                    this.props.dispatch(contestAddSuccess(result));
                    // this.props.dispatch(globalLoaderShow(false));
                    this.handleClose();
                    return result;
                }).catch((e) => {
                    // this.props.dispatch(globalLoaderShow(false));
                });
            } else {
                return editContest({
                    Id: this.props.id,
                    Name: this.props.name,
                    Description: this.props.description,
                    Result: this.props.result
                }).then(result => {
                    this.props.dispatch(contestEditSuccess(result));
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

        const title = this.isCreate() ? 'Создание опроса' : 'Редактирование опроса';

        return (
            <div>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    >
                    <form>
                        <TextField
                            hintText="Название"
                            floatingLabelText="Название"
                            fullWidth={true}
                            value={this.props.name}
                            errorText={this.props.nameErrorText}
                            onChange={this.handleSetName}
                            /><br />
                        <TextField
                            hintText="Описание"
                            floatingLabelText="Описание"
                            multiLine={true}
                            rows={3}
                            fullWidth={true}
                            value={this.props.description}
                            errorText={this.props.descriptionErrorText}
                            onChange={this.handleSetDescription}
                            /><br />
                        <TextField
                            hintText="Результат"
                            floatingLabelText="Текст после опроса"
                            multiLine={true}
                            rows={3}
                            fullWidth={true}
                            value={this.props.result}
                            errorText={this.props.resultErrorText}
                            onChange={this.handleSetResult}
                            /><br />
                    </form>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        id: store.ContestFormState.id,
        name: store.ContestFormState.name,
        description: store.ContestFormState.description,
        result: store.ContestFormState.result,
        nameErrorText: store.ContestFormState.nameErrorText,
        descriptionErrorText: store.ContestFormState.descriptionErrorText,
        resultErrorText: store.ContestFormState.resultErrorText,
        isValidForm: store.ContestFormState.isValid
    };
};

export default connect(mapStateToProps)(ContestForm);
