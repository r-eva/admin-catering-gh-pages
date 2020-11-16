import React, { Component } from 'react'
import { urlApi } from '../../HELPERS/database'
import Axios from 'axios'
import {connect} from 'react-redux'
import {updateSubscribe} from '../../REDUX/Action/ManageProduct'
import {Button, Form, Spinner} from 'react-bootstrap'
import swal from 'sweetalert'

class ManagePaketBaru extends Component {

    state = {
        inputNamaPaketAdd: false,
        inputHargaAdd: false,
        inputDiscountAdd: false,
        inputDeskripsAdd: false,
        imageLanggananAdd: false,
        tambahJadwal: false,
        tambahJadwalDariMenuClick: false,
        listAllMenuTambahJadwal: [],
        inputNamaMenuBaru: '',
        inputDeskripsiMenu: '',
        selectedNewMenu: '',
        tambahPaketClicked: false
    }

    ////////////////////////////////////////GET VALUE INPUT //////////////////////////////////////

    imageLanggananAdd = (e) => {
        if(e.target.files[0]) {
            this.setState({ imageLanggananAdd: e.target.files })
        } else {
            this.setState({ imageLanggananAdd: null })
        }
    }

    getMenuTambahJadwal = (e) => {
        this.setState({selectedNewMenu: e.target.value})
    }

    ////////////////////////////////////////GET DATA API////////////////////////////////////////////

    getAllMenuTambahJadwal = (id) => {
        Axios.get(urlApi + 'jadwal/getallmenu')
        .then((res) => {
            this.setState({tambahJadwal: true, listAllMenuTambahJadwal: res.data, tambahJadwalDariMenuClick: true})
        }).catch((err) => {
            console.log(err)
        })
    }

    ///////////////////////////////////////////FUNCTION TO BACKEND //////////////////////////////////////77

    tambahPaketLanggananDanJadwal = () => {
        this.setState({tambahPaketClicked: true})
        var data
        var formdata
        var options
        if (this.state.tambahJadwalDariMenuClick) {
            if ( this.state.inputNamaPaketAdd && this.state.inputHargaAdd && this.state.inputDiscountAdd
                && this.state.imageLanggananAdd && this.state.selectedNewMenu !== '' && this.refs.inputKategori.value !== "Choose Category") {
                formdata = new FormData();
                options = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                data = {
                    namaPaket: this.state.inputNamaPaketAdd,
                    harga: this.state.inputHargaAdd,
                    discount: this.state.inputDiscountAdd,
                    deskripsi: this.state.inputDeskripsiAdd,
                    imagePath: this.state.imageLanggananAdd,
                    kategori: this.refs.inputKategori.value,
                    idMenu: this.state.selectedNewMenu
                }
                
                formdata.append('image', this.state.imageLanggananAdd[0])
                formdata.append('data', JSON.stringify(data))
    
                Axios.post(urlApi + 'langganan/addLanggananJadwalLama/', formdata, options)
                .then((res) => {
                    this.setState({
                        inputNamaPaketAdd: false, inputHargaAdd: false, inputDiscountAdd: false,
                        inputDeskripsAdd: false, imageLanggananAdd: false, tambahJadwal: false,
                        tambahJadwalDariMenuClick: false, listAllMenuTambahJadwal: [],
                        inputNamaMenuBaru: '', inputDeskripsiMenu: '', selectedNewMenu: '', tambahPaketClicked: false
                    })
                    swal ("Congratulation!", "Package has been added!", "success")
                    this.resetFunction()
                    this.props.updateSubscribe()
                }).catch((err) => {
                    this.setState({tambahPaketClicked: false})
                    swal ('Eror', `${err.response.data.message}`, 'error')
                    this.resetFunction()
                    console.log(err)
                })
    
            } else {
                this.setState({tambahPaketClicked: false})
                swal ('Eror', 'Please complete all data required and add one schedule!', 'error')
                this.resetFunction()
            }

        } else {
            if ( this.state.inputNamaPaketAdd && this.state.inputHargaAdd && this.state.inputDiscountAdd
                && this.state.imageLanggananAdd && this.state.inputNamaMenuBaru !== '' && this.state.inputDeskripsiMenu !== '' && this.refs.inputKategori.value !== "Choose Category") {
                
                formdata = new FormData();
                options = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                
                data = {
                    namaPaket: this.state.inputNamaPaketAdd,
                    harga: this.state.inputHargaAdd,
                    discount: this.state.inputDiscountAdd,
                    deskripsi: this.state.inputDeskripsiAdd,
                    kategori: this.refs.inputKategori.value,
                    Menu: this.state.inputNamaMenuBaru,
                    Deskripsi: this.state.inputDeskripsiMenu
                }

                formdata.append('image', this.state.imageLanggananAdd[0])
                formdata.append('data', JSON.stringify(data))
                
                Axios.post(urlApi + 'langganan/addLanggananJadwalBaru/', formdata, options)
                .then((res) => {
                    this.setState({
                        inputNamaPaketAdd: false, inputHargaAdd: false, inputDiscountAdd: false,
                        inputDeskripsAdd: false, imageLanggananAdd: false, tambahJadwal: false,
                        tambahJadwalDariMenuClick: false, listAllMenuTambahJadwal: [],
                        inputNamaMenuBaru: '', inputDeskripsiMenu: '', selectedNewMenu: '', tambahPaketClicked: false
                    })
                    swal ("Congratulation!", "Package has been added!", "success")
                    this.resetFunction()
                    this.props.updateSubscribe()
                }).catch((err) => {
                    this.setState({tambahPaketClicked: false})
                    swal ('Eror', `${err.response.data.message}`, 'error')
                    this.resetFunction()
                    console.log(err)
                })

            } else {
                this.setState({tambahPaketClicked: false})
                swal ('Eror', 'Please input all data required and add one schedule!', 'error')
                this.resetFunction()
            }
        }
    }

