import React from "react";
import columnNames from "./columnnames";
import IUser from "../../../models/user";
import Checkbox from "../../common/checkbox";
import IconButton from "../../common/iconbutton";
import TableHelper from "../../../utils/tablehelper";
import localeHelper from "../../../utils/localehelper";
import DataRow from "../../common/table/typings/datarow";
import DataCell from "../../common/table/typings/datacell";
import ColumnDefinition from "../../common/table/typings/columndefinition";
var colDef = require("./usercolumndef.json");

export default class UserTableHelper extends TableHelper {
  private users: IUser[];

  constructor(users: IUser[]) {
    super(colDef as any);
    this.users = users;
  }

  public getDataRows = (): DataRow[] => {
    const rows: DataRow[] = [];

    if (this.users) {
      this.users.forEach((user: IUser, userIndex: number) => {
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
              cell.data = new Date(user.created_date).toLocaleDateString();
              break;
            case columnNames.edit:
              cell.data = this.renderIconButton(id, def.dataRowResourceKey);
              break;
          }

          row.cells.push(cell);
        });

        rows.push(row);
      });
    }

    return rows;
  };

  private renderIconButton(id: string, textKey: string) {
    const editButtonProps: any = {
      text: localeHelper.translate(textKey),
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
