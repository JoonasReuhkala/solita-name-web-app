import Axios from "axios";

const apiInteractor = {
  seedAndGetEmployeeAll: async (apiEndpoint, _key) =>
    await Axios.get(apiEndpoint + "/seed", { params: { userKey : _key } })
    .then(response => response.data),

  getEmployeeAll: async (apiEndpoint, _key) =>
    await Axios.get(apiEndpoint, { params: { userKey : _key } })
    .then(response => response.data),

  addEmployee: async (apiEndpoint, _key) =>
    await Axios.post(apiEndpoint, { body: { userKey : _key } })
    .then(response => response.data),

  removeEmployee: async(apiEndpoint, _key) =>
    await Axios.delete(apiEndpoint, { params: { userKey : _key } })
    .then(response => response.data),

  getEmployeeTotalAmount: async(apiEndpoint, _key) =>
    await Axios.get(apiEndpoint + "/totalAmountOf", { params: { userKey : _key } })
    .then(response => response.data),

  findEmployeeByName: async(apiEndpoint, name, _key) =>
    await Axios.get(apiEndpoint + "/" + name, { params: { userKey : _key } })
    .then(response => response.data),
}

export default apiInteractor;