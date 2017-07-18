import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { questionAddSuccess, questionEditSuccess }
    from '../../../actions/QuestionActions.js';
import { addQuestion, editQuestion, getQuestionType } from '../../../api/question.js';
import { validateFieldGeneric, formIsValidGeneric } from '../../../helper/helper.js';
import { closeForm, setText, setQuestionType, validate, questionTypeLoadSuccess }
    from '../../../actions/QuestionFormActions.js';

class QuestionForm extends React.Component {
    isCreate = () => !this.props.id;

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

    // handleSetType = (event, index, value) => {
    //     this.props.dispatch(setQuestionType(value));

    //     setTimeout(() => {
    //         this.validateField('questionType');
    //         this.props.dispatch(validate(this.formState));
    //     }, 1);
    // };

    validateField = validateFieldGeneric.bind(this, this.formState);
    formIsValid = formIsValidGeneric.bind(this, this.formState);

    validateForm = () => {
        this.validateField('text');
      //  this.validateField('questionType');
        this.formState.isValid = this.formIsValid();
    };

    handleSave = () => {
        this.validateForm();
        this.props.dispatch(validate(this.formState));

        if (this.formState.isValid) {
            if (this.isCreate()) {
                return addQuestion({
                    TestId: this.props.categoryId,
                    Text: this.props.text,
                  //  QuestionTypeId: this.props.questionType
                }).then(result => {
                    this.props.dispatch(questionAddSuccess(result));
                    // this.props.dispatch(globalLoaderShow(false));
                    this.handleClose();
                    return result;
                }).catch((e) => {
                    // this.props.dispatch(globalLoaderShow(false));
                });
            } else {
                return editQuestion({
                    Id: this.props.id,
                    TestId: this.props.categoryId,
                    Text: this.props.text,
                 //   QuestionTypeId: this.props.questionType
                }).then(result => {
                    this.props.dispatch(questionEditSuccess(result));
                    // this.props.dispatch(globalLoaderShow(false));
                    this.handleClose();
                    return result;
                }).catch((e) => {
                    // this.props.dispatch(globalLoaderShow(false));
                });
            }
        }
    };

    // loadQuesitonType = () => {
    //     return getQuestionType({}).then(result => {
    //         this.props.dispatch(questionTypeLoadSuccess(result));
    //         // this.props.dispatch(globalLoaderShow(false));
    //         return result;
    //     }).catch(() => {
    //         // this.props.dispatch(globalLoaderShow(false));
    //     });
    // };

    // componentWillMount() {
    //     this.loadQuesitonType();
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

        const title = this.isCreate() ? 'Добавление вопроса' : 'Редактирование вопроса';

        return (
            <div>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    >
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
                   {/* <SelectField value={this.props.questionType}
                        onChange={this.handleSetType}
                        floatingLabelText="Тип вопроса"
                        errorText={this.props.questionTypeErrorText}
                        floatingLabelFixed={true}
                        >
                        {
                            this.props.questionTypes.map(item => (
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
        id: store.QuestionFormState.id,
        text: store.QuestionFormState.text,
       // questionType: store.QuestionFormState.questionType,
        textErrorText: store.QuestionFormState.textErrorText,
       // questionTypeErrorText: store.QuestionFormState.questionTypeErrorText,
        isValidForm: store.QuestionFormState.isValid,
      //  questionTypes: store.QuestionFormState.questionTypes,
        categoryId: store.GlobalState.currentId,
    };
};

export default connect(mapStateToProps)(QuestionForm);
