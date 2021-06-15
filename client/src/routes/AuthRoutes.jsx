import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom'
import MainWrapper from '../components/MainWrapper'

//Views
import Nodes from '../views/Nodes'
import AddNode from '../views/AddNode'
import Blockchain from '../views/Blockchain'
import Transactions from '../views/Transactions'

const AuthRoutes = (props) => {
    return (
        <Switch>
            <MainWrapper>
                <Route path='/add-node' component={AddNode}/>
                <Route path='/nodes' component={Nodes}/>
                <Route path='/transactions' component={Transactions}/>
                <Route exact path='/' component={Blockchain}/>
            </MainWrapper>
        </Switch>
    );
};

export default AuthRoutes;