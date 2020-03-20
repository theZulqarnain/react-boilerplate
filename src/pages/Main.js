import React,{Component} from 'react'
import {connect} from 'react-redux';
import {dataListHandler} from '../action';

const Main = (props) =>{

    return (
        <div className="Editor">
            <h1>This is header of Apollo</h1>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        DataList:state.MainReducer.data_list
    }
}
export default connect(mapStateToProps,{dataListHandler})(Main);
