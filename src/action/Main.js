import {DATALIST} from '../constants'
export function dataListHandler(value){
    return function(dispatch){
        dispatch({type:DATALIST,payload:value})
    }
}