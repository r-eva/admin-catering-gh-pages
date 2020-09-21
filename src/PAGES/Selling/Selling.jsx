import React, { Component } from 'react';
import {urlApi} from '../../HELPERS/database'
import Axios from 'axios'
import { Table } from 'react-bootstrap'

class Selling extends Component {

    state = {
        produkTerbaik: '',
    }

    componentDidMount () {
        this.getProdukTerbaik()
    }

    getProdukTerbaik = () => {
        Axios.get(urlApi + 'pesanan/daftarProdukTerbaik')
        .then(res => {
            this.setState({produkTerbaik: res.data})
        }).catch(err => {
            console.log(err)
        })
    }

    renderProdukRanking = () => {
        if(this.state.produkTerbaik.length !== 0) {
            return this.state.produkTerbaik.map(val => {
                return (
                    <tr key={val.namaPaket} className='text-dark'>
                        <td>{val.namaPaket}</td>
                        <td>{val.totalTerjual}</td>
                        <td>{val.jumlahTransaksi}</td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
                <div className="card m-5">
                    <div className="card-header text-center" style={{backgroundColor: '#7FBB28'}}>
                        <h3>PRODUCT SALES RANKING</h3>
                    </div>
                    <div className="card-body mx-3">
                        {
                            this.state.produkTerbaik.length === 0
                            ?
                            <h3 className="text-center h3-responsive">No Product Sold This Month</h3>
                            :
                            <Table striped bordered hover className="text-center">
                                <thead color="text-center text-white" style={{backgroundColor: '#0085C7'}}>
                                    <tr>
                                        <th>Package Name</th>
                                        <th>Total Sales</th>
                                        <th>Transaction Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderProdukRanking()}
                                </tbody>
                            </Table>
                        }
                    </div>
                </div>
        );
    }
}

export default Selling;