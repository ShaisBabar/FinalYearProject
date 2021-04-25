import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../config';
import {
	SET_CURRENT_USER,
	UPDATE_CURRENT_USER,
	SET_TOKEN,
	SET_LOADING,
	SET_ERROR,
	LOGIN,
	LOGOUT,
	SIGNUP,
	GET_RECORDS,
} from '../types';

export const signup = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_LOADING, payload: true });
		await axios.post('http://192.168.0.110:5000/users/adduser', data).then((res)=>{
			AsyncStorage.setItem('@Token', res.data.token);
			dispatch({ type: SIGNUP, payload: res.data.token });
			dispatch({ type: SET_CURRENT_USER, payload: res.data.user });
		})
		
	} catch (err) {
		console.log(err);
		dispatch({ type: SET_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const login = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_LOADING, payload: true });
		await axios.post('http://192.168.0.110:5000/users/loginuser', data).then((res)=>{
			AsyncStorage.setItem('@Token', res.data.token);
		    dispatch({ type: LOGIN, payload: res.data.token });
			dispatch({ type: SET_CURRENT_USER, payload: res.data.user });
		})
	} catch (err) {
		console.log(err);
		dispatch({ type: SET_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const logout = () => ({ type: LOGOUT });
