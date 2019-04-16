import * as actions from "AssignmentTable/AssignmentTableAction";
import { expect } from "chai";
import { data } from "AssignmentTable/AssignmentTableData";

describe("test for actions", () => {
  it("fetchData", () => {
    const expectedAction = {
      type: actions.FETCH_COMPLETED,
      payload: {
        data
      }
    };
    expect(actions.fetchData()).to.deep.equal(expectedAction);
  });

  it("updateSortTableState", () => {
    let table = {};
    let orderedMultiSortedColumnNameArray = [];
    const expectedAction = {
      type: actions.UPDATE_SORT_TABLE_STATE,
      payload: {
        table,
        orderedMultiSortedColumnNameArray
      }
    };
    expect(
      actions.updateSortTableState(table, orderedMultiSortedColumnNameArray)
    ).to.deep.equal(expectedAction);
  });

  it("updateSortedData", () => {
    let data = [];
    const expectedAction = {
      type: actions.UPDATE_SORTED_DATA,
      payload: {
        data
      }
    };
    expect(actions.updateSortedData(data)).to.deep.equal(expectedAction);
  });
});
