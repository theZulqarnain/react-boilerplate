import React from 'react';
import {BrowserRouter as Router, Route,} from 'react-router-dom';

// import Header from '../components/Header';
import Main from '../pages/Main'
import {
    connect
} from "react-redux";
// import {splash,Steps,Reset}  from "../actions"

const AppRouter = (props) => {
    
    return(
            <div>
                {/* <Header /> */}
                <Route path='/' component={Main} />
            </div>
        
    )
}
// const mapStateToProps = (state) => {
//     return {splashState:state.Main.splash}
// }
// export default connect(mapStateToProps,{splash,Steps,Reset})(AppRouter);
export default AppRouter;
