import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  SET_USER,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_ERROR,
  LOGOUT_USER,
  SET_LOADING,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  DELETE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  FETCH_ALL_JOBS_SUCCESS,
  FETCH_ALLL_JOBS_ERROR,
  FETCH_ALL_FAVORITES_SUCCESS,
  FETCH_ALLL_FAVORITES_ERROR,
  CREATE_FAVORITE_SUCCESS,
  CREATE_FAVORITE_ERROR,
  DELETE_FAVORITE_ERROR,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false, editComplete: false };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.name,
      userId: action.payload.id,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      user: null,
      showAlert: true,
    };
  }

  if (action.type === SET_USER) {
    return {
      ...state,
      user: action.payload.name,
      userId: action.payload.userId,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      userId: null,
      showAlert: false,
      jobs: [],
      favorites: [],
      isEditing: false,
      editItem: null,
    };
  }

  if (action.type === FETCH_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editItem: null,
      singleJobError: false,
      editComplete: false,
      jobs: action.payload,
    };
  }

  if (action.type === FETCH_ALL_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editItem: null,
      singleJobError: false,
      editComplete: false,
      allJobs: action.payload,
    };
  }
  if (action.type === FETCH_JOBS_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === FETCH_ALLL_JOBS_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: [...state.jobs, action.payload],
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }

  if (action.type === DELETE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }

  if (action.type === FETCH_SINGLE_JOB_SUCCESS) {
    return { ...state, isLoading: false, editItem: action.payload };
  }
  if (action.type === FETCH_SINGLE_JOB_ERROR) {
    return { ...state, isLoading: false, editItem: "", singleJobError: true };
  }

  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      editItem: action.payload,
    };
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      showAlert: true,
    };
  }

  if (action.type === FETCH_ALL_FAVORITES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editItem: null,
      singleJobError: false,
      editComplete: false,
      favorites: action.payload,
    };
  }

  if (action.type === FETCH_ALLL_FAVORITES_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === CREATE_FAVORITE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      favorites: [...state.favorites, action.payload],
    };
  }
  if (action.type === CREATE_FAVORITE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }

  if (action.type === DELETE_FAVORITE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }

  throw new Error(`no such action : ${action}`);
};

export default reducer;
