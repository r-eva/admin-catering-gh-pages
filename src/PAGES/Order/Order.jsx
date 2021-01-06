import React, { Component } from 'react';
import {urlApi} from '../../HELPERS/database'
import Axios from 'axios'
import moment from 'moment'
import { Table, Modal, Button } from 'react-bootstrap';

class Order extends Component {

    state = {
        seluruhPesananHariIni: [],
        tanggalHariIni: moment().format("D MMMM YYYY"),
        tanggalDitambahkan: 0,
        detailPesananDipilih: null,
        detailShow: false,
        getData: false
    }

    componentDidMount() {
        this.getJumlahPesanan(moment().add(this.state.tanggalDitambahkan, 'days').format("YYYY-MM-DD").toString())
    }

    componentDidUpdate() {
        if (this.state.getData === false) {
            this.getJumlahPesanan(moment().add(this.state.tanggalDitambahkan, 'days').format("YYYY-MM-DD").toString())
        }
    }

    ////////////////////////////////////////////// GET DATA API ///////////////////////////////////////////////////

    getJumlahPesanan = (tanggalJadwal) => {
        Axios.get(urlApi + 'jadwalAdmin/getJumlahPesananPerhari/' + tanggalJadwal)
        .then(res => {
            this.setState({seluruhPesananHariIni: res.data, getData: true})
        }).catch(err => {
            console.log(err)
        })   
    }

    getDetailPesanan = (historyDipilih) => {
        this.setState({detailPesananDipilih: historyDipilih, detailShow: true})
    }

    ///////////////////////////////////////////// FUNGSI ACTION //////////////////////////////////////////////////

    cekHari = () => {
        if (moment().add(this.state.tanggalDitambahkan, 'days').format("dddd") === "Sunday") {
            this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan + 1})
            return <h6>{moment().add(this.state.tanggalDitambahkan, 'days').format("D MMMM YYYY")}</h6>
        } else if (moment().add(this.state.tanggalDitambahkan, 'days').format("dddd") === "Saturday") {
            this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan + 2})
            return <h6>{moment().add(this.state.tanggalDitambahkan, 'days').format("D MMMM YYYY")}</h6>
        } else {
            return <h6>{moment().add(this.state.tanggalDitambahkan, 'days').format("D MMMM YYYY")}</h6>
        }
    }

    ////////////////////////////////////////////// FUNGSI RENDER /////////////////////////////////////////////////

    renderListPesanan = () => {       
        if (this.state.seluruhPesananHariIni.length !== 0) {
            var jsx = this.state.seluruhPesananHariIni.map(val => {
                return (
                    <tr key={val.id} className="text-center">
                        <td>{val.namaPaket}</td>
                        <td>{val.TanggalMulai.slice(0, 10)}</td>
                        <td>{val.TanggalBerakhir.slice(0, 10)}</td>
                        <td>{val.JumlahBox}</td>
                        {
                            this.state.detailShow === true
                            ?
                            <>
                                <td><input type="button" className='btn btn-info' value="Detail"/></td>
                                {this.renderModal(
                                    {
                                        show: this.state.detailShow,
                                        onHide: () => this.setState(
                                                    {
                                                        detailShow: false, detailPesananDipilih: null 
                                                    }
                                                )
                                    }
                                )}
                            </>
                            :
                            <td><input type="button" className='btn btn-info' value="Detail" onClick={() => this.getDetailPesanan(val)}/></td>
                        }
                    </tr>
                )
            })
            return jsx
        }
    }

    renderModal = (props) => {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton className="bg-primary" >
              <Modal.Title id="contained-modal-title-vcenter">
                <p className="font font-weight-bold">ORDER DETAIL</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover className="text-center">
                    <thead style={{backgroundColor: '#60217B'}} className="text-center text-white">
                        <tr>
                            <td>Username</td>
                            <td>Package</td>
                            <td>Qty</td>
                            <td>Recipient's Name</td>
                            <td>Address</td>
                            <td>Postal Code</td>
                        </tr>
                    </thead>
                    <tr>
                        <td>{this.state.detailPesananDipilih.username}</td>
                        <td>{this.state.detailPesananDipilih.namaPaket}</td>
                        <td>{this.state.detailPesananDipilih.JumlahBox}</td>
                        <td>{this.state.detailPesananDipilih.NamaPenerima}</td>
                        <td>{this.state.detailPesananDipilih.AlamatPenerima}</td>
                        <td>{this.state.detailPesananDipilih.KodePosPenerima}</td>
                    </tr>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>CLOSE</Button>
            </Modal.Footer>
          </Modal>
        );
    }

    render() {
        return (
            <div>
              <div className="card m-5">
                    <div className="card-header text-center" style={{backgroundColor: '#E32E89'}}>
                        <h3>ORDER LIST</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-5">
                                {this.cekHari()}
                            </div>
                            <div className="col-7 text-right">
                                <div className="row">
                                    <div className="col-6">
                                        {
                                            this.state.tanggalDitambahkan === 0
                                            ?
                                            <button className="btn btn-dark btn-block p-1 m-0" disabled>Back</button>
                                            :
                                            <>
                                            {
                                                moment().add(this.state.tanggalDitambahkan - 1, 'days').format("dddd") === 'Sunday' 
                                                ?
                                                <button className="btn btn-success btn-block p-1 m-0" onClick={() => this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan - 3, getData: false})}>Back</button>
                                                :
                                                <button className="btn btn-success btn-block p-1 m-0" onClick={() => this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan - 1, getData: false})}>Back</button>
                                            }
                                            </>              
                                        }       
                                    </div>
                                    <div className="col-6">
                                        {
                                            moment().add(this.state.tanggalDitambahkan, 'days').format("D") === `${moment().daysInMonth()}` || moment().add(this.state.tanggalDitambahkan + 3, 'days').format("MMMM") !== moment().add(this.state.tanggalDitambahkan, 'days').format("MMMM")
                                            ?
                                            <button className="btn btn-dark btn-block p-1 m-0" disabled>Next</button>
                                            :
                                            <>
                                            {
                                                moment().add(this.state.tanggalDitambahkan + 1, 'days').format("dddd") === 'Saturday' 
                                                ?
                                                <button className="btn btn-success btn-block p-1 m-0" onClick={() => this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan + 3, getData: false})}>Next</button>
                                                :
                                                <button className="btn btn-success btn-block p-1 m-0" onClick={() => this.setState({tanggalDitambahkan: this.state.tanggalDitambahkan + 1, getData: false})}>Next</button>
                                            }
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.seluruhPesananHariIni.length > 0
                            ?
                            <Table striped bordered hover className="mt-4">
                            <thead style={{backgroundColor: '#60217B'}} className="text-center text-white">
                                <tr>
                                    <th>Package</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Qty</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderListPesanan()}
                            </tbody>
                            </Table>
                            :
                        <h3 className="text-center h3-responsive mt-5">No Order</h3>
                        }       
                    </div>
                </div>  
            </div>
        );
    }
}

export default Order;