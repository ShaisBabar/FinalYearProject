import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../config';
import {
	SET_CURRENT_USER,
	UPDATE_CURRENT_USER,
	SET_UPDATE_LOADING,
	SET_ERROR,
	GET_RECORDS,
} from '../types';
import {user} from '../reducers/mainRecords'
import { useReducer } from 'react';
export const getUser = () => async (dispatch) => {
	try {
		dispatch({ type: SET_UPDATE_LOADING, payload: true });
		// //console.log(AsyncStorage.getItem('@Token'),"ppppppp");
		const res = await axios.get('http://localhost:5000/users/getuserbyid/'+AsyncStorage.getItem('@Token'));
		dispatch({ type: SET_CURRENT_USER, payload: res.data });
	} catch (err) {
		dispatch({ type: SET_UPDATE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data.msg });
	}
};

export const updateUser = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_UPDATE_LOADING, payload: true });
		const res = await axios.put('/barber', data);
		dispatch({ type: UPDATE_CURRENT_USER, payload: res.data });
	} catch (err) {
		//console.log('object', err.response.data);
		dispatch({ type: SET_UPDATE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const getRecords = (id) => async (dispatch) => {
	try {
		dispatch({ type: SET_UPDATE_LOADING, payload: true });
		//console.log("csncsjhcnjshcnjs");
		//console.log('http://localhost:5000/jobs/jobsbyuser/'+id)
		const res = await axios.get('http://localhost:5000/jobs/jobsbyuser/5fe35d0e7470565804d16cbc');
		dispatch({ type: GET_RECORDS, payload: res.data });
	} catch (err) {
		dispatch({ type: SET_UPDATE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data.msg });
	}
};
