import React, { useState, useRef, useEffect } from 'react';
import { Form, Row, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import { FcApproval } from 'react-icons/fc';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from './UploadAdapter';
import * as FetchAPI from '../Utils/FetchAPI';
import { link } from '../Utils/Link';

export default function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState("");
    const imageRef = useRef(null);
    const [itemDanhmuc, setItemdanhmuc] = useState([]);
    const [iddanhmuc, setIddanhmuc] = useState('');
    const [statusImg, setStatusImg] = useState(false);
    const [statusMenu, setStatusMenu] = useState(false);
    const [statusName, setStatusName] = useState(false);
    const [statusPrice, setStatusPrice] = useState(false);
    const [statusPriceInt, setStatusPriceInt] = useState(false);
    const [showSuccess, setShowSucess] = useState(false);
    const handleClose = () => setShowSucess(false);
    // const handleShow = () => setShowSucess(true);
    const [dataEditor, setDataEditor] = useState("");

    useEffect(() => {
        getDanhmuc();
    }, [])

    async function getDanhmuc() {
        let item = [];
        let res = await FetchAPI.getDataApi(link + "getdanhmuc.php");
        res.map((e) => {
            item.push(
                {
                    value: e.iddanhmuc,
                    label: e.tendanhmuc
                }
            )
        })
        setItemdanhmuc(item);
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

    function checkNumber(price) {
        if (price.match(/^-?\d+$/)) {
            //valid integer (positive or negative)
            return false;
        } else if (price.match(/^\d+\.\d+$/)) {
            //valid float
            return true;
        } else {
            //not valid number
            return true;
        }

    }
    const handleCheckFile = () => {

        if (name == "") {
            setStatusName(true);
        } else if (price == "") {
            setStatusName(false);
            setStatusPrice(true);
        }
        else if (checkNumber(price)) {
            setStatusName(false); setStatusPrice(false);
            setStatusPriceInt(true);
        }
        else if (iddanhmuc == "") {
            setStatusName(false); setStatusPrice(false); setStatusPriceInt(false);
            setStatusMenu(true);
        }
        else if (image == "" || result == false) {
            setStatusMenu(false); setStatusName(false); setStatusPrice(false); setStatusPriceInt(false);
            setStatusImg(true);
        }
        else {
            handleUpload();
        }

    }

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('fileToUpload', image);
        axios.post(link + "upload.php", formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                // handle success
                console.log(response.data.result);
                handleAddsanpham(response.data.result);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    const handleAddsanpham = async (linkimg) => {
        try {
            const data = {
                "TENsanpham": name,
                "GIA": price,
                "HINHANH": link + "uploads/" + linkimg,
                "DANHMUC": iddanhmuc,
                "MOTA": dataEditor,
            }
            const res = await FetchAPI.postDataApi(link + "addsanpham.php", data);
            console.log(res.result);
            if (res.result == "successfully") {
                console.log("Thành công");
                setShowSucess(true);
            }
            else if (res.result == "error") {
                console.log("Thất bại");
            }
        } catch (error) {
        }
    }
    return (
        <div style={{ paddingTop: 30 }}>
            <h3>Thêm mới sản phẩm</h3>

            <Row lg={2} xs={1}>
                {/* <Card style={{ paddingLeft:30 }}> */}
                <Form className="formadd " style={{ paddingLeft: 20 }}>
                    <Row >
                        <Form.Group >
                            <Form.Label className="lableadd">Tên sản phẩm</Form.Label>
                            <div style={{ width: 280 }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên sản phẩm"
                                    value={name}
                                    onChange={e => setName(e.target.value)} />
                            </div>
                            <div style={{ paddingLeft: 10, paddingTop: 10, color: 'red' }}>
                                {statusName && <span >Vui lòng nhập tên sản phẩm</span>}
                            </div>
                        </Form.Group>

                    </Row>
                    <Row>
                        <Form.Group >
                            <Form.Label className="lableadd">Giá / 1 phần</Form.Label>
                            <div style={{ width: 280 }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập giá"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)} />
                            </div>
                            <div style={{ paddingLeft: 10, paddingTop: 10, color: 'red' }}>
                                {statusPrice && <span >Vui lòng nhập giá cho sản phẩm</span>}
                                {statusPriceInt && <span >Vui lòng nhập định dạng số nguyên</span>}
                            </div>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group  >
                            <Form.Label className="lableadd">Danh mục</Form.Label>
                            {/* <select aria-label=".form-select-lg example">
                    <option selected>Lựa chọn danh mục</option>
                    {itemDanhmuc}
                </select> */}
                            <div style={{ width: 280 }}>
                                <Select
                                    placeholder="Danh mục sản phẩm..."
                                    options={itemDanhmuc}
                                    onChange={({ value }) => setIddanhmuc(value)}
                                />
                            </div>
                            <div style={{ paddingLeft: 10, paddingTop: 10, color: 'red' }}>
                                {statusMenu && <span>Vui lòng chọn danh mục</span>}
                            </div>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3">
                            <Form.Label className="lableadd">Ảnh chính của sản phẩm</Form.Label>
                            <Form.Control
                                type="file"
                                name="fileToUpload"
                                accept="image/*"
                                id="fileToUpload"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
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
                {/* </Card> */}
            </Row>
            <div style={{ marginBottom: 30 }}>
                <h2>Mô tả sản phẩm </h2>
                <CKEditor
                    editor={ClassicEditor}
                    data={dataEditor}
                    // config={{
                    //     ckfinder:{uploadUrl:'http://192.168.43.25/DemoJWT/upload.php'}
                    //  }}
                    // Not use
                    // onInit={(editor) => {
                    //     editor.ui.view.editable.element.style.height = "200px"
                    //     uploadAdapterPlugin(editor)
                    //   }}

                    config={{ extraPlugins: [MyCustomUploadAdapterPlugin] }} //use this to upload image.

                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setDataEditor(data);
                        console.log({ event, editor, data });
                    }}
                />
            </div>
            <Button onClick={() => handleCheckFile()}>Thêm mới</Button>
            {ModalSuccess()}
        </div>

    )
}