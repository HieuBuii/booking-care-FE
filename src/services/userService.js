import axios from "../axios";
const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (userId) => {
  return axios.get(`/api/get-all-users?id=${userId}`);
};

const addUserService = (data) => {
  return axios.post("/api/create-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorForHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorService = () => {
  return axios.get(`/api/get-all-doctocs`);
};

const saveInfoDoctorService = (data) => {
  return axios.post(`/api/creat-info-doctor`, data);
};

const getInfoDoctorService = (id) => {
  return axios.get(`/api/get-info-doctor?id=${id}`);
};

export {
  handleLoginApi,
  getAllUsers,
  addUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorForHomeService,
  getAllDoctorService,
  saveInfoDoctorService,
  getInfoDoctorService,
};
