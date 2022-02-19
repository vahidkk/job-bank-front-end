import axios from "axios";
import "../axios";
import React, { useContext, useEffect, useReducer } from "react";
import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  SET_USER,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_ERROR,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  DELETE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  FETCH_ALL_JOBS_SUCCESS,
  FETCH_ALLL_JOBS_ERROR,
  FETCH_ALL_FAVORITES_SUCCESS,
  FETCH_ALLL_FAVORITES_ERROR,
  CREATE_FAVORITE_SUCCESS,
  CREATE_FAVORITE_ERROR,
  DELETE_FAVORITE_ERROR,
} from "./actions";
import reducer from "./reducer";

const initialState = {
  user: null,
  isLoading: false,
  jobs: [],
  allJobs: [],
  favorites: [],
  showAlert: false,
  editItem: null,
  singleJobError: false,
  editComplete: false,
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // register
  const register = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/auth/register`, {
        ...userInput,
      });

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name });
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR });
    }
  };

  // login
  const login = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/auth/login`, {
        ...userInput,
      });
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          userId: data.user.id,
          token: data.token,
        })
      );
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR });
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT_USER });
  };

  // fetch jobs
  const fetchJobs = async () => {
    setLoading();
    try {
      const { data } = await axios.get(`/jobs`);
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs });
    } catch (error) {
      dispatch({ type: FETCH_JOBS_ERROR });
      logout();
    }
  };
  //fetch ALL jobs ( by any user tobe shown on home page)
  const fetchAllJobs = async () => {
    setLoading();
    try {
      const { data } = await axios.get(`/jobs/all-jobs`);
      dispatch({ type: FETCH_ALL_JOBS_SUCCESS, payload: data.jobs });
    } catch (error) {
      dispatch({ type: FETCH_ALLL_JOBS_ERROR });
      // logout()
    }
  };

  // create job
  const createJob = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/jobs`, {
        ...userInput,
      });

      dispatch({ type: CREATE_JOB_SUCCESS, payload: data.job });
    } catch (error) {
      dispatch({ type: CREATE_JOB_ERROR });
    }
  };
  const deleteJob = async (jobId) => {
    setLoading();
    try {
      await axios.delete(`/jobs/${jobId}`);

      fetchJobs();
      fetchAllJobs();
    } catch (error) {
      dispatch({ type: DELETE_JOB_ERROR });
    }
  };

  const fetchSingleJob = async (jobId) => {
    setLoading();
    try {
      const { data } = await axios.get(`/jobs/${jobId}`);
      dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data.job });
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_JOB_ERROR });
    }
  };
  const editJob = async (jobId, userInput) => {
    setLoading();
    try {
      const { data } = await axios.patch(`/jobs/${jobId}`, {
        ...userInput,
      });
      dispatch({ type: EDIT_JOB_SUCCESS, payload: data.job });
    } catch (error) {
      dispatch({ type: EDIT_JOB_ERROR });
    }
  };

  //fetch all favorites by current user :
  const fetchAllFavorites = async () => {
    setLoading();
    try {
      const { data } = await axios.get(`/favorites`);
      dispatch({ type: FETCH_ALL_FAVORITES_SUCCESS, payload: data.favorites });
    } catch (error) {
      dispatch({ type: FETCH_ALLL_FAVORITES_ERROR });
      // logout()
    }
  };
  const createFavorite = async (favoriteJobId) => {
    setLoading();
    try {
      const { data } = await axios.post(`/favorites`, {
        jobId: favoriteJobId,
      });
      fetchAllFavorites();

      dispatch({ type: CREATE_FAVORITE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_FAVORITE_ERROR });
    }
  };
  const deleteFavorite = async (favoriteJobId) => {
    setLoading();
    try {
      await axios.delete(`/favorites/${favoriteJobId}`);
      // await axios.delete(`/favorites/620b6e4269cb77a477b01542`);
      fetchAllFavorites();
    } catch (error) {
      dispatch({ type: DELETE_FAVORITE_ERROR });
    }
  };

  // const deleteJob = async (jobId) => {
  //   setLoading();
  //   try {
  //     await axios.delete(`/jobs/${jobId}`);

  //     fetchJobs();
  //   } catch (error) {
  //     dispatch({ type: DELETE_JOB_ERROR });
  //   }
  // };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const newUser = JSON.parse(user);
      dispatch({ type: SET_USER, payload: newUser });
    }
  }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        register,
        login,
        logout,
        fetchJobs,
        createJob,
        deleteJob,
        fetchSingleJob,
        editJob,
        fetchAllJobs,
        fetchAllFavorites,
        createFavorite,
        deleteFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
