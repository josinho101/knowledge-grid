import React from "react";
import Textbox from "../common/textbox";
import IconButton from "../common/iconbutton";
import localeHelper from "../../utils/localehelper";

const Users: React.FC = () => {
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
                      {localeHelper.translate("pages.users.grid.search")}:
                      <Textbox
                        type="search"
                        id="txtSearch"
                        className="form-control form-control-sm"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Users;
