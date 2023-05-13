import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useHistory } from 'react-router-dom'
import { Row, Form, Button, Modal } from 'react-bootstrap'
import { link } from '../Utils/Link';
import axios from 'axios';
import * as FetchAPI from '../Utils/FetchAPI';
import { FcApproval } from 'react-icons/fc';
export default function AddMenu() {
    const history = useHistory();
    const [dataAdd, setdataAdd] = useState({ tendanhmuc: '', hinhanh: '' });
    const [statusImg, setStatusImg] = useState(false);
    const [statusName, setStatusName] = useState(false);
    const imageRef = useRef()
    const [showSuccess, setShowSucess] = useState(false);
    const handleClose = () => setShowSucess(false);

    function useDisplayImage() {
        const [result, setResult] = useState("");
        function uploader(e) {
            const imageFile = e.target.files[0];
            if (imageFile) {
                const reader = new FileReader();
                reader.addEventListener("load", (e) => {
                    setResult(e.target.result);
                });
                setStatusImg(false);
                reader.readAsDataURL(imageFile);
                reader.onload = (e) => {
                    setResult(e.target.result);
                }
            } else {
                setResult(false);
            }
        }
        return { result, uploader };
    }
    const { result, uploader } = useDisplayImage();
    const handleCheck = () => {
        if (dataAdd.tendanhmuc == "") {
            setStatusName(true);
        } else {
            handleUpload();
        }
    }
    const handleUpload = () => {
        const formData = new FormData();
        formData.append('fileToUpload', dataAdd.hinhanh);
        axios.post(link + "upload.php", formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                // handle success
                console.log(response.data.result);
                handleAddMenu(response.data.result);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    const handleAddMenu = async (linkimg) => {
        console.log(linkimg)
        const data = {
            "TENDANHMUC": dataAdd.tendanhmuc,
            "HINHANH": "uploads/" + linkimg,
        }
        const res = await FetchAPI.postDataApi(link + "addMenu.php", data);
        if (res.result == "successfully") {
            console.log("Thành công");
            setShowSucess(true);
        }
        else {
            console.log(res)
            console.log("Thất bại");
        }
    }

    let ModalSuccess = () => {
        return (
            <Modal
                show={showSuccess}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Successfully !!!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <h5>Thêm sản phẩm thành công</h5>
                    <FcApproval size={80} />
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="primary" onClick={() => { handleClose(); window.location.reload(); }}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    };
    return (
        <div style={{ padding: "20px 20px" }}>
            <ModalSuccess />
            <AiOutlineArrowLeft
                style={{ fontSize: 24, marginRight: 20, cursor: 'pointer' }}
                onClick={() => history.goBack()}
            />
            <span style={{ fontWeight: 'bold' }}>Thêm mới danh mục</span>
            <Row lg={2} xs={1}>
                <Form className="formadd " style={{ paddingLeft: 20 }}>
                    <Row >
                        <Form.Group >
                            <Form.Label className="lableadd">Tên danh mục</Form.Label>
                            <div style={{ width: 280 }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên danh mục"
                                    value={dataAdd.tendanhmuc}
                                    onChange={e => setdataAdd({ ...dataAdd, tendanhmuc: e.target.value })} />
                            </div>
                            <div style={{ paddingLeft: 10, paddingTop: 10, color: 'red' }}>
                                {statusName && <span >Vui lòng nhập tên sản phẩm</span>}
                            </div>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3">
                            <Form.Label className="lableadd">Ảnh mô tả danh mục</Form.Label>
                            <Form.Control
                                type="file"
                                name="fileToUpload"
                                accept="image/*"
                                id="fileToUpload"
                                onChange={(e) => {
                                    setdataAdd({ ...dataAdd, hinhanh: e.target.files[0] });
                                    uploader(e);
                                }}
                            />
                            {result && <img style={{ paddingTop: 20 }} width={150} height={150} ref={imageRef} src={result} alt="" />}
                            <div style={{ paddingTop: 10, color: 'red' }}>
                                {statusImg && <span >Vui lòng chọn ảnh</span>}
                            </div>
                        </Form.Group>
                    </Row>
                </Form>
            </Row>
            <Button onClick={() => handleCheck()} variant="danger">Thêm mới</Button>
        </div>
    )
}