    resetFunction = () => {
        document.getElementById("newProductForm").reset()
    }

    /////////////////////////////////////////// RENDER FUNCTION ///////////////////////////////////////////

    renderPilihanMenuUntukTambah = () => {
        var jsx = this.state.listAllMenuTambahJadwal.map(val => {
             return <option key={val.id} value={val.id}>{val.Menu}</option>
        })
        return jsx
    }

    render() {
        return (
                <div className="my-5">
                    <div className="row m-3">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header text-center" style={{backgroundColor: '#E32E89'}}>
                                    <h3>ADD PACKAGE</h3>
                                </div>
                                <form className="card-body mx-3" id="newProductForm">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="inputNameProduct">Name</label>
                                            <input placeholder="Input Package Name" type="text" id="inputProduct1" className="form-control"  onChange={(e) => this.setState({inputNamaPaketAdd: e.target.value})}/>
                                        </div>
                                        <div className="col-6 col-md-4">
                                            <label htmlFor="inputPriceProduct">Price</label>
                                            <input placeholder="Input Package Price" type="number" id="inputProduct2" className="form-control" onChange={(e)=> this.setState({inputHargaAdd: e.target.value})}/>
                                        </div>
                                        <div className="col-6 col-md-4">
                                            <label htmlFor="inputDiscountProduct">Discount (in percentage)</label>
                                            <input placeholder="Input Package Discount (optional)" type="number" id="inputProduct3" className="form-control" onInput={(e) => e.target.value = e.target.value.slice(0, 2)} onChange={(e) => this.setState({inputDiscountAdd: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mt-4">
                                        <div className="col-4">
                                                <h6 className="mb-2">Description</h6>
                                                <Form.Control as="textarea" rows="3" placeholder="Input Package Description" id="inputProduct4" onChange={(e)=> this.setState({inputDeskripsiAdd: e.target.value})}/>
                                        </div>
                                        <div className="col-4">
                                            <h6 className="mb-2">Category</h6>
                                            <select ref='inputKategori' className="browser-default custom-select mt-1">
                                                <option>Chose Category</option>
                                                <option value="mealbox">Meal Box</option>
                                                <option value="sweets">Sweets</option>
                                                <option value="snack">Snack</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <h6 className="mb-3">Upload Image</h6>
                                            <div className="row">
                                                <div className="col">
                                                    <input type="file" onChange={this.imageLanggananAdd}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 mt-3">
                                            <div>
                                                <h5 className='text-center'>ADD ONE SCHEDULE</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                {
                                                    this.state.tambahJadwal
                                                    ?
                                                    <>
                                                        {
                                                            this.state.tambahJadwalDariMenuClick
                                                            ?
                                                            <>  
                                                                <div className="col-12">
                                                                    <div className="row">
                                                                        <div className="col-12 mt-3 text-center">
                                                                            <select onChange={this.getMenuTambahJadwal}>
                                                                                <option>Please Choose Menu</option>
                                                                                    {this.renderPilihanMenuUntukTambah()}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-12 text-center">
                                                                            <Button variant="secondary" className="mt-3" onClick={() => this.setState({tambahJadwal: false, tambahJadwalDariMenuClick: false, inputNamaMenuBaru: '', inputDeskripsiMenu: '', selectedNewMenu: ''})}>Back</Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <div className="col-12">
                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <div className="col-12">
                                                                                <label htmlFor="inputPlaceholderEx">Menu Name</label>
                                                                                <input placeholder="Input Menu Name" type="text" id="inputPlaceholderEx" className="form-control mb-3" onChange={(e) => this.setState({inputNamaMenuBaru: e.target.value})}/>
                                                                            </div>
                                                                            <div className="col-12">
                                                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                                                    <Form.Label>Description</Form.Label>
                                                                                    <Form.Control as="textarea" rows="3" placeholder="Input Menu Description" onChange={(e) => this.setState({inputDeskripsiMenu: e.target.value})}/>
                                                                                </Form.Group>
                                                                            </div>   
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-12 text-center">
                                                                            <Button variant="secondary" onClick={() => this.setState({tambahJadwal: false, tambahJadwalDariMenuClick: false, inputNamaMenuBaru: '', inputDeskripsiMenu: '', selectedNewMenu: ''})}>Back</Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        <div className="col-6 text-center">
                                                            <Button variant="secondary" onClick={() => this.getAllMenuTambahJadwal()}>List Menu</Button>
                                                        </div>
                                                        <div className="col-6 text-center">
                                                            <Button variant="secondary" onClick={() => this.setState({tambahJadwalDariMenuClick: false, tambahJadwal: true})}>New Menu</Button>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 my-3 text-center">
                                            {
                                                this.state.tambahPaketClicked
                                                ?
                                                <Spinner animation="border" variant="secondary"/>
                                                :
                                                // <input className="btn btn-block btn-success" type="reset" value="ADD PACKAGE"></input>
                                                <Button variant="success" className="btn btn-block" onClick={this.tambahPaketLanggananDanJadwal}>ADD PACKAGE</Button>
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default connect(null, {updateSubscribe})(ManagePaketBaru);