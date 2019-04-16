import React from "react";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";
import {
  AssignmentTable,
  mapDispatchToProps,
  mapStateToProps
} from "AssignmentTable/AssignmentTable";

let component;
const buildComponent = (
  props = {
    data: [
      {
        id: 2,
        name: "simon",
        family: "street",
        city: "melbourne",
        score: 400
      },
      {
        id: 4,
        name: "zac",
        family: "long",
        city: "melbourne",
        score: 300
      },
      {
        id: 6,
        name: "abraham",
        family: "blue",
        city: "darwin",
        score: 400
      }
    ],
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
    },
    orderedMultiSortedColumnNameArray: [],
    fetchData: function() {},
    updateSortTableState: function() {},
    updateSortedData: function() {}
  }
) => {
  component = shallow(<AssignmentTable {...props} />);
  return component;
};

describe("test component initialization", () => {
  beforeEach(() => {
    buildComponent();
  });
  it("should component be defined", () => {
    expect(component).to.be.an("object");
  });
  it("should contain table", () => {
    expect(component.contains(<table className="table" />));
  });
});

describe("test single sort and multi sort when header clicked", () => {
  beforeEach(() => {
    buildComponent();
  });
  it("should simulate click", () => {
    component.setProps({
      table: {
        name: {
          sortStatus: "unsorted",
          sortPosition: 0
        },
        family: {
          sortStatus: "sorted-ascending",
          sortPosition: 1
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
    });
    component
      .find("th")
      .at(2)
      .simulate("click", { shiftKey: false });
    expect(component.instance().props.data[0].family).to.equal("blue");
    expect(component.instance().props.data[1].family).to.equal("long");
    expect(component.instance().props.data[2].family).to.equal("street");
  });
  it("should simulate click", () => {
    component.setProps({
      table: {
        name: {
          sortStatus: "unsorted",
          sortPosition: 0
        },
        family: {
          sortStatus: "unsorted",
          sortPosition: 0
        },
        city: {
          sortStatus: "sorted-ascending",
          sortPosition: 1
        },
        score: {
          sortStatus: "sorted-ascending",
          sortPosition: 2
        }
      }
    });
    component
      .find("th")
      .at(3)
      .simulate("click", { shiftKey: true });
    component
      .find("th")
      .at(4)
      .simulate("click", { shiftKey: true });
    expect(component.instance().props.data[0].city).to.equal("darwin");
    expect(component.instance().props.data[1].city).to.equal("melbourne");
    expect(component.instance().props.data[2].city).to.equal("melbourne");
    expect(component.instance().props.data[0].score).to.equal(400);
    expect(component.instance().props.data[1].score).to.equal(300);
    expect(component.instance().props.data[2].score).to.equal(400);
  });
});

describe("test redux methods mapDispatchToProps and mapStateToProps", () => {
  beforeEach(() => {
    buildComponent();
  });
  it("should check mapDispatchToProps", () => {
    const dispatch = function() {};
    mapDispatchToProps(dispatch).fetchData();
    expect(dispatch).to.have.been.called;
  });
  it("should check mapStateToProps", () => {
    const initialState = {
      assignmentTable: {
        data: [],
        table: {},
        orderedMultiSortedColumnNameArray: []
      }
    };
    expect(mapStateToProps(initialState)).to.deep.equal({
      data: [],
      table: {},
      orderedMultiSortedColumnNameArray: []
    });
  });
});

describe("test react lifecycle methods", () => {
  beforeEach(() => {
    buildComponent();
  });
  it("should check componentDidMount", () => {
    expect(component.instance().props.fetchData).to.have.been.called;
  });
  it("should check componentWillReceiveProps", () => {
    component.setProps({
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
    });
    expect(component.instance().props.data[0].name).to.equal("abraham");
    expect(component.instance().props.data[1].name).to.equal("simon");
    expect(component.instance().props.data[2].name).to.equal("zac");
  });
});
