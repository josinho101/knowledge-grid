import Table from "../common/table";
import IUser from "../../models/user";
import Textbox from "../common/textbox";
import React, { useEffect } from "react";
import { AppState } from "../../reducers";
import IconButton from "../common/iconbutton";
import localeHelper from "../../utils/localehelper";
import UserTableHelper from "./table/usertablehelper";
import { useSelector, connect } from "react-redux";
import { getUsers } from "../../actions/administration/users";
import Spinner from "../common/spinner";

interface Props {
  getUsers: Function;
  users?: IUser[];
}

const Users: React.FC<Props> = (props) => {
  const token = useSelector((state: AppState) => state.auth.token);
  const tableHelper = new UserTableHelper(props.users!);

  useEffect(() => {
    props.getUsers(token);
  }, []);

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
            text={localeHelper.translate("pages.users.create-btn")}
          />
          <IconButton
            buttonType="danger"
            iconClass="fas fa-trash"
            text={localeHelper.translate("pages.users.delete-btn")}
          />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
