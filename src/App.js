
import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'

import './App.css';
import Nav from './components/Nav'
import LeaderBoard from './components/LeaderBoard'
import Home from './components/Home'
import Login from './components/Login'
import NewQuestion from './components/NewQuestion'
import { recieveIntialData } from './actions/shared';
import Poll from './components/Poll'
import Error404 from './components/Error404'

function App(props) {

    useEffect(() => {
        props.dispatch(recieveIntialData())
    });


    return (
        <Router>
            <div className="App">
                <LoadingBar />
                <Nav />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/login' component={Login} />
                    <Route path='/questions/:id' component={Poll} />
                    <Route component={Error404} />
                </Switch>
            </div>
        </Router>
    );
}

export default connect()(App);