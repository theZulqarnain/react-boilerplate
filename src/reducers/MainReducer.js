import {DATALIST} from '../constants/index';
const INITIAL_STATE = {
    data_list:['first','second']
};
export default  (state=INITIAL_STATE,action) => {
    switch(action.type) {
        case DATALIST:
            return {...state,data_list:action.payload};
        default:
            return state;
    }
}
