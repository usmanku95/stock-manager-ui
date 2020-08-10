/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { GetLogsCall } from "api/api";
import DateFilter from "./DateFilter";
import { toast } from "react-toastify";
import ReactTable from "react-table-6";
import moment from "moment";
import useStateWithCallback from "use-state-with-callback";
import "react-toastify/dist/ReactToastify.css";
import "react-table-6/react-table.css";
import { get24hours } from "./utils/helper";

var jwtDecode = require("jwt-decode");

toast.configure();
let defaultDate = get24hours();

function ViewLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setloading] = useState(false);
  const [pages, setPages] = useState(-1);
  const [change, setChange] = useState(false);

  const [start, setStart] = useState(moment(defaultDate.from));
  const [end, setEnd] = useStateWithCallback(moment(defaultDate.to), () => {
    if (change) {
      fetchData();
      setChange(false);
    }
  });

  const applyCallback = (startDate, endDate) => {
    setStart(startDate);
    setEnd(endDate);
    setChange(true);
  };

  const dateRangePicker = onChange => {
    return (
      <div>
        <br />
        <DateFilter start={start} end={end} applyCallback={applyCallback} />
      </div>
    );
  };

  const fetchData = state => {
    setloading(true);

    let filter = { page: 0, pageSize: 10, filtered: [] };
    if (state === undefined) {
      state = { page: 0, pageSize: 10, filtered: [] };
    }
    filter.page = state.page ? state.page + 1 : 1;

    filter.pageSize = state.pageSize ? state.pageSize : 10;

    filter.start = start._d;
    filter.end = end._d;

    if (state.filtered) {
      state.filtered.forEach(f => {
        filter[f.id] = f.value;
      });
    }

    GetLogsCall(filter).then(res => {
      setPages(res.data.pages);

      setLogs(res.data.message);

      setloading(false);
    });
  };

  var isAdmin = false;
  let myToken = localStorage.getItem("currentToken");

  var decoded = jwtDecode(myToken);
  if (decoded.isAdmin === true) {
    isAdmin = true;
  }

  if (isAdmin === false) {
    return <Redirect to="/admin/unauthorized" />;
  } else
    return (
      <div className="content">
        <Grid fluid>
          <Row style={{ marginBottom: 5 }}>
            <div className="col-md-12 pull-left">{dateRangePicker()}</div>
          </Row>
          <Row>
            <Col md={12}>
              <ReactTable
                data={logs}
                columns={[
                  {
                    Header: "Name",
                    accessor: "name",
                    filterable: true,
                    headerStyle: {
                      height: "40px",
                      backgroundColor: "lightblue"
                    }
                  },
                  {
                    Header: "Quantity",
                    accessor: "quantity",
                    headerStyle: {
                      height: "40px",
                      backgroundColor: "lightblue"
                    }
                  },
                  {
                    Header: "Action",
                    accessor: "action",
                    headerStyle: {
                      height: "40px",
                      backgroundColor: "lightblue"
                    }
                  },
                  {
                    Header: "Added By",
                    accessor: "updatedBy.name",
                    filterable: true,
                    headerStyle: {
                      height: "40px",
                      backgroundColor: "lightblue"
                    }
                  },
                  {
                    id: "createdAt",
                    Header: "Created At",
                    accessor: d => moment(d.createdAt).format("DD-MM-YYYY"),
                    // d.createdAt.split("T")[0],
                    headerStyle: {
                      height: "40px",
                      backgroundColor: "lightblue"
                    }
                  }
                ]}
                loading={loading}
                className=" -highlight"
                style={{ textAlign: "center" }}
                manual
                pages={pages}
                defaultPageSize={10}
                onFetchData={fetchData}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
}

export default ViewLogs;
