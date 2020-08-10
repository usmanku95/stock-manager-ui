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
import { Grid, Row, Col, Modal } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { GetItemCall, DeleteItem } from "api/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTable from "react-table-6";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import OrderItemModal from "./OrderItemModal";
import EditItemModal from "./EditItemModal";
import AddItemModal from "./AddItemModal";
import moment from "moment";

var jwtDecode = require("jwt-decode");

toast.configure();

function TableList() {
  const [items, setItems] = useState([]);
  const [loading, setloading] = useState(false);
  const [pages, setPages] = useState(-1);

  const [buttonDisable, setButtonDisable] = useState(false);

  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState([{ item: { name: "" } }]);

  let pageNo = 1;
  let pageSize = 10;
  let filtered = [];

  let myToken = localStorage.getItem("currentToken");
  var isAdmin = false;
  var decoded = jwtDecode(myToken);
  if (decoded.isAdmin === true) {
    isAdmin = true;
  }
  useEffect(() => {
    setloading(true);

    GetItemCall(pageNo, pageSize, filtered).then(res => {
      setItems(res.data.message);
      setloading(false);
    });
  }, []);

  const handleShow = props => {
    setButtonDisable(true);
    setSelectedItem(props.original);
    setShow(true);
    setButtonDisable(false);
  };
  const handleOrder = props => {
    setButtonDisable(true);
    setSelectedItem(props.original);
    // GetSelectedItem(props.original._id).then(res => {
    //   setSelectedItem(res.data);
    setShowOrderModal(true);
    setButtonDisable(false);
    // });
  };
  const handleAddItem = e => {
    setButtonDisable(true);
    setShowAddModal(true);
    setButtonDisable(false);
  };

  const handleClose = () => {
    setShowAddModal(false);
    setShowOrderModal(false);
    setShow(false);
  };

  const handleDelete = e => {
    setButtonDisable(true);
    DeleteItem(e.target.id).then(res => {
      if (res.error) {
        toast.error("Item not deleted .");
      } else {
        toast.success("Item deleted successfully.");
        GetItemCall(pageNo, pageSize, filtered).then(res => {
          setItems(res.data.message);
        });
      }
    });
    setButtonDisable(false);
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row style={{ marginBottom: "20px", marginLeft: "1px" }}>
          {isAdmin === true && (
            <Button onClick={handleAddItem} bsStyle="info" fill>
              <i className="fa fa-plus"></i>
              Add Item
            </Button>
          )}
        </Row>
        <Row>
          <Col md={12}>
            <ReactTable
              data={items}
              pages={pages}
              className=" -highlight"
              columns={[
                {
                  Header: "Name",
                  accessor: "name",
                  filterable: true,
                  headerStyle: { height: "40px", backgroundColor: "lightblue" }
                },
                {
                  Header: "Quantity",
                  accessor: "quantity",
                  headerStyle: { height: "40px", backgroundColor: "lightblue" }
                },
                {
                  Header: "Added By",
                  accessor: "updatedBy.name",
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
                  Header: "Actions",
                  headerStyle: { height: "40px", backgroundColor: "lightblue" },
                  Cell: props => {
                    return (
                      <>
                        <Button
                          disabled={buttonDisable}
                          id={props.original._id}
                          onClick={() => handleOrder(props)}
                          bsStyle="primary"
                          // simple
                          // icon="true"
                          fill
                        >
                          <i
                            id={props.original._id}
                            className="pe-7s-hammer"
                          ></i>
                        </Button>
                        {isAdmin === true && (
                          <Button
                            disabled={buttonDisable}
                            style={{ marginLeft: "5px" }}
                            id={props.original._id}
                            onClick={() => handleShow(props)}
                            bsStyle="info"
                            // simple
                            // icon="true"
                            fill
                          >
                            <i
                              id={props.original._id}
                              className="fa fa-edit"
                            ></i>
                          </Button>
                        )}
                        {isAdmin === true && (
                          <Button
                            style={{ marginLeft: "5px" }}
                            disabled={buttonDisable}
                            id={props.original._id}
                            onClick={handleDelete}
                            bsStyle="danger"
                            // simple
                            // icon="true"
                            fill
                          >
                            <i
                              id={props.original._id}
                              className="pe-7s-trash"
                            ></i>
                          </Button>
                        )}
                      </>
                    );
                  }
                }
              ]}
              style={{ textAlign: "center" }}
              loading={loading}
              manual
              defaultPageSize={10}
              resolveData={data => data.map(row => row)}
              onFetchData={(state, instance) => {
                setloading(true);

                GetItemCall(++state.page, state.pageSize, state.filtered).then(
                  res => {
                    setPages(res.data.pages);

                    setItems(res.data.message);

                    setloading(false);
                  }
                );
              }}
            />
          </Col>
        </Row>
      </Grid>

      {/* //Order Item Modal */}
      <OrderItemModal
        showOrderModal={showOrderModal}
        selectedItem={selectedItem}
        handleClose={handleClose}
        setShowOrderModal={setShowOrderModal}
        setItems={setItems}
      />
      {/* //Edit Item MOdal */}
      <EditItemModal
        show={show}
        selectedItem={selectedItem}
        handleClose={handleClose}
        setShow={setShow}
        setItems={setItems}
      />

      {/* //Add Item Modal */}
      <AddItemModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        handleClose={handleClose}
        setItems={setItems}
      />
    </div>
  );
}

export default TableList;
