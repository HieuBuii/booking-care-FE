import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  doctors: [],
  allDoctors: [],
  infoDoctor: [],
  idDoctorDetail: "",
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.USER_LOGIN_SUCCESS:
    //   return {
    //     ...state,
    //     isLoggedIn: true,
    //     userInfo: action.userInfo,
    //   };
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.doctors = action.doctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.doctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.allDoctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_INFO_DOCTORS_SUCCESS:
      state.infoDoctor = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_INFO_DOCTORS_FAILED:
      state.infoDoctor = [];
      return {
        ...state,
      };

    // case actionTypes.SAVE_ID_DOCTOR:
    //   return {
    //     ...state,
    //     idDoctor: action.idDoctor,
    //   };

    default:
      return state;
  }
};

export default adminReducer;
