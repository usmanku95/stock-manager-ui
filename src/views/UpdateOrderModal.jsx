import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import useForm from "react-hook-form";
import { GetOrdersCall, UpdateOrderCall } from "api/api";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

toast.configure();

const UpdateOrderModal = ({
  show,
  setShow,
  selectedItem,
  handleClose,
  setOrders,
  itemName,
  emptyFilter
}) => {
  const [buttonDisable, setDisableButton] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    setDisableButton(true);
    let response = await UpdateOrderCall(
      data.orderStatus,

      selectedItem._id,
      localStorage.getItem("currentUser")
    );
    if (response) {
      setDisableButton(false);
      setShow(false);
    }

    if (response.error) {
      if (response.error.response.data.message) {
        toast.error(response.error.response.data.message);
        return;
      }
      toast.error(response.error.response.data);
    } else {
      toast.success("Order updated successfully.");

      GetOrdersCall(emptyFilter).then(res => {
        setOrders(res.data.message);
      });
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header style={{ textAlign: "center" }} closeButton>
        <Modal.Title>Change Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInputs
            ncols={["col-md-12"]}
            properties={[
              {
                label: "Item Name",
                type: "text",
                bsClass: "form-control",
                required: true,
                defaultValue: itemName,
                readOnly: true
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
                defaultValue: selectedItem.quantity,
                required: true,
                readOnly: true
              }
            ]}
          />

          <FormInputs
            ncols={["col-md-12"]}
            properties={[
              {
                label: "Client Name",
                type: "text",
                bsClass: "form-control",
                defaultValue: selectedItem.clientName,
                required: true,
                readOnly: true
              }
            ]}
          />

          <FormInputs
            ncols={["col-md-12"]}
            properties={[
              {
                label: "Comments",
                type: "text",
                bsClass: "form-control",
                defaultValue: selectedItem.comments,
                required: true,
                readOnly: true
              }
            ]}
          />

          <div className="form-group">
            <label forhtml="sel1">Order Status</label>
            <select
              name="orderStatus"
              ref={register({ required: true })}
              className="form-control"
              id="sel1"
            >
              <option value="">Select</option>

              <option value="pending">Pending</option>
              <option value="delievered">Delievered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {errors.orderStatus && (
              <span className="text-danger">Status is required.</span>
            )}
          </div>

          <div className="clearfix" />

          <Modal.Footer>
            <Button bsStyle="info" fill onClick={handleClose}>
              Close
            </Button>
            <Button
              disabled={errors.orderStatus || buttonDisable}
              bsStyle="primary"
              fill
              type="submit"
            >
              Save Changes
              {buttonDisable && <i className="fa fa-spin fa-spinner"></i>}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateOrderModal;
