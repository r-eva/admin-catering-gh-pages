import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar, Form, FormControl, Button, OverlayTrigger, Tooltip, Image} from "react-bootstrap"
import { faBell, faSignOutAlt, faSearch, faEnvelope} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {userLogout, hitungConfirmation} from '../../REDUX/Action/userAction'
import Logo from '../../IMG/Logo/Chew and Cheer blue_1.jpg'
import LogoScroll from '../../IMG/Logo/Chew and Cheer blue_2.jpg'
import './Header.css'

class Header extends Component {

    state = {
        bgNavbar: "",
        height: "",
        transition: "",
        jumlahConfirm: this.props.jumlahConfirm,
        imageBrand: Logo,
        imageTransition: ""
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        this.props.hitungConfirmation()
    }

    componentDidUpdate(){
        if (this.state.jumlahConfirm !== this.props.jumlahConfirm) {
            this.props.hitungConfirmation()
        }
    }

    handleScroll = () => {
        if (window.pageYOffset > 0) {
            if(!this.state.bgNavbar) {
                this.setState({bgNavbar: "#0000fe", height: "70px", transition: "height 1s", imageBrand: LogoScroll, imageTransition: "opacity 1s ease-in-out"})
            }
        } else {
            if (this.state.bgNavbar) {
                this.setState({bgNavbar: "", height: "90px", imageBrand: Logo})
            }
        }
    }

    render() {
        return (
            <Navbar style={{background: "#0000fe", height: this.state.height, transition: this.state.transition}} sticky="top">
                <Navbar.Brand><b className="text-white">WELCOME ADMIN &nbsp; | </b><Image src={this.state.imageBrand} alt='LogoNormal' fluid className="link-logo"/></Navbar.Brand>
                    <Form inline className="ml-auto">
                        <FormControl type="text" placeholder="Search" className="mr-2"/>
                        <Button variant="light"><FontAwesomeIcon icon={faSearch} /></Button>
                    </Form>
                <div>
                    <OverlayTrigger placement="bottom" delay={{ show: 100, hide: 200 }} overlay={<Tooltip id="tooltip-bottom">Inbox</Tooltip>}>
                        <Link to="/message" className="text-dark">
                            <span className="ml-3 mr-2 fa-stack">
                            {/* <span className="ml-3 mr-2 fa-stack" data-count={this.props.jumlahConfirm}> */}
                                <FontAwesomeIcon icon={faEnvelope} className="text-white fa-stack-2x"/>
                            </span>
                        </Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" delay={{ show: 100, hide: 200 }} overlay={<Tooltip id="tooltip-bottom">{this.props.jumlahConfirm} Notification</Tooltip>}>
                        <Link to="/confirmation" className="text-dark">
                            {
                                this.props.jumlahConfirm === 0
                                ?
                                <span className="mr-2 fa-stack">
                                    <FontAwesomeIcon icon={faBell} className="text-white fa-stack-2x"/>
                                </span>
                                :
                                <span className="mr-2 fa-stack" data-count={this.props.jumlahConfirm}>
                                    <FontAwesomeIcon icon={faBell} className="text-white fa-stack-2x"/>
                                </span>
                            }
                        </Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" delay={{ show: 100, hide: 200 }} overlay={<Tooltip id="tooltip-bottom">Signout</Tooltip>}>
                        <Link to="/confirmation" className="text-dark">
                            <span className="mr-2 fa-stack">
                                <FontAwesomeIcon icon={faSignOutAlt} onClick={this.props.userLogout} className="text-white fa-stack-2x"/>
                            </span>
                        </Link>         
                    </OverlayTrigger>
                </div>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        jumlahConfirm: state.confirmation.jumlahConfirm
    }
}

export default connect(mapStateToProps, {userLogout, hitungConfirmation})(Header);