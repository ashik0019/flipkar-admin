import authReducer from "./auth.reducers";
import {combineReducers} from 'redux';
import userReducer from './user.reducers'
import productResucer from './product.reducers'
import orderReducer from './order.reducers'
import categoryReducer from './category.reducers'

const rootReducer = combineReducers({
    auth:authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productResucer,
    order: orderReducer

})

export default rootReducer;