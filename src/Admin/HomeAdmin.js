import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Spinner, Modal, Button, Col, Row } from 'react-bootstrap';
import '../Css/HomeAdmin.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
} from "react-router-dom";
import Menu from './Menu';
import User from './ManageUser';
import ProductAdmin from './ProductAdmin';
import OrderAdmin from './OrderAdmin';
import StatisAdmin from './StatisAdmin';
import { MdRestaurantMenu } from "react-icons/md";
import { IoFastFoodOutline } from 'react-icons/io5';
import { FaReceipt } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { BiLogOut, BiUserCircle, BiDish } from 'react-icons/bi';
import { TiThMenu } from 'react-icons/ti'
import AddMenu from './AddMenu';
function updateSize() {
    // setSize([window.innerWidth, window.innerHeight]);
    let navAdmin = document.getElementsByClassName('navbar-admin')[0];
    let btnAn = document.getElementsByClassName('btn-an')[0];
    let ss = window.innerWidth;
    if (ss > 780) {
        setTimeout(() => {
            navAdmin.style.display = 'block';
        }, 50)
    } else {
        btnAn.style.position = "";
        btnAn.style.left = "";
        navAdmin.style.display = 'none';
    }
}

export default function HomeAdmin() {
    let [permission, setPermisson] = useState(false);
    let [timeCurrent, setTimeCurrent] = useState('');
    let history = useHistory();
    var [loading, setLoading] = useState(false);
    const [showLogout, setShowLogut] = useState(false);
    const handleClose = () => setShowLogut(false);
    const handleShow = () => setShowLogut(true);
    function myTimer() {
        let thistime = new Date();
        setTimeCurrent(thistime.toLocaleTimeString());
    }
    useEffect(() => {
        // setInterval(myTimer,1000);
        window.addEventListener('resize', updateSize);
        const keyAdmin = localStorage.getItem('keyAdmin');
        if (keyAdmin == 'admin') {
            setPermisson(true);
        }
        document.getElementsByClassName("header-nav")[0].style.display = 'none';
        document.getElementsByClassName("footer")[0].style.display = 'none';
    }, [])
    function HandleLogout() {
        setLoading(true);
        setTimeout(() => {
            localStorage.removeItem('keyAdmin');
            history.replace('/admin');
            setLoading(false);
        }, 1500)
    }
    let ModalLogout = () => {
        return (
            <Modal
                show={showLogout}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đăng xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn đăng xuất ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={() => HandleLogout()}>Chắc chắn</Button>
                </Modal.Footer>
            </Modal>
        )
    };
    function handleHideNavBarr() {
        let navAdmin = document.getElementsByClassName('navbar-admin')[0];
        let btnAn = document.getElementsByClassName('btn-an')[0];
        let w = window.innerWidth;
        if (w < 780) {
            btnAn.style.position = "";
            btnAn.style.left = "";
            navAdmin.style.display = 'none';
        }
    }
    function handleShowNavBarr() {
        let navAdmin = document.getElementsByClassName('navbar-admin')[0];
        let btnAn = document.getElementsByClassName('btn-an')[0];
        console.log("Show nào" + navAdmin.style.display)
        if (navAdmin.style.display == 'none' || navAdmin.style.display == '') {
            navAdmin.style.display = 'block';
            btnAn.style.position = "fixed";
            btnAn.style.zIndex = "100";
            btnAn.style.left = "70%";
        } else if (navAdmin.style.display == 'block') {
            btnAn.style.position = "";
            btnAn.style.left = "";
            navAdmin.style.display = 'none';
        }
    }
    return (
        <Router>
            {!loading ?
                (<div>
                    {permission &&
                        <div >
                            <Row >
                                <Col xl={2} md={3} xs={0}>
                                    <Navbar className="flex-column navbar-admin" style={{ height: 1000 }} collapseOnSelect expand="lg" bg="dark" variant="dark">
                                        <Container className="flex-column" style={{ width: '100%' }}>
                                            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                                            {/* <Navbar.Collapse style={{ width:'100%' }}  className="flex-column"  > */}
                                            <Navbar.Brand style={{ textAlign: 'center' }} href="#home"><h4>May Beauty</h4></Navbar.Brand><br />
                                            <span style={{ textAlign: 'center', color: 'white' }}><BiDish size={20} /> Chúc bạn có một ngày buôn may bán đắt !!!</span>
                                            <span style={{ textAlign: 'center', color: 'white' }}>{timeCurrent}</span>
                                            <Nav style={{ width: '100%' }} className="me-auto flex-column" defaultActiveKey="#statis" >
                                                <Nav.Link onClick={() => { handleHideNavBarr(); window.scroll(0, 0) }} as={Link} to={"/homeadmin/statis"} className="itemadmin" href="#statis">
                                                    <GoGraph />    Tổng quan</Nav.Link>
                                                <Nav.Link onClick={() => { handleHideNavBarr(); window.scroll(0, 0) }} as={Link} to={"/homeadmin/order"} className="itemadmin" href="#order">
                                                    <FaReceipt />     Hóa đơn</Nav.Link>
                                                <Nav.Link onClick={() => { handleHideNavBarr(); window.scroll(0, 0) }} as={Link} to={"/homeadmin/product"} className="itemadmin" href="#product">
                                                    <IoFastFoodOutline />   sản phẩm</Nav.Link>
                                                <Nav.Link onClick={() => { handleHideNavBarr(); window.scroll(0, 0) }} as={Link} to={"/homeadmin/menu"} className="itemadmin" href="#menu">
                                                    <MdRestaurantMenu />    Danh mục</Nav.Link>
                                                <Nav.Link onClick={() => { handleHideNavBarr(); window.scroll(0, 0) }} as={Link} to={"/homeadmin/user"} className="itemadmin" href="#user">
                                                    <BiUserCircle />    Người dùng</Nav.Link>
                                                <Nav.Link onClick={() => setShowLogut(true)} activeClassName="active" className="itemadmin" >
                                                    <BiLogOut />    Đăng xuất</Nav.Link>
                                            </Nav>
                                            {/* </Navbar.Collapse> */}
                                        </Container>
                                    </Navbar>
                                </Col>
                                <Col xl={10} md={9} xs={12} >
                                    <div >
                                        <Button variant="outline-dark" onClick={() => handleShowNavBarr()} className="btn-an"><TiThMenu /></Button>
                                        <Switch>
                                            <Route path="/homeadmin/menu">
                                                <Menu />
                                            </Route>
                                            <Route path="/homeadmin/product">
                                                <ProductAdmin />
                                            </Route>
                                            <Route path="/homeadmin/order">
                                                <OrderAdmin />
                                            </Route>
                                            <Route path="/homeadmin/statis">
                                                <StatisAdmin />
                                            </Route>
                                            <Route path="/homeadmin/addMenu">
                                                <AddMenu />
                                            </Route>
                                            <Route path="/homeadmin/user">
                                                <User />
                                            </Route>

                                        </Switch>

                                    </div>
                                </Col>
                            </Row>
                            {ModalLogout()}
                        </div>
                    }

                    {!permission &&
                        <div style={{ width: '100%', textAlign: 'center', paddingTop: '20%' }}>
                            <p><h3>Bạn không có quyền truy cập, vui lòng đăng nhập tài khoản quản lý...</h3></p>
                        </div>
                    }
                </div>)
                : (
                    <Spinner style={{ position: 'absolute', bottom: '50%', left: '50%' }} animation="border" role="status" variant="danger" >
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
        </Router>
    )
}