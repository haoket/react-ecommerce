import React, { useEffect, useState } from 'react';
import { Form, FormControl, Button, Row, Pagination, Modal, Col } from 'react-bootstrap';
import ItemProductAdmin from './ItemProductAdmin';
import { getPriceVND } from '../Contain/getPriceVND';
import * as FetchAPI from '../Utils/FetchAPI';
import { link } from '../Utils/Link';

export default function ManageProduct() {
    let [mangsanphamFull, setMangsanphamFull] = useState([]);
    let [mangsanpham, setmangsanpham] = useState([]);
    let [arrDetails, setarrDetails] = useState([]);
    let [itemPagination, setItemPagination] = useState([]);
    let [active, setActive] = useState(1);
    let [page, setPage] = useState(1);
    let [length, setLength] = useState();
    let [tensanpham, setTensanpham] = useState();
    let [giasanpham, setGiasanpham] = useState();
    const [statusRadio, setStatusRadio] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleCloseEdit = () => setShowModalEdit(false);
    const handleCloseDelete = () => setShowModalDelete(false);
    const handleShowEdit = () => setShowModalEdit(true);
    const handleShowDelete = () => setShowModalDelete(true);
    const handleArr = (item) => setarrDetails(item);


    useEffect(() => {
        getFullsanpham();
    }, [])
    async function getFullsanpham() {
        try {
            const res = await FetchAPI.getDataApi(link + "getFullsanpham.php");
            setLength(Math.ceil(res.length / 6));
            getsanpham(active);
            pagination(active, Math.ceil(res.length / 6));
        } catch (error) {
        }

    }
    async function getsanpham(ac) {
        try {
            const res = await FetchAPI.getDataApi(link + "getFullsanphamPage.php?trang=" + ac);
            setmangsanpham(res);
            setMangsanphamFull(res);
        } catch (error) {

        }
    }

    const product = mangsanpham.map((item, type) => {
        return (
            <div style={{ marginTop: 15, width: 800 }}>
                <ItemProductAdmin
                    status={item.status}
                    ten={item.ten}
                    hinhanh={item.hinhanh}
                    gia={getPriceVND(item.gia) + " đ / 1 phần"}
                    id={item.id}
                    shownModal={() => {
                        handleShow();
                        setTensanpham(item.ten);
                        setGiasanpham(item.gia);
                        if (item.status == "1") {
                            setStatusRadio(false);
                        } else if (item.status == "0") {
                            setStatusRadio(true);
                        }
                    }}
                    setArr={() => handleArr(item)}
                />
            </div>
        )
    })
    function updateSearch(search) {
        let newDataF = [];
        mangsanphamFull.map((e) => {
            if (e.ten.indexOf(search.target.value) !== -1) {
                newDataF.push(e)
            }
        })
        setmangsanpham(newDataF);
    }

    async function DeleteProduct() {
        try {
            const data = { "ID": arrDetails.id };
            console.log('id san pham', data)
            const res = await FetchAPI.postDataApi(link + "removeProduct.php", data);
            if (res.result == "successfully") {
                console.log("Thành công");
                window.location.reload();
                alert('Xoá sản phẩm thành công')
            }
            else if (res.result == "error") {
                console.log("Thất bại")
                alert('Thất bại')
            }
        } catch (error) {

        }
    }


    async function editFood() {
        let s = "0";
        if (statusRadio == false) {
            s = "1";
        }
        else if (statusRadio == true) {
            s = "0";
        }
        try {
            const data = {
                "TEN": tensanpham,
                "ID": arrDetails.id,
                "GIA": giasanpham,
                "STATUS": s
            }
            const res = await FetchAPI.postDataApi(link + "editFood.php", data);
            if (res.result == "successfully") {
                console.log("Thành công");
                window.location.reload();
            }
            else if (res.result == "error") {
                console.log("Thất bại")
            }
        } catch (error) {
        }
    }
    const ModalEdit = () => {
        return (
            <Modal
                show={showModalEdit}
                onHide={handleCloseEdit}
                backdrop="static"
                keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Bạn chắc chắn muốn sửa sản phẩm này</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { handleCloseEdit(); handleShow() }}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={() => editFood()}>Chắc chắn</Button>
                </Modal.Footer>

            </Modal>
        )
    }
    const ModalDelete = () => {
        return (
            <Modal
                show={showModalDelete}
                onHide={handleCloseDelete}
                backdrop="static"
                keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Bạn chắc chắn muốn xoá sản phẩm này</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { handleCloseDelete(); handleShow() }}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={() => DeleteProduct()}>Chắc chắn</Button>
                </Modal.Footer>

            </Modal>
        )
    }
    const ModalItem = () => {
        return (
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sửa sản phẩm {arrDetails.ten} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col style={{ display: 'flex', alignItems: 'center' }} xs={4}><b>Tên sản phẩm :</b></Col>
                            <Col xs={8}>
                                <input
                                    className="editFood"
                                    name="tensanpham"
                                    value={tensanpham}
                                    onChange={e => setTensanpham(e.target.value)}
                                />
                                <br />
                            </Col>
                        </Row>

                        <Row>
                            <Col style={{ display: 'flex', alignItems: 'center' }} xs={4}><b>Giá : </b> </Col>
                            <Col xs={8}>
                                <input
                                    className="editFood"
                                    name="giasanpham"
                                    value={giasanpham}
                                    onChange={e => setGiasanpham(e.target.value)} />
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4}><b>Trạng thái sản phẩm : </b> </Col>
                            <Col xs={8}>
                                <Form.Group style={{ display: 'flex', flexDirection: 'row' }} id="formGridRadio">
                                    <Col xs={6}>
                                        <Form.Check onClick={() => setStatusRadio(true)} style={{ width: 20 }} type="radio" label="Còn hàng" checked={statusRadio} />
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Check onClick={() => setStatusRadio(false)} style={{ width: 20 }} type="radio" label="Hết hàng" checked={!statusRadio} />
                                    </Col>
                                </Form.Group>
                                <br />
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                    <Button variant="primary" onClick={() => { handleShowEdit(); handleClose() }}>Chỉnh sửa</Button>
                    <Button variant="danger" onClick={() => { handleShowDelete(); handleClose() }}>Xoá</Button>



                    {/* <Dropdown.Item onClick={() => { setDeletePayment(true); setIdhoadon(row.MaHD) }} href="#">
                                            Xóa đơn
                                        </Dropdown.Item> */}
                </Modal.Footer>
            </Modal>
        )
    };
    // Xử lý phân trang
    function pagination(ac, l) {
        let item = [];
        for (let number = 1; number <= l; number++) {
            item.push(
                <Pagination.Item key={number} active={number === ac} onClick={() => { pagination(number, l); window.scroll(0, 0) }}>
                    {number}
                </Pagination.Item>
            )
        }
        console.log("Độ dài của mảng", l);
        setPage(ac);
        getsanpham(ac);
        setItemPagination(item);
    }
    function nextPagination() {
        if (active < length) {
            setActive(active + 1);
            pagination(active + 1, length);
            window.scroll(0, 0);
        }
    }
    function prevPagination() {
        if (active > 1) {
            setActive(active - 1);
            pagination(active - 1, length);
            window.scroll(0, 0);
        }
    }
    // Xử lý phân trang
    return (
        <div style={{ padding: 20 }}>
            <Row className="justify-content-between" style={{ paddingBottom: 30 }}>
                <h4> Quản lý sản phẩm </h4>
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Tìm kiếm theo tên sản phẩm ..."
                        className="mr-2"
                        aria-label="Search"
                        onChange={(value) => updateSearch(value)}
                    />
                    <Button style={{ width: 150 }} variant="outline-danger">Tìm kiếm</Button>
                </Form>
            </Row>
            <Row className="justify-content-xs-center" style={{ width: '100%' }} sm={12} xs={12} md={12} lg={2} xl={3} >
                {product}
            </Row>
            <div>
                <Pagination style={{ paddingTop: 30, justifyContent: 'center' }}>
                    <Pagination.First onClick={() => { setActive(1); pagination(1, length); window.scroll(0, 0) }} />
                    <Pagination.Prev onClick={() => prevPagination()} />
                    {itemPagination}
                    <Pagination.Next onClick={() => nextPagination()} />
                    <Pagination.Last onClick={() => { setActive(length); pagination(length, length); window.scroll(0, 0) }} />
                </Pagination>
            </div>
            {ModalItem()}
            {ModalEdit()}
            {ModalDelete()}
        </div>
    )
}