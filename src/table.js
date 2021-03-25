import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
// import EditColumn from "./editCoupons";
// import "./tableStyle.css";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const {
      order,
      orderBy,
      data } = this.props;

    return (
      <TableHead>
        <TableRow className="tableHead">
          {Object.keys(data[0]).map(
            row => (
              row !== "link" &&
              <TableCell
                key={row}
                align={"left"}
                sortDirection={orderBy === row ? order : false}
              >
                <TableSortLabel
                  active={orderBy === row}
                  direction={order}
                  onClick={this.createSortHandler(row)}
                >
                  {row.toUpperCase().replace("_", " ")}
                </TableSortLabel>
              </TableCell>
            )
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const styles = () => ({
  root: {
    width: "100%",
  },
  table: {
    minWidth: "100%"
  },
  tableWrapper: {
    overflowX: "auto",
  }
});

class EnhancedTable extends React.Component {
  state = {
    order: "asc",
    orderBy: "",
    selected: [],
    page: 0,
    attendance_todelete: [],
    deleteDialog: false
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, limit } = this.props;
    const { order, orderBy, selected, page } = this.state;
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={this.props.data.length}
              data={this.props.data}
              actions={this.props.actions}
            />
            <TableBody>
              {stableSort(this.props.data, getSorting(order, orderBy))
                .slice(page * limit, page * limit + limit)
                .map((n, index) => {

                  return (
                    <TableRow
                      inline
                      hover
                      key={index}
                      className="tableRow"
                      style={{
                        height: 20
                      }}
                    >
                      {Object.keys(this.props.data[0]).map(

                        row => (
                          (row !== "link") &&
                          // return (
                          <TableCell onClick={() => {
                            this.props.openDialog(n)
                          }} key={row} align="left" component="td" scope="row" className="tableCell" >
                            {n[row]}
                          </TableCell>
                          // )
                        )
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
