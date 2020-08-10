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
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { AddItemCall } from "../api/api";
import { Redirect } from "react-router-dom";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
var jwtDecode = require("jwt-decode");

class AddItem extends Component {
  state = { name: "", quantity: 0, updatedBy: "", isAdmin: false };

  componentWillMount() {
    let myToken = localStorage.getItem("currentToken");

    var decoded = jwtDecode(myToken);
    if (decoded.isAdmin == true) {
      this.setState({ isAdmin: true });
    }
  }
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };
  handleQuantityChange = e => {
    this.setState({ quantity: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    //setServerError(null);
    let response = await AddItemCall(
      this.state.name.trim(),
      this.state.quantity,
      localStorage.getItem("currentUser")
    );
    if (response.error) {
      toast.error(response.error.response.data);

      // setServerError(response.error.response.data.message);
    } else {
      toast.success("Item added successfully.");
      //setAuthTokens({ access_token: response.data.user.token });
    }
  };
  render() {
    if (this.state.isAdmin == false) {
      return <Redirect to="/admin/unauthorized" />;
    } else
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={8}>
                <Card
                  title="Add Item"
                  content={
                    <form onSubmit={this.onSubmit}>
                      <FormInputs
                        ncols={["col-md-12"]}
                        properties={[
                          {
                            label: "Name",
                            type: "text",
                            bsClass: "form-control",
                            onChange: this.handleNameChange,
                            required: true
                          }
                        ]}
                      />

                      <FormInputs
                        ncols={["col-md-12"]}
                        properties={[
                          {
                            label: "Quantity",
                            type: "text",
                            bsClass: "form-control",
                            onChange: this.handleQuantityChange,
                            required: true
                          }
                        ]}
                      />
                      {/* <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Added by",
                          type: "text",
                          bsClass: "form-control",
                          onChange: this.handleAddedByChange
                        }
                      ]}
                    /> */}

                      <Button bsStyle="info" pullRight fill type="submit">
                        Add Item
                      </Button>
                      <div className="clearfix" />
                    </form>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
      );
  }
}

export default AddItem;
