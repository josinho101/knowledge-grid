import DataRow from "./typings/datarow";
import HeaderRow from "./typings/datarow";
import DataCell from "./typings/datacell";
import React, { CSSProperties } from "react";
import HeaderCell from "./typings/headercell";
import Tr from "./tr";
import Th from "./th";
import Td from "./td";

interface Props {
  id: string;
  header: HeaderRow;
  dataRows?: DataRow[];
}

const Table: React.FC<Props> = (props) => {
  const { id, header, dataRows } = props;
  const style: CSSProperties = {
    width: "100%",
  };

  const renderHeader = (tableId: string, header: HeaderRow) => {
    const cells = header.cells?.map((cell: HeaderCell, index: number) => {
      const identifier = `${tableId}-header-cell-${index}`;
      return (
        <Th id={identifier} key={`key-${identifier}`}>
          {cell.data}
        </Th>
      );
    });

    return <Tr id={`${tableId}-header-row`}>{cells}</Tr>;
  };

  const renderData = (tableId: string, dataRows?: DataRow[]) => {
    if (dataRows) {
      const rows = dataRows.map((row: DataRow, rowIndex: number) => {
        const rowIdentifier = `${tableId}-data-row-${rowIndex}`;
        const cells = row.cells?.map((cell: DataCell, cellIndex: number) => {
          const identifier = `${tableId}-data-cell-${rowIndex}-${cellIndex}`;
          return (
            <Td id={identifier} key={`key-${identifier}`}>
              {cell.data}
            </Td>
          );
        });

        return (
          <Tr id={rowIdentifier} key={`key-${rowIdentifier}`}>
            {cells}
          </Tr>
        );
      });

      return rows;
    }

    return null;
  };

  return (
    <table
      id={id}
      width="100%"
      cellSpacing="0"
      role="grid"
      style={style}
      className="table table-bordered dataTable table-hover table-md"
    >
      <thead>{renderHeader(id, header)}</thead>
      <tbody>{renderData(id, dataRows)}</tbody>
    </table>
  );
};

export default Table;
