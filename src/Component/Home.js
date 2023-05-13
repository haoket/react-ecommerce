import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { Link } from 'react-router-dom'
import { Button, Container, Alert, Row, Col, Image } from 'react-bootstrap';
import '../Css/Home.css';
import slide1 from '../images/slide_5.jpg';
import slide2 from '../images/slide_6.jpg';
import slide3 from '../images/slide_7.jpg';
import bg from '../images/bg.jpg';
import fresh from '../images/fresh.png';
import freeparking from '../images/freeparking.png';
import freewifi from '../images/freewifi.png';
import onlineorder from '../images/onlineorder.png';
import ship from '../images/shiptannha.png';
import hoitruong from '../images/phonghoitruong.png';
import bg2 from '../images/bg2.jpg';
import bg4 from '../images/bg4.jpg';
import iconmail from '../images/mail-icon.png';
import iconmap from '../images/map-icon.png';
import iconphone from '../images/phone-icon.png';
import * as FetchAPI from '../Utils/FetchAPI';
import { link } from '../Utils/Link';

export default function Home() {
    const [show, setShow] = useState(false);
    let [product, setProduct] = useState([]);
    const Slideshow = () => {
        return (
            <div>
                <Slide easing="ease" indicators={false}  >
                    <div className="each-slide">
                        <div style={{ backgroundImage: `url(${slide1})` }}>
                            <span>Chào mừng bạn đến với May Beauty  </span>
                            <Button variant="outline-light" onClick={() => { setShow(true); window.scroll(0, 300) }}>Khám phá</Button>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ backgroundImage: `url(${slide2})` }}>
                            <span>Ở đây chúng tôi có những sản phẩm tuyệt vời cho mọi người.</span>

                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ backgroundImage: `url(${slide3})` }}>
                            <span>Và còn nhiều hơn nữa... Hãy khám phá ngay nào</span>
                        </div>
                    </div>
                </Slide>
            </div>
        )
    }
    let elementSale = product.map((item, type) => {
        return (
            <div className="ban-chay">
                <Link to={{ pathname: `/details/${"id=" + item.id}`, state: { id: item.id } }}>
                    <Image className="img-ban-chay" src={item.hinhanh} style={{ width: '80%', height: 200, borderRadius: 20, padding: 15 }}></Image>
                </Link>
                <p style={{ textAlign: 'start', paddingLeft: 30, fontWeight: 'bold' }}>{item.ten}</p>
            </div>
        )

    })
    async function getFoodHighLight() {
        try {
            var arrTemp = [];
            for (var i = 1; i <= 3; i++) {
                const res = await FetchAPI.getDataApi(link + "getFoodHighLight.php?trang=" + i);
                arrTemp = arrTemp.concat(res);
                if (i == 3) {
                    setProduct(arrTemp);
                }
            }
        } catch (error) {
        }

        // setTimeout(()=>{
        //     setProduct(arrTemp);
        // },300)
    }
    useEffect(() => {
        getFoodHighLight();
    }, []);
    return (
        <div className="body">
            {Slideshow()}
            <Alert show={show} variant="success">
                <Alert.Heading>Cửa hàng May Beauty?!</Alert.Heading>
                <p>
                    Cửa hàng May Beauty chúng tôi là một Cửa hàng tuyệt vời có thể tự tin khiến những khách hàng khó tính nhất cũng phải thốt lên "Ơ mây zing, gút chóp em".<br />
                    Xin mời mọi người hãy lướt xuống để xem và đặt ngay để thưởng thức những sản phẩm tuyệt vời của chúng tôi.<br />
                    Và mong bạn sẽ hài lòng về dịch vụ của chúng tôi. Luv!!!!!!
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => { setShow(false); window.scroll(0, 0); }} variant="outline-success">
                        Đóng
                    </Button>
                </div>
            </Alert>

            <div style={{ backgroundImage: `url(${bg2})`, textAlign: 'center' }}>
                <Container>
                    <p className="banchay">Sản Phẩm Bán Chạy </p>
                    <p className="mota">Chúng tôi gợi ý cho bạn một số sản phẩm đã trở thành
                        thương hiệu của chúng tôi và có doanh thu bán chạy nhất của cửa hàng.</p>
                    <Container >
                        <Row className="justify-content-md-between " md={4} style={{ paddingBottom: 40, columnCount: 4, columnGap: 10, textAlign: 'center' }}>
                            {elementSale}
                        </Row>
                    </Container>
                </Container>
            </div>

            <div className="Advertisement" style={{ backgroundImage: `url(${bg4})`, color: 'white' }}>
                <Container style={{ padding: 20 }}>
                    <Row >
                        <Col style={{ display: 'flex', flexDirection: 'row', paddingBottom: 10, }} md={4}>
                            <Col md={4} xs={2}>
                                <Image className="descrepInforimg" src={iconphone} width={60} ></Image>
                            </Col>
                            <Col className="descrepInfor" md={8} xs={10} style={{ paddingLeft: 20 }}>
                                <Row style={{ height: '50%', fontWeight: 'bold' }}>Hotline đặt hàng tư vấn 24/7</Row>
                                <Row style={{ height: '50%' }}>077755381</Row>
                            </Col>
                        </Col>
                        <Col style={{ display: 'flex', flexDirection: 'row', paddingBottom: 10 }} md={4}>
                            <Col md={4} xs={2}>
                                <Image className="descrepInforimg" src={iconmail} width={60} ></Image>
                            </Col>
                            <Col className="descrepInfor" md={8} xs={10} style={{ paddingLeft: 20 }}>
                                <Row style={{ height: '50%', fontWeight: 'bold' }}>Email nhận phản hồi</Row>
                                <Row style={{ height: '50%' }}>test@gmail.com</Row>
                            </Col>
                        </Col>
                        <Col style={{ display: 'flex', flexDirection: 'row', paddingBottom: 10 }} md={4}>
                            <Col md={4} xs={2}>
                                <Image className="descrepInforimg" src={iconmap} width={60} ></Image>
                            </Col>
                            <Col className="descrepInfor" md={8} xs={10} style={{ paddingLeft: 20 }}>
                                <Row style={{ height: '50%', fontWeight: 'bold' }}>Địa chỉ Cửa hàng</Row>
                                <Row style={{ height: '50%', }}>Hòa Hải - Đà Nẵng </Row>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>
                <div style={{ color: 'white' }} className="header" >
                    <Image className="bg-image" src={bg} />
                    <div className="content">
                        <Container >
                            <Row style={{ justifyContent: 'center' }}>
                                <p style={{ fontSize: 30 }}>May Beauty</p>
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <p style={{ fontSize: 15 }}>Sản Phẩm Tuyệt Vời </p>
                            </Row>
                            <Row style={{ justifyContent: 'center', textAlign: 'center' }}>
                                <p className="des" style={{ fontSize: 25 }}>Tại sao nên chọn Cửa hàng May Beauty</p>
                            </Row>
                            <Row>
                                <p className="des" style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
                                    May Beauty là hệ thống cửa hàng mỹ phẩm chính hãng và dịch vụ chăm sóc sắc đẹp chuyên sâu với hệ thống cửa hàng trải dài trên toàn quốc.
                                    Và hiện đang là đối tác phân phối chiến lược tại thị trường Việt Nam của hàng loạt thương hiệu lớn.
                                    May Beauty sở hữu đa dạng các mặt hàng từ cao cấp đến bình dân, đáp ứng mọi nhu cầu của khách hàng.
                                    Đặc biệt, tại May Beauty luôn có đầy đủ mẫu thử của mỗi sản phẩm và nhân viên tư vấn, giúp khách hàng dễ dàng chọn lựa và tăng trải nghiệm mua sắm.</p>
                            </Row>
                            <Row style={{ fontSize: 15, textAlign: 'center' }}>
                                <Col className="c" md={2} sm={6} xs={6}>
                                    <Image className="imgc" src={fresh} />
                                    <p>Dịch vụ chuyên nghiệp</p>
                                </Col>
                                <Col className="c" md={2} sm={6} xs={6}>
                                    <Image className="imgc" src={onlineorder} />
                                    <p>Hỗ trợ đặt hàng online dễ dàng</p>
                                </Col>
                                <Col className="c" md={2} sm={6} xs={6}>
                                    <Image className="imgc" src={freewifi} />
                                    <p>Sóng wifi mạnh phủ khắp Cửa hàng</p>
                                </Col>
                                <Col className="c" md={2} sm={6} xs={6}>
                                    <Image className="imgc" src={freeparking} />
                                    <p>Có chỗ đậu xe ô tô miễn phí</p>
                                </Col>
                                <Col className="c" md={2} sm={6} xs={6}>
                                    <Image className="imgc" src={ship} />
                                    <p>Giao hàng tận nơi với các đơn online</p>
                                </Col>
                                <Col className="c" md={2} sm={6} xs={6}>
                                    <Image className="imgc" src={hoitruong} />
                                    <p>Hỗ trợ chăm sóc khách hàng uy tín</p>
                                </Col>

                            </Row>
                        </Container>
                    </div>
                </div>


            </div>
        </div >
    )
}