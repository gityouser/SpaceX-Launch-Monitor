import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import InfoIcon from "@material-ui/icons/Info";
import YouTubeIcon from "@material-ui/icons/YouTube";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import dayjs from "dayjs";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0 !important" : undefined,
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
  imageContainer: {
    width: "30px",
    height: "30px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <strong>{label}</strong>
      </TableCell>
    );
  };

  render() {
    const {
      classes,
      columns,
      rowHeight,
      headerHeight,
      launches,
      ...tableProps
    } = this.props;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit",
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowGetter={({ index }) => {
              const { name, date_local, success, links } = launches[index];

              return {
                patch: (
                  <div className={classes.imageContainer}>
                    <img className={classes.image} src={links.patch.small} />
                  </div>
                ),
                name: (
                  <Typography
                    noWrap
                    variant="button"
                    display="block"
                    gutterBottom
                  >
                    {name}
                  </Typography>
                ),
                date: (
                  <Typography
                    noWrap
                    variant="button"
                    display="block"
                    gutterBottom
                  >
                    {dayjs(date_local).format("DD-MM-YYYY")}{" "}
                  </Typography>
                ),
                success: success ? " Yes" : "No",
                webcast: (
                  <a
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    href={links?.webcast}
                  >
                    {links?.webcast ? (
                      <YouTubeIcon style={{ color: "red" }} />
                    ) : (
                      <CancelPresentationIcon />
                    )}
                  </a>
                ),
                wiki: (
                  <a
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    href={links?.wikipedia}
                  >
                    {links?.wikipedia ? (
                      <InfoIcon style={{ color: "#333" }} />
                    ) : (
                      "No Wiki"
                    )}
                  </a>
                ),
              };
            }}
            rowCount={launches.length}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

function ReactVirtualizedTable({ filterData }) {
  return (
    <Paper style={{ height: 700, width: "100%" }}>
      <VirtualizedTable
        launches={filterData}
        columns={[
          {
            width: 200,
            label: "Patch",
            dataKey: "patch",
          },
          {
            width: 250,
            label: "Name",
            dataKey: "name",
          },
          {
            width: 250,
            label: "Date",
            dataKey: "date",
            numeric: true,
          },
          {
            width: 200,
            label: "Successful",
            dataKey: "success",
            numeric: true,
          },
          {
            width: 200,
            label: "Webcast",
            dataKey: "webcast",
            numeric: true,
          },
          {
            width: 200,
            label: "Wiki",
            dataKey: "wiki",
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
}

export default ReactVirtualizedTable;
