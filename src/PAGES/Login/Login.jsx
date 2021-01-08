import React, { Component } from 'react';
import {connect} from 'react-redux'
import './Login.css'
import { loginUser } from '../../REDUX/Action/LoginFormAction'
import { Redirect } from 'react-router-dom'
import {Card, Form, InputGroup, FormControl} from "react-bootstrap"
import {IconContext} from "react-icons";
import {AiTwotoneMail} from 'react-icons/ai'
import {FaLock} from 'react-icons/fa'

class Login extends Component {

    state = {
        inputEmail: '',
        inputPassword: ''
    }

    onLoginBtnHandler = () => {
        let userInput = {
            email: this.state.inputEmail,
            password: this.state.inputPassword
        }
      this.props.loginUser(userInput)
    }

    renderButtonLogin = () => {
        if (!this.props.loginForm.loading) {
            return <button type="submit" className="btn btn-danger" onClick={this.onLoginBtnHandler}>SIGN IN</button>
        } else {
            return(
                <>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </>
            ) 
        }
    }

    render() {
        if (this.props.user.status !== '') return <Redirect to="/" exact/>
        return (
            <div className="container-fluid background-image d-flex align-items-center justify-content-center">
            <Card className="card-login d-none d-lg-block">
                <Card.Body>
                    <div className='row justify-content-center mb-3'>
                        <h1 className="my-3 font-weight-bold text-center">Sign In</h1>
                    </div>
                    <Form className="mb-3 pr-5 pl-5">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <IconContext.Provider
                                        value={{
                                        color: 'black',
                                        size: '23px'
                                    }}>
                                        <AiTwotoneMail/>
                                    </IconContext.Provider>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Email" onChange={(e) => this.setState({inputEmail: e.target.value})}/>
                        </InputGroup>
                    </Form>
                    <Form className="mb-4 pr-5 pl-5">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <IconContext.Provider
                                        value={{
                                        color: 'black',
                                        size: '23px'
                                    }}>
                                        <FaLock/>
                                    </IconContext.Provider>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Password" type="password" onChange={(e) => this.setState({inputPassword: e.target.value})}/>
                        </InputGroup>
                    </Form>
                    <div className="text-center mt-1 mb-1 text-danger">
                        {
                            this.props.loginForm.error
                            ?
                            <>
                                {this.props.loginForm.error}
                            </>
                            :
                            <>
                                &nbsp;
                            </>
                        }
                    </div>
                    <div className="text-center mt-1">
                        {this.renderButtonLogin()}
                    </div>
                </Card.Body>
            </Card>
            <Card body className="d-lg-none">Please use a large device.</Card>
        </div>
        );
    }
}

const mapStateToProps = ({loginForm, user}) => {
    return {
        loginForm,
        user
    }
}

export default connect(mapStateToProps, {loginUser})(Login);