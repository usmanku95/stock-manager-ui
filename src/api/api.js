//help https://stackoverflow.com/questions/49500379/typical-file-structure-in-reactjs-application-grouping-api-calls-in-api-js
import axios from "axios";
import resolve from "./resolve";

let apiBaseUrl = process.env.REACT_APP_API_BASEURL;

const testAuth = async () => {
  return await resolve(
    axios.get(`${apiBaseUrl}/profile`).then(res => res.data)
  );
};
const login = async (email, password) => {
  return await resolve(
    axios
      .post(`${apiBaseUrl}/api/auth/login`, {
        user: {
          email,
          password
        }
      })
      .then(res => res.data)
  );
};

//mimee
const registerUser = async (name, email, password) => {
  return await resolve(
    axios
      .post(`${apiBaseUrl}/api/auth/register`, {
        user: {
          name,
          email,
          password
        }
      })
      .then(res => res.data)
  );
};
//Item api calls

const AddItemCall = async (name, quantity, updatedBy) => {
  return await resolve(
    axios
      .post(`${apiBaseUrl}/api/items`, {
        name,
        quantity,
        updatedBy
      })
      .then(res => res.data)
  );
};

const EditItemCall = async (name, quantity, updatedBy, selectedItem) => {
  return await resolve(
    axios
      .put(`${apiBaseUrl}/api/items/${selectedItem}`, {
        name,
        quantity,
        updatedBy
      })
      .then(res => res.data)
  );
};

const GetItemCall = async (pageNo, pageSize, filtered) => {
  var filterName = "";
  var filterUserName = "";

  if (filtered.length) {
    var filterLog = { name: "", "updatedBy.name": "" };
    filtered.forEach(element => {
      filterLog[element.id] = element.value;
    });
    filterName = filterLog.name;
    filterUserName = filterLog["updatedBy.name"];
  }
  return await resolve(
    axios
      .get(
        `${apiBaseUrl}/api/items?pageNo=${pageNo}&size=${pageSize}&filterName=${filterName}&filterUserName=${filterUserName}`
      )
      .then(res => res.data)
  );
};

const GetSelectedItem = async itemId => {
  return await resolve(
    axios.get(`${apiBaseUrl}/api/items/${itemId}`).then(res => res.data)
  );
};

const DeleteItem = async itemId => {
  return await resolve(
    axios.delete(`${apiBaseUrl}/api/items/${itemId}`).then(res => res.data)
  );
};

//Order Api Calls

const CreateOrderCall = async (
  itemId,
  clientName,
  orderQuantity,
  comments,
  updatedBy
) => {
  return await resolve(
    axios
      .post(`${apiBaseUrl}/api/orders`, {
        itemId,
        clientName,
        orderQuantity,
        comments,
        updatedBy
      })
      .then(res => res.data)
  );
};

const GetOrdersCall = async filter => {
  var filterName = "";
  var filterClient = "";
  var filterStatus = "";

  // console.log(filter, "filter in api");

  if (filter["item.name"]) {
    filterName = filter["item.name"];
  }
  if (filter.clientName) {
    filterClient = filter.clientName;
  }
  if (filter.orderStatus === undefined) {
    filter.orderStatus = "";
  }

  return await resolve(
    axios
      .get(
        `${apiBaseUrl}/api/orders?pageNo=${filter.page}&size=${filter.pageSize}&filterName=${filterName}&filterClient=${filterClient}&filterStatus=${filter.orderStatus}&startDate=${filter.start}&endDate=${filter.end}`
      )
      .then(res => res.data)
  );
};

const GetSelectedOrder = async orderId => {
  return await resolve(
    axios.get(`${apiBaseUrl}/api/orders/${orderId}`).then(res => res.data)
  );
};

const UpdateOrderCall = async (orderStatus, selectedItem, updatedBy) => {
  return await resolve(
    axios
      .put(`${apiBaseUrl}/api/orders/${selectedItem}`, {
        orderStatus,
        updatedBy
      })
      .then(res => res.data)
  );
};

//Logs api calls

const GetLogsCall = async filter => {
  var filterName = "";
  var filterUserName = "";
  // console.log(start, end, filtered, pageNo, pageSize, "start in api");

  if (filter.name) {
    filterName = filter.name;
  }
  if (filter["updatedBy.name"]) {
    filterUserName = filter["updatedBy.name"];
  }

  return await resolve(
    axios
      .get(
        `${apiBaseUrl}/api/logs?pageNo=${filter.page}&size=${filter.pageSize}&filterName=${filterName}&filterUserName=${filterUserName}&startDate=${filter.start}&endDate=${filter.end}`
      )
      .then(res => res.data)
  );
};

export {
  testAuth,
  login,
  registerUser,
  AddItemCall,
  GetItemCall,
  GetSelectedItem,
  EditItemCall,
  DeleteItem,
  CreateOrderCall,
  GetOrdersCall,
  GetSelectedOrder,
  UpdateOrderCall,
  GetLogsCall
};
