import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../HELPERS/database'
import {Table} from 'react-bootstrap'

class User extends Component {

    state = {
        daftarUser: [],
        daftarUserTerbaik: []
    }

    componentDidMount(){
        this.getAllUsers()
        this.getDaftarUserTerbaik()
    }

    getAllUsers = () => {
        Axios.get(urlApi + 'user/getAllUsers')
        .then(res => {
            this.setState({daftarUser: res.data})
        }).catch(err => {
            console.log(err)
        })
    }

    getDaftarUserTerbaik = () => {
        Axios.get(urlApi + 'pesanan/daftarUserTerbaik')
        .then(res => {
            this.setState({daftarUserTerbaik: res.data})
        }).catch(err => {
            console.log(err)
        })
    }

    renderDataUsers = () => {
        return this.state.daftarUser.map(val => {
            return (
                <tr key={val.id} className='text-dark text-center'>
                    <td>{val.id}</td>
                    <td>{val.username}</td>
                    <td>{val.email}</td>
                    <td>{val.status}</td>
                    <td>{val.tanggalBergabung.slice(0, 10)}</td>
                    <td>{val.role}</td>
                </tr>
            )
        })
    }

    renderTransaksiUsers = () => {
        return this.state.daftarUserTerbaik.map(val => {
            return (
                <tr key={val.UserId} className='text-dark'>
                    <td>{val.username}</td>
                    <td>{val.UserId}</td>
                    <td>Rp. {new Intl.NumberFormat('id-ID').format(val.TotalBelanjaan)}</td>
                    <td>{val.JumlahTransaksi}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="background-main-admin">
            <div className="container-fluid card-main card-main-mobile">
                <div className="row mx-3">
                    <div className="col-12">
                        <div className="card mt-5">
                            <div className="card-header text-center" style={{backgroundColor: '#E32E89'}}>
                                <h3>USERS DATA</h3>
                            </div>
                            <div className="card-body mx-3">
                                <Table striped bordered hover className="text-white text-center">
                                    <thead color="text-center text-white" style={{backgroundColor: '#60217B'}}>
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Register Date</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderDataUsers()}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-5 mx-3">
                    <div className='col-12'>
                        <div className="card">
                            <div className="card-header text-center" style={{backgroundColor: '#E32E89'}}>
                                <h3>USER TRANSACTION RANKING</h3>
                            </div>
                            <div className="card-body mx-3">
                                {
                                    this.state.daftarUserTerbaik.length === 0
                                    ?
                                    <h3 className="text-center h3-responsive">User Has Not Order Any Package This Month</h3>
                                    :
                                    <Table striped bordered hover className="text-white text-center">
                                        <thead color="text-center text-white" style={{backgroundColor: '#60217B'}}>
                                            <tr>
                                                <th>Username</th>
                                                <th>UserId</th>
                                                <th>Total Spending</th>
                                                <th>Total Transaction</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderTransaksiUsers()}
                                        </tbody>
                                    </Table>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default User;