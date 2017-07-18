import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { closeForm, setText, setSubject, createDistributionSuccess, loadGroupsSuccess, validate }
    from '../../../actions/DistributionFormActions.js';
import { getClientGroups } from '../../../api/clientGroup.js';
import { addDistribution } from '../../../api/distribution.js';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
    from 'material-ui/Table';
import appConfig from '../../../../appConfig.js';
import './DistributionForm.sass';
import { processCheckbox, validateFieldGeneric, formIsValidGeneric } from '../../../helper/helper.js';

class DistributionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: true,
            selectable: true,
            multiSelectable: true,
            enableSelectAll: true,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '100%'
        };
    }

    formState = {
        isValid: true
    };

    onRowSelectionHandler = processCheckbox;

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

    handleSetSubject = event => {
        this.props.dispatch(setSubject(event.target.value));

        setTimeout(() => {
            this.validateField('subject');
            this.props.dispatch(validate(this.formState));
        }, 1);
    };

    validateField = validateFieldGeneric.bind(this, this.formState);
    formIsValid = formIsValidGeneric.bind(this, this.formState);

    validateForm = () => {
        this.validateField('text');
        this.validateField('subject');
        this.formState.isValid = this.formIsValid();
    };

    handleSave = () => {
        this.validateForm();
        this.props.dispatch(validate(this.formState));

        if (this.formState.isValid) {
            const selectedGroups = this.props.groups.filter(item => item.selected);

            return addDistribution({
                ContestId: this.props.contestId,
                Text: this.props.text,
                SelectGroups: selectedGroups,
                Subject: this.props.subject,
                contestLink: appConfig.contestLink
            }).then(result => {
                this.props.dispatch(createDistributionSuccess(result));
                // this.props.dispatch(globalLoaderShow(false));
                this.handleClose();
                return result;
            }).catch((e) => {
                // this.props.dispatch(globalLoaderShow(false));
            });
        }
    };

    componentWillMount() {
        return getClientGroups({
            page: appConfig.page,
            count: appConfig.count
        }).then(result => {
            this.props.dispatch(loadGroupsSuccess(result));
            // this.props.dispatch(globalLoaderShow(false));
            return result;
        }).catch(() => {
            // this.props.dispatch(globalLoaderShow(false));
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="Отмена"
                primary={true}
                onTouchTap={this.handleClose}
                />,
            <FlatButton
                label="Отправить"
                primary={true}
                onTouchTap={this.handleSave}
                />
        ];

        return (
            <div>
                <Dialog
                    title="Создание рассылки"
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    >
                    <TextField
                        hintText="Тема письма"
                        floatingLabelText="Тема письма"
                        fullWidth={true}
                        value={this.props.subject}
                        errorText={this.props.subjectErrorText}
                        onChange={this.handleSetSubject}
                        /><br />
                    <TextField
                        hintText="Текст письма"
                        floatingLabelText="Текст письма"
                        multiLine={true}
                        rows={5}
                        fullWidth={true}
                        value={this.props.text}
                        errorText={this.props.textErrorText}
                        onChange={this.handleSetText}
                        /><br />
                    <div className="distribution-form__group-table">
                        <Table
                            height={this.state.height}
                            fixedHeader={this.state.fixedHeader}
                            fixedFooter={this.state.fixedFooter}
                            selectable={this.state.selectable}
                            multiSelectable={this.state.multiSelectable}
                            onRowSelection={this.onRowSelectionHandler.bind(this, this.props.groups)}
                            >
                            <TableHeader
                                displaySelectAll={this.state.showCheckboxes}
                                adjustForCheckbox={this.state.showCheckboxes}
                                enableSelectAll={this.state.enableSelectAll}
                                >
                                <TableRow>
                                    <TableHeaderColumn>Название группы</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={this.state.showCheckboxes}
                                deselectOnClickaway={this.state.deselectOnClickaway}
                                showRowHover={this.state.showRowHover}
                                stripedRows={this.state.stripedRows}
                                >
                                {
                                    this.props.groups.map((item, index) => (
                                        <TableRow key={item.Id}>
                                            <TableRowColumn>{item.Name}</TableRowColumn>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table><br />
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        contestId: store.GlobalState.currentRoute.id,
        text: store.DistributionFormState.text,
        subject: store.DistributionFormState.subject,
        groups: store.DistributionFormState.groups,
        subjectErrorText: store.DistributionFormState.subjectErrorText,
        textErrorText: store.DistributionFormState.textErrorText
    };
};

export default connect(mapStateToProps)(DistributionForm);
