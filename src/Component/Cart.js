import React, { useState, useEffect } from 'react';
import { link } from '../Utils/Link';
import { Image, Row, Col, Button, Modal, Toast, Card } from 'react-bootstrap'
import * as FetchAPI from '../Utils/FetchAPI';
import { getPriceVND } from '../Contain/getPriceVND';
import icon_success from '../images/success-24.png';
import setHTTP from '../Utils/setHTTP';
import Product from '../Admin/ItemProductBill';


export default function Cart() {
    const [dataCart, setdataCart] = useState([]);
    const [showCartEmpty, setshowCartEmpty] = useState(false);
    const [showCartOrder, setshowCartOrder] = useState(false);
    const [showContent, setshowContent] = useState();
    const [total, settotal] = useState();
    const [showModalPayment, setshowModalPayment] = useState(false);
    const [showToast, setshowToast] = useState(false);
    const [dataFullMenu, setdataFullMenu] = useState([]);
    const [dataItem, setDataItem] = useState([]);
    const [arrFood, setArrFood] = useState([]);
    const handleShowModal = () => setShowModal(true);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        getCart()
    }, [])

    useEffect(() => {
        getFullMenu();
    }, [])

    const elements = arrFood.map((item, type) => {
        return (
            <Product
                ten={item.ten}
                hinhanh={item.hinhanh}
                gia={getPriceVND(item.gia) + " đ / 1 phần"}
                soluong={item.soluong}
                id={item.id}
                tong={item.soluong * item.gia}
            />
        )
    }, []);
    const getFullMenu = async () => {

        const token = await localStorage.getItem('keyToken');
        const user = await FetchAPI.postDataApi(link + "checkToken.php", { "token": token })
        if (user) {
            const idUser = user.id
            if (user) {
                { setshowCartOrder(true) }
            }
            console.log('id user là', user)
            const data = { "IDUSER": idUser }

            const res = await FetchAPI.postDataApi(link + "getBillCustomers.php", data)
            setdataFullMenu(res)
            console.log('data full menu', res)
        }
    }


    async function handleFood(arr) {
        try {
            let x = JSON.parse(arr);
            let arrtemp = [];
            for (var i = 0; i < x.length; i++) {
                const data = {
                    "IDsanpham": x[i].id,
                    "SOLUONG": x[i].soluong
                }
                const res = await FetchAPI.postDataApi(link + "getsanphamById.php", data);
                arrtemp.push(res);
            }
            setArrFood(arrtemp);
            handleShowModal();
            window.scroll(0, 0);
        } catch (error) {

        }
    }

    function setIconStatus(i) {
        if (i == 0) {
            return (
                <p >Đang xử lý</p>
            )
        } else if (i == 1) {
            return (
                <p >Đang giao</p>
            )
        } else {
            return (
                <p >Đã giao thành công</p>)
        }
    }
    const getCart = async () => {
        let arr = [];
        const StringCartCurrent = await localStorage.getItem('@cart');
        let arrCartCurrent = JSON.parse(StringCartCurrent);
        if (StringCartCurrent == null) {
            getDataCart(arr);
        } else {
            getDataCart(arrCartCurrent);
        }
    }
    const getDataCart = async (arrCartCurrent) => {
        let arrTmp = [];
        if (arrCartCurrent.length == 0) {
            setshowContent(true);
            setshowCartEmpty(true);
            setdataCart(arrTmp);
        } else {
            for (let i = 0; i < arrCartCurrent.length; i++) {
                const data = {
                    "IDsanpham": arrCartCurrent[i].id,
                    "SOLUONG": arrCartCurrent[i].soluong
                }
                const res = await FetchAPI.postDataApi(link + "getsanphamById.php", data);
                arrTmp = arrTmp.concat(res);
                if (i == arrCartCurrent.length - 1) {
                    console.log(arrTmp)
                    setdataCart(arrTmp);
                    handleGetTotal(arrTmp);
                }
            }
        }
    }
    const handleGetTotal = (arrTmp) => {
        let totalTmp = 0;
        arrTmp.map(e => {
            totalTmp += e.gia * e.soluong;
        })
        setshowContent(true);
        settotal(totalTmp);
    }
    const handleSetQuanity = async (strquanity, id) => {
        const quanity = parseInt(strquanity);
        const StringCartCurrent = await localStorage.getItem('@cart');
        let arrCartCurrent = JSON.parse(StringCartCurrent);
        let index = arrCartCurrent.findIndex(x => x.id == id);
        arrCartCurrent[index].soluong = quanity;
        await localStorage.setItem('@cart', JSON.stringify(arrCartCurrent));
        getCart();
    }
    const handleDeleteItem = async (id) => {
        const StringCartCurrent = await localStorage.getItem('@cart');
        let arrCartCurrent = JSON.parse(StringCartCurrent);
        let index = arrCartCurrent.findIndex(x => x.id == id);
        arrCartCurrent.splice(index, 1);
        await localStorage.setItem('@cart', JSON.stringify(arrCartCurrent));
        getCart();
    }
    const handleCheckPayment = async () => {
        const token = await localStorage.getItem('keyToken');
        if (token == null) {
            window.alert("Bạn phải dăng nhập để thanh toán")
        } else {
            handlePayment(token)
        }
    }
    const handlePayment = async (token) => {
        const user = await FetchAPI.postDataApi(link + "checkToken.php", { "token": token })
        const idUser = user.id
        const StringCartCurrent = await localStorage.getItem('@cart');
        const arr = JSON.parse(StringCartCurrent);
        const data = {
            "MANGsanpham": arr,
            "STATUS": 0,
            "TONGTIEN": total,
            "IDUSER": idUser
        }
        const res = await FetchAPI.postDataApi(link + "addBill.php", data);
        if (res.result == "successfully") {
            await localStorage.removeItem('@cart');
            getDataCart([]);
            setshowToast(true)
            setshowModalPayment(false)
        } else {
            setshowModalPayment(false)
        }
    }
    const ItemProduct = dataCart.map((item, index) => {
        return (
            <div style={{ boxShadow: "2px 2px 10px #00000026", margin: "10px 0px", flexDirection: 'row', display: 'flex', padding: 10 }}>
                <div>
                    <Image src={setHTTP(item.hinhanh)} width={150} height={120} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20, justifyContent: 'space-around' }}>
                    <span style={{ fontWeight: 'bold' }}>{item.ten}</span>
                    <span>{getPriceVND(item.gia * item.soluong) + " đ / 1 phần"}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1, alignItems: 'center', paddingRight: 20 }}>
                    <input
                        type="number"
                        style={{ width: 100, height: 30 }}
                        value={item.soluong}
                        min={1} max={20}
                        onChange={(e) => handleSetQuanity(e.target.value, item.id)}
                    />
                    <Button variant="danger" style={{ marginLeft: 10 }} onClick={() => handleDeleteItem(item.id)}>
                        Xóa
                    </Button>
                </div>
            </div>
        )
    })
    const Summary = () => (
        <div>
            <div style={{ paddingBottom: 20 }}>
                <span>Tổng tiền </span>
                <b>{getPriceVND(total) + " đ"}</b>
            </div>
            <Button onClick={() => setshowModalPayment(true)}>Thanh toán ngay</Button>
        </div>

    )
    const ModalOrder = () => {
        return (
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn</Modal.Title>
                </Modal.Header>
                <iframe id="ifmcontentstoprint" style={{
                    height: '0px',
                    width: '0px',
                    position: 'absolute'
                }}></iframe>
                <Modal.Body >
                    <Row style={{ width: '100%' }} sm={12}  >
                        {elements}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    };
    const ModalPayment = () => (
        <div>
            <Modal show={showModalPayment} onHide={() => setshowModalPayment(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Bạn chắc chắn muốn thanh toán !</Modal.Title>
                </Modal.Header>
                <Modal.Body>{`Hóa đơn với tổng tiền là ${getPriceVND(total)} đ`}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setshowModalPayment(false)}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleCheckPayment}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
    return (
        <div>
            <div style={{ minHeight: 500 }}>
                {showContent &&
                    <div>
                        <div style={{ position: 'fixed', right: 50, top: 80 }}>
                            <Toast onClose={() => setshowToast(false)} show={showToast} delay={3000} autohide>
                                <Toast.Header style={{ display: 'flex', justifyContent: 'space-between' }} closeButton>
                                    <strong className="me-auto">May Beauty</strong>
                                </Toast.Header>
                                <Toast.Body style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Image src={icon_success} width={60} height={60} />
                                    <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10 }}>
                                        <span>Cảm ơn bạn đã thanh toán!</span>
                                        <span>Đơn hàng của bạn đã được ghi nhận</span>

                                    </div>
                                </Toast.Body>
                            </Toast>
                        </div>
                        {showCartEmpty ?

                            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>

                                Giỏ hàng của bạn đang trống....

                            </div>
                            :
                            <div>
                                {ModalPayment()}
                                <Row style={{ margin: 0 }}>
                                    <Col xl={6} lg={6} md={6} xs={12} style={{ padding: 20 }}>
                                        {ItemProduct}
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={12} style={{ padding: 20 }}>
                                        {Summary()}
                                    </Col>
                                </Row>
                            </div>
                        }

                    </div>
                }
                {showCartOrder &&
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: 30, width: '100%' }}>
                            <Row className="justify-content-between" style={{ paddingBottom: 30 }}>
                                <span ><h1>Lịch sử mua hàng</h1></span>
                            </Row>
                            <Card className="cardd" style={{ width: '100%' }}>
                                <table className="tabledanhmuc" style={{ marginTop: 20, width: '100%' }}>
                                    <tr className="trdanhmuc">
                                        <td>STT</td>
                                        <td>Mã hoá đơn</td>
                                        <td>Tổng tiền</td>
                                        <td>Chi tiết</td>
                                        <td>Trạng thái</td>
                                    </tr>

                                    {dataFullMenu.map((row, index) => (
                                        <tr className="trDetails" key={row.idhoadon}>
                                            <td>{index + 1}</td>
                                            <td>{"#" + row.idhoadon}</td>
                                            <td>{row.tongtien}</td>
                                            <td><Button onClick={() => { setDataItem(row); handleFood(row.mangsanpham) }} href="#">...</Button></td>
                                            <td>{setIconStatus(row.status)}</td>



                                        </tr>
                                    ))}
                                </table>
                            </Card>



                        </div>
                    </div>

                }
            </div>

            {ModalOrder()}
        </div >

    )

}
