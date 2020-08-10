import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Modal } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import useForm from "react-hook-form";
import { GetItemCall, CreateOrderCall } from "api/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

toast.configure();

const OrderItemModal = ({
  showOrderModal,
  selectedItem,
  handleClose,
  setItems,
  setShowOrderModal
}) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  let pageNo = 1;
  let pageSize = 10;
  let filtered = [];
  const handleOrderSubmit = async data => {
    setButtonDisable(true);
    let response = await CreateOrderCall(
      selectedItem._id,
      data.clientName,
      data.orderQuantity,
      data.comments,
      localStorage.getItem("currentUser")
    );
    if (response) {
      setShowOrderModal(false);
      setButtonDisable(false);
    }
    if (response.error) {
      if (response.error.response.data.message) {
        toast.error(response.error.response.data.message);
        return;
      }
      toast.error(response.error.response.data);
    } else {
      toast.success("Order created successfully.");
      GetItemCall(pageNo, pageSize, filtered).then(res => {
        setItems(res.data.message);
      });
    }
  };
  return (
    <Modal show={showOrderModal} onHide={handleClose}>
      <Modal.Header style={{ textAlign: "center" }} closeButton>
        <Modal.Title>Order Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleOrderSubmit)}>
          <FormInputs
            ncols={["col-md-12"]}
            properties={[
              {
                label: "Item Name",
                type: "text",
                bsClass: "form-control",
                required: true,
                defaultValue: selectedItem.name,
                readOnly: true
              }
            ]}
          />

          <div className="form-group">
            <label>Quantity</label>

            <input
              className="form-control"
              name="orderQuantity"
              type="number"
              ref={register({
                required: "Order quantity is required.",
                min: { value: 1, message: "Value must be greater than 0" }
              })}
            />
            {errors.orderQuantity && (
              <span className="text-danger">
                {" "}
                {errors.orderQuantity.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Client Name</label>

            <input
              className="form-control"
              name="clientName"
              ref={register({
                required: "Client name is required.",
                validate: value =>
                  value.trim() !== "" || "White spaces are not allowed"
              })}
            />
            {errors.clientName && (
              <span className="text-danger">{errors.clientName.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Comments</label>

            <input
              className="form-control"
              name="comments"
              ref={register({
                required: "Comments are required.",
                validate: value =>
                  value.trim() !== "" || "White spaces are not allowed"
              })}
            />
            {errors.comments && (
              <span className="text-danger">{errors.comments.message}</span>
            )}
          </div>

          <div className="clearfix" />

          <Modal.Footer>
            <Button bsStyle="info" fill onClick={handleClose}>
              Close
            </Button>
            <Button
              disabled={
                errors.comments || errors.orderQuantity || buttonDisable
              }
              bsStyle="primary"
              fill
              type="submit"
            >
              Place Order
              {buttonDisable && <i className="fa fa-spin fa-spinner"></i>}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderItemModal;
