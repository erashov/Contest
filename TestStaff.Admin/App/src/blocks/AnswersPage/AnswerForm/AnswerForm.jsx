import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import { answerAddSuccess, answerEditSuccess }
    from '../../../actions/AnswerActions.js';
import { addAnswer, editAnswer, getAnswerType } from '../../../api/answer.js';
import { validateFieldGeneric, formIsValidGeneric } from '../../../helper/helper.js';
import { closeForm, setText, setAnswerType, validate, answerTypeLoadSuccess, setCorrect }
    from '../../../actions/AnswerFormActions.js';

class AnswerForm extends React.Component {
    isCreate = () => !this.props.id;

    listElementValue = 1;

    formState = {
        isValid: true
    };

    handleClose = () => {
        this.props.dispatch(closeForm());
    };

    handleSetText = event => {
        this.props.dispatch(setText(event.target.value));

        setTimeout(() => {
            this.validateField('text');
            this.props.dispatch(validate(this.formState));
        }, 1);
    };

    handleSetCorrect = event => {
        this.props.dispatch(setCorrect(event.target.checked));
    };

    // handleSetType = (event, index, value) => {
    //     this.props.dispatch(setAnswerType(value));

    //     setTimeout(() => {
    //         this.validateField('answerType');
    //         this.props.dispatch(validate(this.formState));
    //     }, 1);
    // };

    validateField = validateFieldGeneric.bind(this, this.formState);
    formIsValid = formIsValidGeneric.bind(this, this.formState);

    validateForm = () => {
        this.validateField('text');
       // this.validateField('answerType');
        this.formState.isValid = this.formIsValid();
    };

    handleSave = () => {
        this.validateForm();
        this.props.dispatch(validate(this.formState));

        const rating = this.props.isCorrect ? 1 : 0;

        if (this.formState.isValid) {
            if (this.isCreate()) {
                return addAnswer({
                    QuestionId: this.props.questionId,
                    Text: this.props.text,
                    AnswerTypeId: this.listElementValue,
                    Rating: rating
                }).then(result => {
                    this.props.dispatch(answerAddSuccess(result));
                    // this.props.dispatch(globalLoaderShow(false));
                    this.handleClose();
                    return result;
                }).catch((e) => {
                    // this.props.dispatch(globalLoaderShow(false));
                });
            } else {
                return editAnswer({
                    Id: this.props.id,
                    QuestionId: this.props.questionId,
                    Text: this.props.text,
                    AnswerTypeId: this.listElementValue,
                    Rating: rating
                }).then(result => {
                    this.props.dispatch(answerEditSuccess(result));
                    // this.props.dispatch(globalLoaderShow(false));
                    this.handleClose();
                    return result;
                }).catch((e) => {
                    // this.props.dispatch(globalLoaderShow(false));
                });
            }
        }
    };

    // loadAnswerType = () => {
    //     return getAnswerType({}).then(result => {
    //         this.props.dispatch(answerTypeLoadSuccess(result));
    //         // this.props.dispatch(globalLoaderShow(false));
    //         return result;
    //     }).catch(() => {
    //         // this.props.dispatch(globalLoaderShow(false));
    //     });
    // };

    // componentWillMount() {
    //    // this.loadAnswerType();
    // }

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

        const title = this.isCreate() ? 'Добавление ответа' : 'Редактирование ответа';

        return (
            <div>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    >
                    <Checkbox
                        checked={this.props.isCorrect}
                        label="Корректный"
                        onCheck={this.handleSetCorrect}
                        />
                    <TextField
                        hintText="Текст"
                        floatingLabelText="Текст"
                        errorText={this.props.textErrorText}
                        multiLine={true}
                        rows={3}
                        fullWidth={true}
                        value={this.props.text}
                        onChange={this.handleSetText}
                        /><br />
                    {/* <SelectField value={this.props.answerType}
                        onChange={this.handleSetType}
                        floatingLabelText="Тип ответа"
                        floatingLabelFixed={true}
                        errorText={this.props.answerTypeErrorText}
                        >
                        {
                            this.props.answerTypes.map(item => (
                                <MenuItem
                                    value={item.Id}
                                    primaryText={item.Name}
                                    key={item.Id}
                                    />
                            ))
                        }
                    </SelectField><br /> */}
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        id: store.AnswerFormState.id,
        text: store.AnswerFormState.text,
        // answerType: store.AnswerFormState.answerType,
        textErrorText: store.AnswerFormState.textErrorText,
        // answerTypeErrorText: store.AnswerFormState.answerTypeErrorText,
        isValidForm: store.AnswerFormState.isValid,
        // answerTypes: store.AnswerFormState.answerTypes,
        questionId: store.GlobalState.currentRoute.id,
        isCorrect: store.AnswerFormState.isCorrect,
    };
};

export default connect(mapStateToProps)(AnswerForm);
