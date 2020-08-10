import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import useForm from "react-hook-form";
import { GetItemCall, EditItemCall } from "api/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

toast.configure();

const EditItemModal = ({
  show,
  setShow,
  selectedItem,
  handleClose,
  setItems
}) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  let pageNo = 1;
  let pageSize = 10;
  let filtered = [];
  const onSubmit = async data => {
    setButtonDisable(true);
    let response = await EditItemCall(
      data.name.trim(),
      data.quantity,
      localStorage.getItem("currentUser"),
      selectedItem._id
    );

    if (response) {
      setShow(false);
      setButtonDisable(false);
    }
    if (response.error) {
      toast.error(response.error.response.data);
    } else {
      toast.success("Item edited successfully.");
      GetItemCall(pageNo, pageSize, filtered).then(res => {
        setItems(res.data.message);
      });
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header style={{ textAlign: "center" }} closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Item Name</label>

            <input
              className="form-control"
              name="name"
              ref={register({
                required: "Name is required.",
                validate: value =>
                  value.trim() !== "" || "White spaces are not allowed."
              })}
              defaultValue={selectedItem.name}
            />
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Quantity</label>

            <input
              className="form-control"
              name="quantity"
              type="number"
              ref={register({
                required: "Order quantity is required.",
                min: { value: 1, message: "Value must be greater than 0." }
              })}
              defaultValue={selectedItem.quantity}
            />
            {errors.quantity && (
              <span className="text-danger"> {errors.quantity.message}</span>
            )}
          </div>

          <div className="clearfix" />

          <Modal.Footer>
            <Button bsStyle="info" fill onClick={handleClose}>
              Close
            </Button>
            <Button
              disabled={errors.name || errors.quantity || buttonDisable}
              bsStyle="primary"
              fill
              type="submit"
            >
              Update Item
              {buttonDisable && <i className="fa fa-spin fa-spinner"></i>}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditItemModal;
