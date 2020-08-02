import React from "react";
import User from "../typings/user";
import columnNames from "./columnnames";
import Checkbox from "../../common/checkbox";
import IconButton from "../../common/iconbutton";
import TableHelper from "../../../utils/tablehelper";
import localeHelper from "../../../utils/localehelper";
import DataRow from "../../common/table/typings/datarow";
import DataCell from "../../common/table/typings/datacell";
import ColumnDefinition from "../../common/table/typings/columndefinition";
var colDef = require("./usercolumndef.json");

export default class UserTableHelper extends TableHelper {
  constructor() {
    super(colDef as any);
  }

  private getUserData = () => {
    const users: User[] = [];
    let user1: User = {
      _id: "abc1234",
      firstname: "Joseph",
      lastname: "Johny",
      email: "josinho.seven@gmail.com",
      created_date: "02/08/2020",
    };
    let user2: User = {
      _id: "abc5678",
      firstname: "Francis",
      lastname: "Johny",
      email: "francisje@gmail.com",
      created_date: "02/08/2020",
    };
    users.push(user1);
    users.push(user2);

    return users;
  };

  public getDataRows = (): DataRow[] => {
    const rows: DataRow[] = [];
    const users = this.getUserData();

    users.forEach((user: User, userIndex: number) => {
      const row: DataRow = { cells: [] };

      colDef.forEach((def: ColumnDefinition, defIndex: number) => {
        const cell: DataCell = {};
        const id = `${userIndex}-${defIndex}`;

        switch (def.name) {
          case columnNames.select:
            cell.data = this.renderCheckbox(id);
            break;
          case columnNames.firstname:
            cell.data = user.firstname;
            break;
          case columnNames.lastname:
            cell.data = user.lastname;
            break;
          case columnNames.email:
            cell.data = user.email;
            break;
          case columnNames.createdDate:
            cell.data = user.created_date;
            break;
          case columnNames.edit:
            cell.data = this.renderIconButton(id, def.dataRowResourceKey);
            break;
        }

        row.cells.push(cell);
      });

      rows.push(row);
    });

    return rows;
  };

  private renderIconButton(id: string, textKey: string) {
    const editButtonProps: any = {
      iconClass: "fa fa-pencil-alt",
      title: localeHelper.translate(textKey),
      key: `${id}-edit-button-key`,
      buttonType: "primary",
    };

    return [React.createElement(IconButton, editButtonProps)];
  }

  private renderCheckbox(id: string) {
    const props = {
      id: id,
      key: `${id}-checkbox-key`,
    };

    return React.createElement(Checkbox, props);
  }
}
