import Table from "../common/table";
import IUser from "../../models/user";
import Spinner from "../common/spinner";
import Textbox from "../common/textbox";
import { AppState } from "../../reducers";
import IconButton from "../common/iconbutton";
import CommonModal from "../common/commonmodal";
import { useSelector, connect } from "react-redux";
import React, { useEffect, useState } from "react";
import localeHelper from "../../utils/localehelper";
import UserTableHelper from "./table/usertablehelper";
import { getUsers, saveUser } from "../../actions/administration/users";

interface Props {
  getUsers: Function;
  saveUser: Function;
  users?: IUser[];
}

const Users: React.FC<Props> = (props) => {
  const token = useSelector((state: AppState) => state.auth.token);
  const tableHelper = new UserTableHelper(props.users!);
  const [doShowSaveModal, setSaveModalDisplay] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    props.getUsers(token);
  }, []);

  const onFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };

  const onLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onCancelClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setSaveModalDisplay(false);
  };

  const onSaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const user: IUser = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
    };
    props.saveUser(user, token);
    setSaveModalDisplay(false);
  };

  const onCreateClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setSaveModalDisplay(true);
  };

  const renderTable = () => {
    if (props.users) {
      return (
        <Table
          id="user-table"
          header={tableHelper.getHeaderRow()}
          dataRows={tableHelper.getDataRows()}
        />
      );
    } else {
      return (
        <Spinner id="spinner-user" color="blue" spinnerCount={5} size="small" />
      );
    }
  };

  const renderTextbox = (
    id: string,
    type: string,
    lableKey: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    return (
      <React.Fragment>
        <label className="col-form-label">
          {localeHelper.translate(lableKey)}:
        </label>
        <Textbox
          id={id}
          className="form-control"
          type={type as any}
          onChange={onChange}
        />
      </React.Fragment>
    );
  };

  const getSaveUserModal = () => {
    return (
      <CommonModal
        id="user-create-or-update-modal"
        isOpen={doShowSaveModal}
        closeButtonClickHandler={onCancelClick}
        primaryButtonClickHandler={onSaveClick}
        secondaryButtonClickHandler={onCancelClick}
        primaryButtonText={localeHelper.translate(
          "pages.users.create-modal.save-button"
        )}
        secondaryButtonText={localeHelper.translate(
          "pages.users.create-modal.cancel-button"
        )}
        title={localeHelper.translate("pages.users.create-modal.title")}
      >
        <div className="form-row">
          <div className="col">
            {renderTextbox(
              "txtFirstname",
              "text",
              "pages.users.create-modal.firstname",
              onFirstnameChange
            )}
          </div>
          <div className="col">
            {renderTextbox(
              "txtLastname",
              "text",
              "pages.users.create-modal.lastname",
              onLastnameChange
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            {renderTextbox(
              "txtPassword",
              "password",
              "pages.users.create-modal.password",
              onPasswordChange
            )}
          </div>
          <div className="col">
            {renderTextbox(
              "txtConfirmPassword",
              "text",
              "pages.users.create-modal.confirm-password",
              onConfirmPasswordChange
            )}
          </div>
        </div>
        <div className="form-group">
          {renderTextbox(
            "txtEmail",
            "email",
            "pages.users.create-modal.email",
            onEmailChange
          )}
        </div>
      </CommonModal>
    );
  };

  return (
    <React.Fragment>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800 font-weight-normal">Users</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <IconButton
            buttonType="primary"
            iconClass="fa fa-plus"
            onClick={onCreateClick}
            text={localeHelper.translate("pages.users.create-btn")}
          />
          <IconButton
            buttonType="danger"
            iconClass="fas fa-trash"
            text={localeHelper.translate("pages.users.delete-btn")}
          />
          {getSaveUserModal()}
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <div className="col-sm-12">
                  <div id="dataTable_filter" className="dataTables_filter">
                    <label>
                      {localeHelper.translate("pages.users.table.search")}:
                      <Textbox
                        type="search"
                        id="txtSearch"
                        className="form-control form-control-sm"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="row min-height-500">
                <div className="col-sm-12">{renderTable()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state: AppState) {
  return {
    users: state.administration.users,
  };
}

const mapDispatchToProps = {
  getUsers,
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
