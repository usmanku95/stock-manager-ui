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

import { Grid, Col, FormGroup, ControlLabel, Row, Form } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { Redirect, Link } from "react-router-dom";

import Button from "components/CustomButton/CustomButton.jsx";

import React, { useState } from "react"; //hook

import { useAuth } from "context/auth";

import { registerUser } from "../api/api";
import useForm from "react-hook-form";

function Register(props) {
  const { authTokens } = useAuth();
  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register, errors } = useForm(); //hook
  const onSubmit = async values => {
    setServerError(null);
    setLoading(true);

    let response = await registerUser(
      values.name,
      values.email,
      values.password
    );
    if (response) {
      setLoading(false);
    }
    if (response.error) {
      setServerError(response.error.response.data.errors.email);
    } else {
      props.history.push("/login");
      // return <Redirect path="/login" />;
      // window.location = "/login";

      // setAuthTokens({ access_token: response.data.user.token });
    }
  };

  return loading ? (
    <div className="preloader">
      {" "}
      <div className="loader"> </div>
    </div>
  ) : authTokens && authTokens.access_token ? (
    <Redirect to="/" />
  ) : (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={6} mdOffset={3}>
            <Col style={{ marginTop: "40px" }} md={7} sm={6} mdOffset={3}>
              <Card
                // className="w-150"

                // style={{ textAlign: "center" }}
                title="Register"
                ctAllIcons
                content={
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup
                      validationState={
                        errors.name && errors.name.message ? "error" : "success"
                      }
                    >
                      <ControlLabel>Name</ControlLabel>
                      <input
                        name="name"
                        ref={register({
                          required: "Required",
                          type: "text"
                        })}
                        placeholder="Enter your name"
                        className="form-control"
                      />

                      {errors.name && errors.name.message && (
                        <small className="text-danger">
                          {errors.name && errors.name.message}
                        </small>
                      )}
                    </FormGroup>
                    <FormGroup
                      validationState={
                        errors.email && errors.email.message
                          ? "error"
                          : "success"
                      }
                    >
                      <ControlLabel>Email address</ControlLabel>
                      <input
                        name="email"
                        ref={register({
                          required: "Required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "invalid email address"
                          }
                        })}
                        placeholder="Enter your email"
                        className="form-control"
                      />

                      {errors.email && errors.email.message && (
                        <small className="text-danger">
                          {errors.email && errors.email.message}
                        </small>
                      )}
                      <small className="text-danger">
                        {serverError || null}
                      </small>
                    </FormGroup>

                    <FormGroup
                      validationState={
                        errors.password && errors.password.message
                          ? "error"
                          : "success"
                      }
                    >
                      <ControlLabel>Password</ControlLabel>
                      <input
                        type="password"
                        name="password"
                        minLength="5"
                        ref={register({
                          required: "Required"
                        })}
                        placeholder="Enter your password"
                        className="form-control"
                      />

                      {errors.password && errors.password.message && (
                        <small className="text-danger">
                          {errors.password && errors.password.message}
                        </small>
                      )}
                    </FormGroup>

                    <Button
                      className="form-control "
                      bsStyle="info"
                      fill
                      type="submit"
                    >
                      Register
                    </Button>
                  </Form>
                }
              />
            </Col>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Register;
