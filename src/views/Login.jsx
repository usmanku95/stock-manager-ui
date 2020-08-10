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

import {
  Grid,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Row,
  Form
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import { auth } from "../context/auth";
import { Redirect, Link } from "react-router-dom";

import React, { useState } from "react";
import { facebookAuthUrl } from "../api/api";
import qs from "qs";
import { useAuth } from "context/auth";

import { Formik } from "formik";
import EmailValidator from "email-validator";
import * as Yup from "yup";
import { login } from "../api/api";
import useForm from "react-hook-form";

function Login(props) {
  const { setAuthTokens, authTokens } = useAuth();
  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState(false);

  //react-hook-form npm package
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async values => {
    setLoading(true);
    setServerError(null);
    let response = await login(values.email, values.password);
    if (response) {
      setLoading(false);
    }

    if (response.error) {
      setServerError(response.error.response.data.message);
    } else {
      localStorage.setItem("currentUser", response.data.user._id);
      localStorage.setItem("currentUserName", response.data.user.name);

      localStorage.setItem("currentToken", response.data.user.token);

      setAuthTokens({ access_token: response.data.user.token });
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
                className="mt-25"
                title="Login"
                ctAllIcons
                content={
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <small className="text-danger">{serverError || null}</small>
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
                        name="password"
                        type="password"
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

                    <Button className="form-control" type="submit">
                      Login
                    </Button>
                    <div
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        marginTop: "5px"
                      }}
                    >
                      <Link
                        // className="form-control"
                        type="badge"
                        to="/account/register"
                      >
                        Need a new Account? Register
                      </Link>
                    </div>
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

export default Login;
