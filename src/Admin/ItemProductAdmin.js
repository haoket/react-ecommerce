import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Container, Col, Button, Image } from 'react-bootstrap';
import setHTTP from '../Utils/setHTTP';
export default function ItemProductAdmin(props) {
    return (
        <Container className="itemProduct thumbnail">
            <Row className="justify-content-center">
                {props.status == "1" &&
                    <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(36, 31, 31, 0.4)', height: 200, width: 290, color: 'white' }}>
                        <h4>Hết hàng</h4>
                    </div>
                }
                <Image style={{ height: 200, width: '60%', paddingBottom: 5, paddingTop: 10 }} src={setHTTP(props.hinhanh)}></Image>
            </Row>
            <Row >
                <Col className="text-right" style={{ fontWeight: 'bold' }} lg={5} xs={5}>Tên sản phẩm </Col>
                <Col lg={7} xs={7}>{props.ten}</Col>
            </Row>
            <Row style={{ paddingBottom: 20 }}>
                <Col className="text-right" style={{ fontWeight: 'bold' }} lg={5} xs={5}>Giá </Col>
                <Col lg={7} xs={7}>{props.gia}</Col>
            </Row>
            <Row className="justify-content-around">
                <Col sm={12} md={6} >
                    <Button as={Link} onClick={() => { props.shownModal(); props.setArr() }} style={{ width: '100%', marginTop: 5, marginBottom: 5 }} variant="primary">Chỉnh sửa</Button>
                </Col >
                {/* <Col  sm={12} md={6}>
              <Button style={{ width:'100%',marginTop:5 ,marginBottom:5}} variant="danger">Xóa sản phẩm</Button>
            </Col> */}
            </Row>
        </Container>
    )
}
