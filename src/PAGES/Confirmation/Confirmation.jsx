import React, { Component } from 'react';
import {urlApi} from '../../HELPERS/database'
import Axios from 'axios'
import swal from 'sweetalert'
import {connect} from 'react-redux'
import {hitungConfirmation} from '../../REDUX/Action/userAction'
import {Table, Modal, Button} from 'react-bootstrap'
import './Confirmation.css'

class Confirmation extends Component {

    state = {
        listTransaksiMenunggu: [],
        historyDetail: [],
        modalShow: false,
        confirmPembayaranClicked: false,
        rejectPembayaranClicked: false,
        erorImage: '',
        imageStatus: 'exist'
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

    getDetailHistory = (idHistory, path) => {
        Axios.get(urlApi + `history/getHistoryDetailById/` + idHistory)
            .then((res)=>{
                if (this.state.erorImage !== '') {
                    this.setState({historyDetail: res.data, modalShow: true})
                } else {
                    this.setState({historyDetail: res.data, modalShow: true, erorImage: `${urlApi}${path}`})
                }      
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //////////////////////////////////////////////// ACTION FUNCTION //////////////////////////////////////////////


    confirmPembayaran = (id) => {
        this.setState({confirmPembayaranClicked: true})
        var obj = {
            idHistory: id,
            statusImage: this.state.imageStatus
        }
        Axios.put(urlApi + 'admin/confirmPembayaran', obj)
        .then((res)=>{
            this.getDataTransaksiMenunggu()
            this.props.hitungConfirmation()
            swal ('Transaction confirmed!', `Please check list of order.`, 'success')
            this.setState({confirmPembayaranClicked: false})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    rejectPembayaran = (id) => {
        this.setState({rejectPembayaranClicked: true})
        var obj = {
            idHistory: id,
            statusImage: this.state.imageStatus
        }
        Axios.put(urlApi + 'admin/rejectPembayaran', obj)
        .then((res)=>{
            this.getDataTransaksiMenunggu()
            this.props.hitungConfirmation()
            swal({
                icon: "success",
                text: 'Transaction rejected!'
            })
            this.setState({rejectPembayaranClicked: false})
        })
        .catch((err) => {
            console.log(err)
        })
    }


    //////////////////////////////////////////////// IMAGE ERROR //////////////////////////////////////////////////

    imageError = (image) => {
        image.onerror = ""
        image.target.src = `${urlApi}/images/ImageError/Explanation.png`
        this.setState({erorImage: `${urlApi}/images/ImageError/Explanation.png`, imageStatus: 'null'})
        return true;
    }

    //////////////////////////////////////////////// RENDER FUNCTION //////////////////////////////////////////////

    renderTransaksiMenunggu = () => {
        var jsx = this.state.listTransaksiMenunggu.map(val => {
            return (
                <tr key={val.id} className='text-dark text-center' style={{cursor: 'pointer'}}>
                    <td>{val.UserId}/{val.username}</td>
                    <td>{val.TanggalTransaksi}</td>
                    <td>{val.TotalBelanja}</td>
                    <td><img src={`${urlApi}${val.buktiPembayaranPath}`} style={{width:'70px',height: '70px', borderRadius: '4px', padding: '5px'}}
                        onError={(e) => this.imageError(e)} alt='Cannot Get Transfer Proof'></img>
                    </td>
                    {
                            this.state.modalShow === true 
                            ?
                            <>
                                <td><input type="button" value="DETAIL" className="btn btn-info btn-block" /></td>
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
                            <td><input type="button" value="DETAIL" className="btn btn-info btn-block" onClick={() => this.getDetailHistory(val.id, val.buktiPembayaranPath)}/></td>
                    }
                    {
                        this.state.confirmPembayaranClicked || this.state.rejectPembayaranClicked
                        ?
                        <>
                            <td><input type="button" value="Confirm" className="btn btn-success btn-block"/></td>
                            <td><input type="button" value="Reject" className="btn btn-danger btn-block"/></td>
                        </>
                        :
                        <>
                            <td><input type="button" value="Confirm" className="btn btn-success btn-block" onClick={() => this.confirmPembayaran(val.id)}/></td>
                            <td><input type="button" value="Reject" className="btn btn-danger btn-block" onClick={() => this.rejectPembayaran(val.id)}/></td>
                        </>
                    }
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
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>No.</th>
                        <th>Package</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Qty</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Duration</th>
                        <th>Delivery</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderHistoryDetail()}
                    </tbody>
                </Table>
                <h6 className="font-weight-bold">Proof of Payment:</h6>
                <center>
                    <a href={this.state.erorImage}>
                    <img src={this.state.erorImage} alt="img error" style={{width:'50%',height: '50%', borderRadius: '4px', padding: '5px'}}/>
                    </a>
                </center>
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
                    <tr key = {val.id} className="text-center">
                        <td>{idx + 1 }</td>
                        <td>{val.namaPaket}</td>
                        <td>{val.harga}</td>
                        <td>{val.discount}</td>
                        <td>{val.JumlahBox}</td>
                        <td>{val.TanggalMulai.slice(0, 10)}</td>
                        <td>{val.TanggalBerakhir.slice(0, 10)}</td>
                        <td>{val.Durasi}</td>
                        <td>{val.AlamatPenerima}</td>
                    </tr>
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
                                <thead color="text-white" style={{backgroundColor: '#0085C7'}}>
                                    <tr className="text-center">
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


export default connect(null, {hitungConfirmation})(Confirmation);
