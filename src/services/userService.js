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

const getAllTimeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const saveScheduleService = (data) => {
  return axios.post("/api/save-schedule", data);
};

const getScheduleDoctorService = (doctorId, date) => {
  return axios.get(`/api/schedule-doctor?doctorId=${doctorId}&date=${date}`);
};

const deleteScheduleDoctorService = (scheduleId) => {
  return axios.delete("/api/delete-schedule-doctor", {
    data: { id: scheduleId },
  });
};

const getExtraDoctorInfoService = (doctorId) => {
  return axios.get(`/api/extra-doctor-info?doctorId=${doctorId}`);
};

const savePatientBooking = (data) => {
  return axios.post("/api/patient-booking", data);
};

const postVerifyPatientBooking = (data) => {
  return axios.post("/api/verify-patient-booking", data);
};

const saveSpecialtyService = (data) => {
  return axios.post("/api/create-specialty", data);
};

const getAllSpecialties = () => {
  return axios.get(`/api/get-all-specialty`);
};

const editSpecialtyService = (data) => {
  return axios.put("/api/edit-specialty", data);
};

const deleteSpecialtyService = (specialtyId) => {
  return axios.delete("/api/delete-specialty", { data: { id: specialtyId } });
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
  getAllTimeService,
  saveScheduleService,
  getScheduleDoctorService,
  getExtraDoctorInfoService,
  savePatientBooking,
  postVerifyPatientBooking,
  saveSpecialtyService,
  getAllSpecialties,
  editSpecialtyService,
  deleteSpecialtyService,
  deleteScheduleDoctorService,
};
