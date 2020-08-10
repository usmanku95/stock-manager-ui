import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import useForm from "react-hook-form";
import { GetItemCall, AddItemCall } from "api/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

toast.configure();

const AddItemModal = ({
  showAddModal,
  setShowAddModal,
  handleClose,
  setItems
}) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  let pageNo = 1;
  let pageSize = 10;
  let filtered = [];

  const handleAddSubmit = async data => {
    setButtonDisable(true);
    let response = await AddItemCall(
      data.nameToAdd.trim(),
      data.quantityToAdd,
      localStorage.getItem("currentUser")
    );

    if (response) {
      setShowAddModal(false);
      setButtonDisable(false);
    }
    if (response.error) {
      toast.error(response.error.response.data);
    } else {
      GetItemCall(pageNo, pageSize, filtered).then(res => {
        setItems(res.data.message);
      });
      toast.success("Item added successfully.");
    }
  };
  return (
    <Modal show={showAddModal} onHide={handleClose}>
      <Modal.Header style={{ textAlign: "center" }} closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleAddSubmit)}>
          <div className="form-group">
            <label>Item Name</label>

            <input
              className="form-control"
              name="nameToAdd"
              ref={register({
                required: "Name is required.",
                validate: value =>
                  value.trim() !== "" || "White spaces are not allowed."
              })}
            />
            {errors.nameToAdd && (
              <span className="text-danger">{errors.nameToAdd.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Quantity</label>

            <input
              className="form-control"
              name="quantityToAdd"
              type="number"
              ref={register({
                required: "Quantity is required.",
                min: { value: 1, message: "Value must be greater than 0." }
              })}
            />
            {errors.quantityToAdd && (
              <span className="text-danger">
                {" "}
                {errors.quantityToAdd.message}
              </span>
            )}
          </div>

          <div className="clearfix" />

          <Modal.Footer>
            <Button bsStyle="info" fill onClick={handleClose}>
              Close
            </Button>
            <Button
              disabled={
                errors.nameToAdd || errors.quantityToAdd || buttonDisable
              }
              bsStyle="primary"
              fill
              type="submit"
            >
              Add Item
              {buttonDisable && <i className="fa fa-spin fa-spinner"></i>}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddItemModal;
