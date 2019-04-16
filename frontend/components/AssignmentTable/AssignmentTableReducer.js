import {
  FETCH_COMPLETED,
  UPDATE_SORT_TABLE_STATE,
  UPDATE_SORTED_DATA
} from "./AssignmentTableAction";

export default function assignmentTableReducer(
  state = {
    data: [],
    showLoading: true,
    error: false,
    orderedMultiSortedColumnNameArray: [],
    table: {
      name: {
        sortStatus: "sorted-ascending",
        sortPosition: 1
      },
      family: {
        sortStatus: "unsorted",
        sortPosition: 0
      },
      city: {
        sortStatus: "unsorted",
        sortPosition: 0
      },
      score: {
        sortStatus: "unsorted",
        sortPosition: 0
      }
    }
  },
  action = null
) {
  switch (action.type) {
    case FETCH_COMPLETED: {
      return {
        ...state,
        data: action.payload.data,
        showLoading: false,
        error: false
      };
    }
    case UPDATE_SORT_TABLE_STATE: {
      return {
        ...state,
        table: action.payload.table,
        orderedMultiSortedColumnNameArray:
          action.payload.orderedMultiSortedColumnNameArray
      };
    }
    case UPDATE_SORTED_DATA: {
      return {
        ...state,
        data: action.payload.data
      };
    }
    default:
      return state;
  }
}
