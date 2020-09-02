import React, {Component} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from 'react-redux'
import {keepLogin, checkLocalStorage} from './REDUX/Action/userAction'
import { Switch, Route } from 'react-router-dom'
import ScrollToTop from './HELPERS/scrollTop'
import Login from './PAGES/Login/Login'
import Header from './PAGES/Header/Header'
import Navigation from './PAGES/Navigation/Navbar'
import LandingPage from './PAGES/LandingPage/LandingPage'
import User from './PAGES/User/User'
import Confirmation from './PAGES/Confirmation/Confirmation'
import Order from './PAGES/Order/Order'
import Selling from './PAGES/Selling/Selling'
import Product from './PAGES/Product/ManageProduct'
import Message from './PAGES/Messages/Messages'
import {Card} from 'react-bootstrap'


class App extends Component {

  componentDidMount() {
    var token = localStorage.getItem('token')
    if (token) {
        this.props.keepLogin(token)
    } else {
        this.props.checkLocalStorage()
    }
  }

  render() {

    if (!this.props.user.userChecker) {
      return (
          <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
          </div>
      )
  }

    return (
      <div>
        <Switch>
        {
          this.props.user.username === "" || this.props.user.username !== "Admin"
          ?
            <> 
              <Login/>
              <Route exact path='/Login' component={Login}/>
            </>
          :
          <>
              <div className="d-none d-lg-block">
                <Header/>
                <div className="row min-vh-100">
                  <div className="col-2 bg-dark pt-5">
                    <Navigation/>
                  </div>
                  <div className="col-10 pt-4 background-workspace">
                    <ScrollToTop/>
                    <Route exact path='/' component={LandingPage}/>
                    <Route exact path='/user' component={User}/>
                    <Route exact path='/confirmation' component={Confirmation}/>
                    <Route exact path='/order' component={Order}/>
                    <Route exact path='/selling' component={Selling}/>
                    <Route exact path='/product' component={Product}/>
                    <Route exact path='/message' component={Message}/>
                  </div>
                </div>
              </div>
              <div className="container-fluid background-image d-flex align-items-center justify-content-center d-lg-none">
                <Card body >Please use a large device.</Card>
              </div>
          </>
        }
        </Switch>    
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps, {keepLogin, checkLocalStorage})(App);
