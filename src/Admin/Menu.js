import React, { useEffect, useState } from 'react';
import * as FetchAPI from '../Utils/FetchAPI';
import { link } from '../Utils/Link';
import setHTTP from '../Utils/setHTTP';
import { Image, Button, Modal, Row, Col, Toast } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import icon_success from '../images/success-24.png';
export default function Menu() {
    const [dataFullMenu, setdataFullMenu] = useState([]);
    const [showModalEdit, setshowModalEdit] = useState(false);
    const [showModalDelete, setshowModalDelete] = useState(false);
    const [itemTmp, setitemTmp] = useState([]);
    const [showToast, setshowToast] = useState(false);
    const history = useHistory();
    useEffect(() => {
        getFullMenu();
    }, [])
    const getFullMenu = async () => {
        const res = await FetchAPI.getDataApi(link + "getFullMenu.php")
        setdataFullMenu(res)
        console.log("data", res)
    }
    const handleEdit = async () => {
        const res = await FetchAPI.postDataApi(link + "updateMenu.php", { "IDDANHMUC": itemTmp.iddanhmuc, "TEMDANHMUC": itemTmp.tendanhmuc });
        if (res.result == "successfully") {
            getFullMenu()
            setshowModalEdit(false)
            setshowToast(true)
        } else {
            console.log("Thất bại")
        }
    }

    const handleDelete = async () => {
        const res = await FetchAPI.postDataApi(link + "deleteMenu.php", { "IDDANHMUC": itemTmp.iddanhmuc });
        if (res.result == "successfully") {
            getFullMenu()
            setshowModalEdit(false)
            setshowToast(true)
        } else {
            console.log("Thất bại")
        }
    }
    const ModalEdit = () => (
        <div>
            <Modal show={showModalEdit} onHide={() => setshowModalEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Chỉnh sửa danh mục ${itemTmp.tendanhmuc} !`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col style={{ display: 'flex', alignItems: 'center' }} xs={4}><b>Tên sản phẩm :</b></Col>
                            <Col xs={8}>
                                <input
                                    className="editMenu"
                                    name="tendanhmuc"
                                    value={itemTmp.tendanhmuc}
                                    onChange={e => setitemTmp({ ...itemTmp, tendanhmuc: e.target.value })}
                                />
                                <br />
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: 20 }}>
                            <Col style={{ display: 'flex', alignItems: 'center' }} xs={4}><b>Hình ảnh :</b></Col>
                            <Col xs={8}>
                                <   Image src={itemTmp.hinhanh} style={{ width: 100, height: 100 }} />
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setshowModalEdit(false)}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleEdit} >
                        Chỉnh sửa
                    </Button>
                    <Button variant="danger" onClick={() => { setshowModalDelete(true); setshowModalEdit(false) }} >
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
    const ModalDelete = () => {
        return (
            <Modal
                show={showModalDelete}
                onHide={() => setshowModalDelete(true)}

                backdrop="static"
                keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Bạn chắc chắn muốn xoá danh mục này</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setshowModalDelete(false)}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete()}>Chắc chắn</Button>
                </Modal.Footer>

            </Modal>
        )
    }
    return (
        <div style={{ padding: "20px 10px", fontWeight: 'bold' }}>
            {ModalEdit()}
            {ModalDelete()}
            <div style={{ position: 'fixed', right: 50, top: 30 }}>
                <Toast onClose={() => setshowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header style={{ display: 'flex', justifyContent: 'space-between' }} closeButton>
                        <strong className="me-auto">May Beauty</strong>
                    </Toast.Header>
                    <Toast.Body style={{ display: 'flex', flexDirection: 'row' }}>
                        <Image src={icon_success} width={60} height={60} />
                        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10 }}>
                            <span>Cập nhật danh mục thành công!</span>
                        </div>
                    </Toast.Body>
                </Toast>
            </div>

            <span style={{ display: 'block', marginBottom: 10 }}> Quản lý danh mục</span>
            <Button variant="danger" onClick={() => history.push("/homeadmin/addmenu")}>Thêm mới</Button>
            <table className="tabledanhmuc" style={{ marginTop: 20, width: '100%' }}>
                <tr className="trdanhmuc">
                    <td>STT</td>
                    <td>Mã danh mục</td>
                    <td>Tên danh mục</td>
                    <td>Hình ảnh minh họa</td>
                    <td>Tùy chọn</td>
                </tr>
                {dataFullMenu.map((row, index) => (
                    <tr className="trDetails" key={row.iddanhmuc}>
                        <td>{index + 1}</td>
                        <td>{"#" + row.iddanhmuc}</td>
                        <td>{row.tendanhmuc}</td>
                        <td><Image src={setHTTP(row.hinhanh)} style={{ width: 100, height: 80 }} /></td>
                        <td>
                            <Button variant="danger" onClick={() => { setshowModalEdit(true); setitemTmp(row) }}>
                                Chỉnh sửa
                            </Button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}
