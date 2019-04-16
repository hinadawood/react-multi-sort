import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchData,
  updateSortTableState,
  updateSortedData
} from "./AssignmentTableAction";
import "../../styles/common.css";

export class AssignmentTable extends Component {
  constructor(props) {
    super(props);
    this.sortOn = this.sortOn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let { table, data } = nextProps;
    data.sort(this.performSort(table));
    this.props.updateSortedData(data);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  createSortOrderArray(table) {
    let sortOrderArray = [];
    Object.keys(table).map((key, id) => {
      if (table[key].sortStatus !== "unsorted") {
        sortOrderArray.push({
          header: key,
          status: table[key].sortStatus,
          order: table[key].sortPosition
        });
      }
    });
    sortOrderArray.sort((a, b) => {
      return a.order - b.order;
    });
    return sortOrderArray;
  }

  performSort(table) {
    let sortOrderArray = this.createSortOrderArray(table);
    return function(a, b) {
      for (let i = 0; i < sortOrderArray.length; i++) {
        let header = sortOrderArray[i].header;
        let status = sortOrderArray[i].status;
        if (a[header] < b[header]) {
          return status === "sorted-descending" ? 1 : -1;
        }
        if (a[header] > b[header]) {
          return status === "sorted-descending" ? -1 : 1;
        }
      }
      return 0;
    };
  }

  firstColumnSortTableState(colHeader, sortStatus) {
    let table = {};
    Object.keys(this.props.table).map(header => {
      if (header !== colHeader) {
        table[header] = {
          sortStatus: "unsorted",
          sortPosition: 0
        };
      } else {
        table[header] = {
          sortStatus,
          sortPosition: 1
        };
      }
    });
    return table;
  }

  sortStateUpdateMultipleSort(currentColHeader, currentColSortStatus) {
    let { orderedMultiSortedColumnNameArray, table } = this.props;
    if (orderedMultiSortedColumnNameArray.length == 0) {
      let updatedTableState = this.firstColumnSortTableState(
        currentColHeader,
        currentColSortStatus
      );
      this.props.updateSortTableState(updatedTableState, [currentColHeader]);
    } else {
      if (
        currentColSortStatus === "sorted-ascending" ||
        currentColSortStatus === "sorted-descending"
      ) {
        if (!orderedMultiSortedColumnNameArray.includes(currentColHeader)) {
          orderedMultiSortedColumnNameArray.push(currentColHeader);
        }
      } else if (currentColSortStatus === "unsorted") {
        orderedMultiSortedColumnNameArray = orderedMultiSortedColumnNameArray.filter(
          e => e != currentColHeader
        );
      }
      let updatedTableState = {};
      Object.keys(table).map(key => {
        let keyOrderedPosition = orderedMultiSortedColumnNameArray.indexOf(key);
        updatedTableState = Object.assign(updatedTableState, {
          [key]: {
            sortStatus:
              key === currentColHeader
                ? currentColSortStatus
                : table[key].sortStatus,
            sortPosition: keyOrderedPosition === -1 ? 0 : keyOrderedPosition + 1
          }
        });
      });
      this.props.updateSortTableState(
        updatedTableState,
        orderedMultiSortedColumnNameArray
      );
    }
  }

  sortStateUpdateSingleSort(currentColHeader, currentColSortStatus) {
    let updatedTableState = this.firstColumnSortTableState(
      currentColHeader,
      currentColSortStatus
    );
    this.props.updateSortTableState(updatedTableState, []);
  }

  sortOn(event, colHeader) {
    if (event.shiftKey) {
      if (this.props.table[colHeader].sortStatus === "unsorted")
        this.sortStateUpdateMultipleSort(colHeader, "sorted-ascending");
      else if (this.props.table[colHeader].sortStatus === "sorted-ascending")
        this.sortStateUpdateMultipleSort(colHeader, "sorted-descending");
      else this.sortStateUpdateMultipleSort(colHeader, "unsorted");
    } else {
      if (this.props.table[colHeader].sortStatus === "unsorted")
        this.sortStateUpdateSingleSort(colHeader, "sorted-ascending");
      else if (this.props.table[colHeader].sortStatus === "sorted-ascending")
        this.sortStateUpdateSingleSort(colHeader, "sorted-descending");
      else this.sortStateUpdateSingleSort(colHeader, "unsorted");
    }
  }

  renderHeader() {
    let { data, table, orderedMultiSortedColumnNameArray } = this.props;
    return (
      <thead>
        <tr>
          {data.length > 0 ? (
            Object.keys(data[0]).map((colHeader, id) => {
              if (colHeader === "id") {
                return <th key={id}>{colHeader}</th>;
              } else {
                return (
                  <th onClick={e => this.sortOn(e, colHeader)} key={id}>
                    {colHeader}
                    {orderedMultiSortedColumnNameArray.length > 0 &&
                    table[colHeader].sortPosition !== 0 ? (
                      <span className="sort-number">
                        {table[colHeader].sortPosition}
                      </span>
                    ) : (
                      <span />
                    )}
                    {table[colHeader].sortStatus === "sorted-ascending" ? (
                      <i className="fa fa-sort-up icon-space" />
                    ) : table[colHeader].sortStatus === "sorted-descending" ? (
                      <i className="fa fa-sort-down icon-space" />
                    ) : (
                      <i className="fa fa-sort icon-space" />
                    )}
                  </th>
                );
              }
            })
          ) : (
            <th />
          )}
        </tr>
      </thead>
    );
  }

  render() {
    let { data } = this.props;
    return (
      <div className="table-container">
        <table className="table table-bordered">
          <caption className="table-caption">
            Hina's Assignment Multi Sort Table
          </caption>
          {this.renderHeader()}
          <tbody>
            {data.map((row, idx) => {
              return (
                <tr key={idx}>
                  {Object.keys(row).map((val, i) => {
                    return <td key={i}>{row[val]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export const mapStateToProps = state => {
  let {
    data,
    table,
    orderedMultiSortedColumnNameArray
  } = state.assignmentTable;
  return {
    data,
    table,
    orderedMultiSortedColumnNameArray
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => {
      dispatch(fetchData());
    },
    updateSortTableState: (table, orderedMultiSortedColumnNameArray) => {
      dispatch(updateSortTableState(table, orderedMultiSortedColumnNameArray));
    },
    updateSortedData: data => {
      dispatch(updateSortedData(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentTable);
