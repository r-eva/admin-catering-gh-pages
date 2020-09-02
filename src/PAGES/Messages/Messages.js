import React, { Component } from 'react'
import io from 'socket.io-client'
import {Form} from 'react-bootstrap'

const socket = io.connect('http://localhost:1997')

class Messages extends Component {
    state = {
        message: '',
        name: '',
        chat: []
    }
    

    render() {
        return (
            <div className="px-3">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                    <button>SEND</button>
                </Form.Group>
            </div>
        );
    }
}

export default Messages;