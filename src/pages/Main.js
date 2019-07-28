import React,{Component} from 'react'
import {connect} from 'react-redux';
import {dataListHandler} from '../action';

const Main = (props) =>{
    console.log(props.DataList)
    const dataListPass = () =>{
        console.log("enter");
        props.dataListHandler(['third','fourth'])
    }
    return (
        <div className="Editor">
            <h2>Dhad Editor</h2>
            <div 
                contentEditable={true} 
                suppressContentEditableWarning={true} 
                spellCheck="false" 
                className="dhad_editor"
            >
                Please write something
            </div>
            <button onClick={()=>dataListPass()}>submit</button>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        DataList:state.MainReducer.data_list
    }
}
export default connect(mapStateToProps,{dataListHandler})(Main);