import React, { useEffect, useState } from 'react';
import * as FetchAPI from '../Utils/FetchAPI';
import { link } from '../Utils/Link';
import setHTTP from '../Utils/setHTTP';
import { Image, Button, Modal, Row, Col, Toast } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import icon_success from '../images/success-24.png';
export default function User() {
    const [dataFullUser, setdataFullUser] = useState([]);
    const [showModalEdit, setshowModalEdit] = useState(false);

    const [itemTmp, setitemTmp] = useState([]);
    const [showToast, setshowToast] = useState(false);
    const history = useHistory();
    useEffect(() => {
        getFullUser();
    }, [])
    const getFullUser = async () => {
        const res = await FetchAPI.getDataApi(link + "getAllUser.php")
        setdataFullUser(res)
    }
    const handleEdit = async () => {
        const res = await FetchAPI.postDataApi(link + "updateUser.php", { "ID": itemTmp.id, "HOTEN": itemTmp.HoTen, "PHONE": itemTmp.phone, "EMAIL": itemTmp.Email, "ADDRESS": itemTmp.Address });
        if (res.result == "successfully") {
            getFullUser()
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
                    <Modal.Title>{`Chỉnh sửa người dùng`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col style={{ display: 'flex', alignItems: 'center' }} xs={4}><b>Họ Và Tên :</b></Col>
                            <Col xs={8}>
                                <input
                                    className="editUser"
                                    name="HoTen"
                                    value={itemTmp.HoTen}
                                    onChange={e => setitemTmp({ ...itemTmp, HoTen: e.target.value })}
                                />
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ display: 'flex', alignItems: 'center' }} xs={4}><b>Số điện thoại:</b></Col>
                            <Col xs={8}>
                                <input
                                    className="editUser"
                                    name="phone"
                                    value={itemTmp.phone}
                                    onChange={e => setitemTmp({ ...itemTmp, HoTen: e.target.value })}
                                />
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ display: 'flex', alignItems: 'center' }} xs={4}><b>Email :</b></Col>
                            <Col xs={8}>
                                <input
                                    className="editUser"
                                    name="email"
                                    value={itemTmp.Email}
                                    onChange={e => setitemTmp({ ...itemTmp, HoTen: e.target.value })}
                                />
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ display: 'flex', alignItems: 'center' }} xs={4}><b>Địa chỉ :</b></Col>
                            <Col xs={8}>
                                <input
                                    className="editUser"
                                    name="address"
                                    value={itemTmp.Address}
                                    onChange={e => setitemTmp({ ...itemTmp, Address: e.target.value })}
                                />
                                <br />
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
                </Modal.Footer>
            </Modal>
        </div>
    )

    return (
        <div style={{ padding: "20px 10px", fontWeight: 'bold' }}>
            {ModalEdit()}

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

            <span style={{ display: 'block', marginBottom: 10, fontSize: '50px', textTransform: 'uppercase' }}> Quản lý người dùng</span>
            <table className="tabledanhmuc" style={{ marginTop: 20, width: '100%' }}>
                <tr className="trdanhmuc">
                    <td>STT</td>
                    <td>ID User</td>
                    <td>Tên Đăng Nhập</td>
                    <td>Họ Và Tên</td>
                    <td>Số Điện Thoại</td>
                    <td>Email</td>
                    <td>Địa Chỉ</td>
                </tr>
                {dataFullUser.map((row, index) => (
                    <tr className="trDetails" key={row.id}>
                        <td>{index + 1}</td>
                        <td>{"#" + row.id}</td>
                        <td>{row.Username}</td>
                        <td>{row.HoTen}</td>
                        <td>{row.phone}</td>
                        <td>{row.Email}</td>
                        <td>{row.Address}</td>
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
