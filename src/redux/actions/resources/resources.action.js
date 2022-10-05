import axios from "axios";
import AxiosInstance from "../../../utils/axios";
import { API_URL } from "../../../utils/url";
import { ResourceType } from "../../actionTypes/";
const { ADD_RESOURCE_REQUEST, ADD_RESOURCE_FAILURE, ADD_RESOURCE_SUCCESS } =
  ResourceType;

const token = window.localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
};

export const DeleteResource = (resourceID) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${API_URL}/delete-resource/${resourceID}`,
      config
    );
    res?.status && window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

// export const AddResourceAction = (form) => {
// 	return async (dispatch) => {
// 		dispatch({ type: ADD_RESOURCE_REQUEST });
// 		const response = await AxiosInstance.post(`/add-resource`, {
// 			...form,
// 		});

// 		// if (response?.status === 200) {
// 		// 	const { token, user } = response?.data;
// 		// 	localStorage.setItem('token', token);
// 		// 	localStorage.setItem('user', JSON.stringify(user));
// 		// 	dispatch({
// 		// 		type: GET_PRODUCT_SUCCESS,
// 		// 		payload: { token, user },
// 		// 	});
// 		// } else {
// 		// 	if (response.status === 400 || response.status === 404) {
// 		// 		dispatch({
// 		// 			type: GET_PRODUCT_FAILURE,
// 		// 			payload: { error: response.data.error },
// 		// 		});
// 		// 	}
// 		// }
// 		// const response = await AxiosInstance.post(`/product/create`, form);
// 		console.log(response);
// 	};
// };
