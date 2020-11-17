import axios from "../helpers/axios";
import { categoryConstansts, initalDataConstants, productConstants } from "./constants"

export const getInitialData = () => {
    return async dispatch => {
        const res = await axios.post(`/initaldata`);
        if(res.status === 200) {
            console.log(res.data)
            const { categories, products } = res.data;
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            });
        }
        console.log(res)
    }
}