import DataCell from "./datacell";

export default interface DataRow {
  cells: DataCell[];
  className?: string;
}
