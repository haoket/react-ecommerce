import React, { useState, useEffect } from 'react';
import './Css/App.css';
import { Navbar, Form, Nav, Button, FormControl, NavDropdown, Spinner, Modal, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from './Component/Home';
import FullFood from './Component/FullFood';
import Details from './Component/Details';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import Cart from './Component/Cart';
import FoodByMenu from './Component/FoodByMenu';
import logofoot from './images/logo_foot1.jpg';
import { IoLogoFacebook } from 'react-icons/io5';
import { SiGmail } from 'react-icons/si';
import { FaPhone } from 'react-icons/fa';
import arrowtop from './images/arrowtop.png'
import Admin from './Admin/Admin';
import HomeAdmin from './Admin/HomeAdmin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import bgfooter from './images/bg-footer.jpg';
import * as FetchAPI from './Utils/FetchAPI';
import { link } from './Utils/Link';


export default function App() {
  var [showLogin, setshowLogin] = useState(true);
  var [user, setUser] = useState('');
  var [loading, setLoading] = useState(false);
  var [itemDanhmuc, setItemdanhmuc] = useState([]);

  const [showLogout, setShowLogut] = useState(false);
  const handleClose = () => setShowLogut(false);
  const handleShow = () => setShowLogut(true);
  const [top, setTop] = useState(true);


  useEffect(() => {
    //Scroll navbar 
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 100;
      // console.log(isTop);
      setTop(isTop)
    });
    //Scroll navbar

    getDanhmuc();
    var getToken = localStorage.getItem('keyToken');
    if (!getToken == '') {
      setshowLogin(false);
      getUser(getToken);
    } else {
      setshowLogin(true);
    }
  }, [])

  // useEffect(async()=>{
  //   const data = {
  //     id : "12345"
  //   }
  //   const res = await FetchAPI.postDataApi('/users/testPost',data);
  //   console.log("Có đến được đây "+res.idResult);
  // },[]) 


  async function getUser(token) {
    const res = await FetchAPI.postDataApi(link + "checkToken.php", { "token": token })
    getInfor(res.id);

  }
  async function getInfor(id) {
    const res = await FetchAPI.postDataApi(link + "getUserById.php", { "ID": id })
    setUser(res.HoTen);
    console.log("Tên của khách", res.HoTen)
  }
  function getDanhmuc() {
    let item = [];
    fetch(link + 'getdanhmuc.php')
      .then((reponse) => reponse.json())
      .then((reponseJson) => {

        for (let i = 0; i <= reponseJson.length; i++) {
          const locafoodmenu = {
            pathname: `/foodmenu/${"id=" + reponseJson[i].iddanhmuc}`,
            state: {
              id: reponseJson[i].iddanhmuc,
              tendanhmuc: reponseJson[i].tendanhmuc,
            }
          }
          item.push(
            <NavDropdown.Item href={"#foodmenu" + reponseJson[i].iddanhmuc} as={Link} to={locafoodmenu}>{reponseJson[i].tendanhmuc}</NavDropdown.Item>
          )
        };
      })
      .catch((err) => {
        console.log(err);
      });
    setItemdanhmuc(item);
  }

  function logout() {
    setLoading(true);
    localStorage.removeItem('keyToken');
    setTimeout(() => {
      setLoading(false);
      setshowLogin(true);
      handleClose();
    }, 1000);
  }
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 100);
  }

  const ModalLogout = () => {
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
          <Button variant="danger" onClick={() => logout()}>Có</Button>
        </Modal.Footer>
      </Modal>
    )
  };
  const footer = () => {
    return (
      <div className="footer" >

        <div style={{ backgroundImage: `url(${bgfooter})`, width: '100%', height: 20 }} />
        <div style={{ width: '100%', backgroundColor: 'black', color: 'white', paddingTop: 30, paddingBottom: 20, fontSize: 15 }}>
          <Container>
            <Row>
              <Col md={5} sm={12}>
                <p style={{ fontSize: 18 }}><b>Cửa hàng May Beauty </b></p><br />
                <p>Cửa hàng chúng tôi tự hào là một trong những Cửa hàng nổi tiếng tại Thành phố Đà Nẵng,
                  chuyên về các sản phẩm mỹ phẩm chất lượng.</p><br />
                <span>Sự uy tín là yêu cầu tất yếu của chúng tôi mang đến cho khách hàng.
                  Quý khách chắc chắn sẽ hài lòng về chất lượng sản phẩm và dịch vụ của chúng tôi.</span>
              </Col>
              <Col md={3} sm={12}>
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <Image className="logofoot" width="80%" height={200} src={logofoot} ></Image>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingBottom: 20 }}>

                  <a href="https://www.facebook.com/dinhhduc.2406/"><IoLogoFacebook className="iconcontact" size={28} color="white" /></a>
                  <a onClick={() => { window.open('mailto:dinhduc2406@gmail.com?subject=Chủ%20đề%20cần%20phản%20hồi&body=Phản%20hồi%20của%20bạn') }} href="#"><SiGmail className="iconcontact" size={28} color="white" /></a>
                  <a href="#"><FaPhone className="iconcontact" size={28} color="white" /></a>
                </div>

              </Col>
              <Col md={4} sm={12}>
                <p style={{ fontSize: 18 }}><b>Thông tin liên hệ</b></p>
                <ul>
                  <li>
                    <p>Địa chỉ : Hòa Hải - Quận Ngũ Hành Sơn - Thành phố Đà Nẵng</p>
                  </li>
                  <li>
                    <p>Điện thoại : 0777899252</p>
                  </li>
                  <li>
                    <p>Email : test@gmail.com</p>
                  </li>

                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div style={{ width: '100%', height: 25, backgroundColor: "#5b5b5b", color: 'white', textAlign: 'center' }}>
          <p> Copyright 2022 © May Beauty </p>
        </div>
      </div>
    )
  }
  return (
    <Router>
      {!loading ? (
        <div className="App">
          <Navbar className="header-nav" style={top ? { width: '100%' } : { position: 'fixed', width: '100%', top: 0, elevation: 10, zIndex: 100 }} collapseOnSelect expand="lg" bg="info" variant="dark" >
            <Navbar.Brand as={Link} to={"/"} ><b>May Beauty </b></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" >
              <Nav
                className="mr-auto my-2 my-lg-0"
                style={{ maxHeight: '100px', color: 'white' }}
                defaultActiveKey="#home"
                navbarScroll>
                <Nav.Link onClick={() => window.scroll(0, 0)} href="#home" as={Link} to={"/home"}>Trang chủ</Nav.Link>

                {              /*  <Nav.Link onClick={() => window.scroll(0, 0)} href="#banan">Bàn ăn</Nav.Link>*/}
                <NavDropdown href="#foodmenu" title="Danh mục sản phẩm" id="navbarScrollingDropdown">

                  {/* <NavDropdown.Divider /> */}
                  {itemDanhmuc}
                </NavDropdown>
                <Nav.Link onClick={() => window.scroll(0, 0)} href="#full" as={Link} to={"/fullfood"} >
                  Tất cả sản phẩm
                </Nav.Link>
                {showLogin && <Nav.Link onClick={() => window.scroll(0, 0)} href="#action7" as={Link} to={"/login"} >Đăng nhập</Nav.Link>}
                {!showLogin && <Nav.Link onClick={() => window.scroll(0, 0)} href="#action7" onClick={() => handleShow()} >{user} (Đăng xuất)</Nav.Link>}
                <Nav.Link onClick={() => window.scroll(0, 0)} href="/cart" as={Link} to={"/cart"}>Giỏ hàng</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Sản phẩm bạn muốn tìm kiếm..."
                  className="mr-2"
                  aria-label="Search"
                />
                <Button style={{ width: 150 }} variant="outline-light">Tìm kiếm</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/fullfood">
              <FullFood />
            </Route>
            <Route path="/details">
              <Details />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/foodmenu">
              <FoodByMenu />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/homeadmin">
              <HomeAdmin />
            </Route>
            <Route path="/">
              <Home />
            </Route>

          </Switch>
          {!top &&
            <ReactCSSTransitionGroup
              transitionName="UpDown"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionLeaveTimeout={300}>

              <div onClick={() => window.scroll(0, 0)} className="arrowTop" style={{ position: 'fixed', bottom: 0, right: 0, elevation: 10, zIndex: 100 }}>
                <Image width={30} height={30} src={arrowtop} />
              </div>
            </ReactCSSTransitionGroup>

          }

          {ModalLogout()}
          {footer()}
        </div>
      )
        : (
          <Spinner style={{ position: 'absolute', bottom: '50%', left: '50%' }} animation="border" role="status" variant="danger" >
            <span className="sr-only">Loading...</span>
          </Spinner>
        )
      }
    </Router>


  );
}


