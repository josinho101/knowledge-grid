import localeHelper from "./localehelper";
import DataRow from "../components/common/table/typings/datarow";
import HeaderRow from "../components/common/table/typings/headerrow";
import HeaderCell from "../components/common/table/typings/headercell";
import ColumnDefinition from "../components/common/table/typings/columndefinition";

export default abstract class TableHelper {
  protected readonly columnDefinitions: ColumnDefinition[];

  constructor(columnDefinitions: ColumnDefinition[]) {
    this.columnDefinitions = columnDefinitions;
  }

  public abstract readonly getDataRows: () => DataRow[];

  public readonly getHeaderRow = (): HeaderRow => {
    const headerRow: HeaderRow = {
      cells: [],
    } as HeaderRow;

    this.columnDefinitions.forEach((def: ColumnDefinition) => {
      const key = def.headRowResourceKey;
      const cell = {
        data: key ? localeHelper.translate(key) : undefined,
      } as HeaderCell;

      headerRow.cells.push(cell);
    });

    return headerRow;
  };
}
