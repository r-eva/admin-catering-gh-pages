import React, { Component } from 'react';
import {urlApi} from '../../HELPERS/database'
import Axios from 'axios'
import swal from 'sweetalert'
import {Table, Modal, Button} from 'react-bootstrap'

class Confirmation extends Component {

    state = {
        listTransaksiMenunggu: [],
        historyDetail: [],
        modalShow: false
    }

    componentDidMount(){
        this.getDataTransaksiMenunggu()
    }

    componentDidUpdate() {
        this.renderTransaksiMenunggu()
    }


    ////////////////////////////////////////////////// GET DATA API //////////////////////////////////////////////////

    getDataTransaksiMenunggu = () => {
        Axios.get(urlApi + 'admin/getTransaksiMenunggu')
        .then((res) => {
            this.setState({listTransaksiMenunggu: res.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    getDetailHistory = (idHistory) => {
        Axios.get(urlApi + `history/getHistoryDetailById/` + idHistory)
            .then((res)=>{
                this.setState({historyDetail: res.data, modalShow: true})       
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //////////////////////////////////////////////// ACTION FUNCTION //////////////////////////////////////////////


    confirmPembayaran = (id) => {
        Axios.put(urlApi + 'admin/confirmPembayaran/' + id)
        .then((res)=>{
            window.location.reload()
            this.getDataTransaksiMenunggu()
            swal ('Transaction confirmed!', `Please check list of order.`, 'success')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    rejectPembayaran = (id) => {
        Axios.put(urlApi + 'admin/rejectPembayaran/' + id)
        .then((res)=>{
            window.location.reload()
            this.getDataTransaksiMenunggu()
            swal({
                icon: "success",
                text: 'Transaction rejected!'
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }


    //////////////////////////////////////////////// RENDER FUNCTION //////////////////////////////////////////////

    renderTransaksiMenunggu = () => {
        var jsx = this.state.listTransaksiMenunggu.map(val => {
            return (
                <tr key={val.id} className='text-dark text-center' style={{cursor: 'pointer'}}>
                    <td>{val.UserId}/{val.username}</td>
                    <td>{val.TanggalTransaksi}</td>
                    <td>{val.TotalBelanja}</td>
                    <td><a href={`${urlApi}${val.buktiPembayaranPath}`}><img src={`${urlApi}${val.buktiPembayaranPath}`} style={{
                            width:'70px', height: '70px', borderRadius: '4px', padding: '5px'
                            }} alt='Cannot Get Transfer Proof'></img></a>
                    </td>
                    {
                            this.state.modalShow === true 
                            ?
                            <>
                                {this.renderModal(
                                    {
                                        show: this.state.modalShow,
                                        onHide: () => this.setState(
                                                    {
                                                        modalShow: false, historyDetail: []
                                                    }
                                                )
                                    }
                                )}
                            </>
                            :
                            <td><input type="button" value="DETAIL" className="btn btn-info btn-block" onClick={() => this.getDetailHistory(val.id)}/></td>
                    }
                    <td><input type="button" value="Confirm" className="btn btn-success btn-block" onClick={() => this.confirmPembayaran(val.id)}/></td>
                    <td><input type="button" value="Reject" className="btn btn-danger btn-block" onClick={() => this.rejectPembayaran(val.id)}/></td>
                </tr>
            )
        })
        return jsx
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
              <Modal.Title>
                    <h5 className="font-weight-bold">YOUR TRANSACTION DETAIL</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.renderHistoryDetail()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>CLOSE</Button>
            </Modal.Footer>
          </Modal>
        );
    }

    renderHistoryDetail = () => {
        var jsx = this.state.historyDetail.map((val, idx) => {
            return (
                    <div key = {val.id} >
                        <p>{idx + 1}. Paket {val.namaPaket} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Harga: {val.harga} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Diskon: {val.discount} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Jumlah Box: {val.JumlahBox} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Tanggal Mulai: {val.TanggalMulai.slice(0, 10)} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Tanggal Berakhir: {val.TanggalBerakhir.slice(0, 10)} <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Durasi: {val.Durasi} hari<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Subtotal: {val.Durasi * val.JumlahBox * (val.harga - (val.harga * val.discount/100))} <br/>
                        </p>
                    </div>      
                    )
        })
        return jsx
    }

    //////////////////////////////////////////////// DISPLAY ///////////////////////////////////////////////////////


    render() {
        return (
            <div>
               <div className="card m-3">
                    <div className="card-header text-center" style={{backgroundColor: '#7FBB28'}}>
                        <h3>WAITING CONFIRMATION</h3>
                    </div>
                    <div className="card-body">
                        {
                            this.state.listTransaksiMenunggu.length > 0
                            ?
                            <Table className="text-white" striped bordered hover>
                                <thead color="text-center text-white" style={{backgroundColor: '#0085C7'}}>
                                    <tr>
                                        <th>UserId/Name</th>
                                        <th>Transaction Date</th>
                                        <th>Total</th>
                                        <th>Receipt</th>
                                        <th>Detail</th>
                                        <th>Confirm</th>
                                        <th>Cancel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTransaksiMenunggu()}           
                                </tbody>
                            </Table>
                            :
                            <h3 className="text-center h3-responsive">No Waiting Confirmation This Month</h3>
                        }
                    </div>
                </div> 
            </div>
        );
    }
}

export default Confirmation;