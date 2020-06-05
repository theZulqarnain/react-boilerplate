import React,{Component} from 'react'
import {connect} from 'react-redux';
import {dataListHandler} from '../action';

const Main = (props) =>{
    let myData = [
        {name: 'Tom', Manager: 'Matt'},
        {name: 'Clint', Manager: 'Matt'},
        {name: 'Jack',  Manager: 'Tom'},
        {name: 'Donald',  Manager: 'Tom'},
        {name: 'Matt'}
    ]
    const genPositionList = () =>{
        let relation = {}
        myData.map((person,i) =>{
            if(!person.Manager){
                relation['root'] = person.name
            }else if(relation[person.Manager]){
                relation[person.Manager].push(person.name);
            } else {
                relation[person.Manager] = [];
                relation[person.Manager].push(person.name)
            }
        })
        console.log(relation)
        let users = [];
        const topLevel = Object.keys(relation);
        topLevel.map(key=>{

            users.push(<h2>{key}</h2>)
        })
        console.log(users,'user')
        return users;
        // for (let key in relation) {
        //     if(key === 'root'){
        //         users[0] = <h2>{relation[key]}</h2>
        //     } else {
        //
        //     }
        // }
    }
    return (
        <div className="Editor">
            {genPositionList()}
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        DataList:state.MainReducer.data_list
    }
}
export default connect(mapStateToProps,{dataListHandler})(Main);

// speciifiy
