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
import React, { useState, useEffect } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { GetOrdersCall } from "api/api";
import { toast } from "react-toastify";
import moment from "moment";
import DateFilter from "./DateFilter";

import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ReactTable from "react-table-6";
import useStateWithCallback from "use-state-with-callback";
import UpdateOrderModal from "./UpdateOrderModal";
import { get24hours } from "./utils/helper";

var jwtDecode = require("jwt-decode");

toast.configure();
let defaultDate = get24hours();

var emptyFilter = {
  page: 1,
  pageSize: 10,
  filtered: []
};

function CreateOrder() {
  const [isAdmin, setAdmin] = useState(false);
  const [itemName, setItemName] = useState("");
  const [loading, setloading] = useState(false);
  const [pages, setPages] = useState(-1);

  const [filterOrder, setFilterOrder] = useStateWithCallback("", () => {
    if (filterChanged) {
      // filter.orderStatus = filterOrder;

      let newFilter = { ...filterObj };
      newFilter.orderStatus = filterOrder;

      // fetchData();

      GetOrdersCall(newFilter).then(res => {
        setPages(res.data.pages);

        setOrders(res.data.message);

        setloading(false);
      });
      setFilterChanged(false);
    }
  });

  const [change, setChange] = useState(false);
  const [filterChanged, setFilterChanged] = useState(false);

  const [filterObj, setFilterObj] = useState({});
  // const [filterClient, setFilterClient] = useState("");

  const [start, setStart] = useState(moment(defaultDate.from));
  const [end, setEnd] = useStateWithCallback(moment(defaultDate.to), () => {
    if (change) {
      fetchData();
      setChange(false);
    }
  });

  emptyFilter.start = start._d;
  emptyFilter.end = end._d;

  const [orders, setOrders] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const [show, setShow] = useState(false);

  useEffect(() => {
    let myToken = localStorage.getItem("currentToken");

    var decoded = jwtDecode(myToken);
    if (decoded.isAdmin === true) {
      setAdmin(true);
    }
    setloading(true);

    GetOrdersCall(emptyFilter).then(res => {
      setOrders(res.data.message);
      if (res) {
        setloading(false);
      }
    });
  }, []);
  const handleShow = props => {
    // GetSelectedOrder(e.target.id).then(res => {
    setSelectedItem(props.original);
    setItemName(props.original.item.name);
    setShow(true);
    // });
  };
  const handleClose = () => {
    setShow(false);
  };

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

  const onFiltersChange = data => {
    setFilterChanged(true);
    setFilterOrder(data);
  };

  const fetchData = (state, instance) => {
    setloading(true);
    var filter = { page: 0, pageSize: 10, filtered: [] };

    if (state === undefined) {
      state = { page: 0, pageSize: 10, filtered: [] };
    }
    filter.page = state.page ? state.page + 1 : 1;

    filter.pageSize = state.pageSize ? state.pageSize : 10;

    filter.orderStatus = filterOrder;

    filter.start = start._d;
    filter.end = end._d;
    if (state.filtered) {
      state.filtered.forEach(f => {
        filter[f.id] = f.value;
      });
    }

    // if (filter["item.name"]) {
    //   setFilterName(filter["item.name"]);
    // }
    // if (filter.clientName) {
    //   setFilterClient(filter.clientName);
    // }
    // filter["item.name"] = filterName;
    // filter.clientName = filterClient;

    setFilterObj(filter);

    GetOrdersCall(filter).then(res => {
      setPages(res.data.pages);

      setOrders(res.data.message);

      setloading(false);
    });

    // GetOrdersCall(++state.page, state.pageSize, state.filtered).then(res => {
    //   setPages(res.data.pages);

    //   setOrders(res.data.message);

    //   setloading(false);
    // });
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row style={{ marginBottom: 5 }}>
          <div className="col-md-12 pull-left">{dateRangePicker()}</div>
        </Row>
        <Row>
          <Col md={12}>
            <ReactTable
              data={orders}
              pages={pages}
              header
              columns={[
                {
                  Header: "Name",
                  accessor: "item.name",
                  filterable: true,
                  headerStyle: { height: "40px", backgroundColor: "lightblue" }
                },
                {
                  Header: "Quantity",
                  accessor: "quantity",
                  headerStyle: { height: "40px", backgroundColor: "lightblue" }
                },
                {
                  Header: "Ordered By",
                  accessor: "updatedBy.name",
                  headerStyle: { height: "40px", backgroundColor: "lightblue" }
                },
                {
                  Header: "Client",
                  accessor: "clientName",
                  filterable: true,
                  headerStyle: { height: "40px", backgroundColor: "lightblue" }
                },
                {
                  Header: "Status",
                  accessor: "orderStatus",
                  Filter: cellInfo => {
                    return (
                      <select
                        onChange={event => onFiltersChange(event.target.value)}
                        value={filterOrder}
                      >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="delievered">Delievered</option>
                        <option value="cancelled">Cancelled</option>
                        {/* <option value="null">All</option> */}
                      </select>
                    );
                  },

                  filterable: true,
                  headerStyle: { height: "40px", backgroundColor: "lightblue" }
                },
                {
                  id: "createdAt",
                  Header: "Created At",
                  accessor: d => moment(d.createdAt).format("DD-MM-YYYY"),
                  // d.createdAt.split("T")[0],
                  headerStyle: { height: "40px", backgroundColor: "lightblue" }
                },
                {
                  Header: "Edit Order",
                  show: isAdmin,
                  headerStyle: { height: "40px", backgroundColor: "lightblue" },

                  // accessor: "orderStatus"
                  Cell: props => {
                    if (props.original.orderStatus !== "cancelled") {
                      return (
                        <Button
                          id={props.original._id}
                          onClick={() => handleShow(props)}
                          bsStyle="info"
                          // fill
                          simple
                          icon="true"
                        >
                          <i
                            id={props.original._id}
                            className="fa fa-edit "
                          ></i>
                        </Button>
                      );
                    } else
                      return (
                        <Button simple icon="true">
                          <i>Order Cancelled</i>
                        </Button>
                      );
                  }
                }
              ]}
              style={{ textAlign: "center" }}
              loading={loading}
              manual
              className=" -highlight"
              defaultPageSize={10}
              resolveData={data => data.map(row => row)}
              onFetchData={fetchData}
            />
          </Col>
        </Row>
      </Grid>

      <UpdateOrderModal
        itemName={itemName}
        setShow={setShow}
        show={show}
        handleClose={handleClose}
        setOrders={setOrders}
        selectedItem={selectedItem}
        emptyFilter={emptyFilter}
      />
    </div>
  );
}

export default CreateOrder;
