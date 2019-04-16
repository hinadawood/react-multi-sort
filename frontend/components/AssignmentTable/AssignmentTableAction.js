import { data } from "./AssignmentTableData";

export const FETCH_COMPLETED = "FETCH_COMPLETED";

export function fetchData() {
  return {
    type: FETCH_COMPLETED,
    payload: {
      data
    }
  };
}

export const UPDATE_SORT_TABLE_STATE = "UPDATE_SORT_TABLE_STATE";

export function updateSortTableState(table, orderedMultiSortedColumnNameArray) {
  return {
    type: UPDATE_SORT_TABLE_STATE,
    payload: {
      table,
      orderedMultiSortedColumnNameArray
    }
  };
}

export const UPDATE_SORTED_DATA = "UPDATE_SORTED_DATA";

export function updateSortedData(data) {
  return {
    type: UPDATE_SORTED_DATA,
    payload: {
      data
    }
  };
}
