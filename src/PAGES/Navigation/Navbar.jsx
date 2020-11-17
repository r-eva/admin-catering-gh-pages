import React, {Component} from 'react';
import {connect} from 'react-redux'
import {userLogout} from '../../REDUX/Action/userAction'
import {Nav} from 'react-bootstrap'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { faCalendarAlt, faUtensils, faChartLine, faUsers, faCreditCard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class Navbar extends Component {
    render() {
        return (
            <Nav defaultActiveKey="/" className="sticky-top position-navbar pt-5 mt-5">
                <Nav.Item className="mt-5">
                    <Nav.Link as = {Link} to="/" className="text-white mx-2"><FontAwesomeIcon icon={faCalendarAlt} size="lg" className="mr-2"/> Schedule</Nav.Link><hr className="bg-secondary mx-4"/>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as = {Link} to="/order" className="text-white mx-2"><FontAwesomeIcon icon={faCreditCard} size="lg" className="mr-2"/> Order</Nav.Link><hr className="bg-secondary mx-4"/>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as = {Link} to="/product" className="text-white mx-2"><FontAwesomeIcon icon={faUtensils} size="lg" className="mr-2"/>  Product</Nav.Link><hr className="bg-secondary mx-4"/>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as = {Link} to="/user" className="text-white mx-2"><FontAwesomeIcon icon={faUsers} size="lg" className="mr-2"/> User</Nav.Link><hr className="bg-secondary mx-4"/>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as = {Link} to="/selling" className="text-white mx-2"><FontAwesomeIcon icon={faChartLine} size="lg" className="mr-2"/> Selling</Nav.Link><hr className="bg-secondary mx-4"/>
                </Nav.Item>
            </Nav>
        );
    }
}

export default connect(null, {userLogout})(Navbar);