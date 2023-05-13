import React from 'react'
import { Row, Col, Image } from 'react-bootstrap';
import '../Css/FullFood.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import setHTTP from '../Utils/setHTTP';
export default function ItemProductBill(props) {

    return (
        <div className="itemProduct thumbnail" style={{ width: '100%', paddingLeft: 20, marginLeft: 20, marginBottom: 20 }}>
            <Row >
                <Col style={{ justifyContent: 'center', display: 'flex' }} sm={3}>
                    <Image className="imgBill" style={{ height: 100, width: 100, paddingBottom: 5, paddingTop: 10 }} src={setHTTP(props.hinhanh)}></Image>
                </Col>
                <Col style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} className="justify-content-center" sm={9}>
                    <Row>
                        <Col className="text-left" style={{ fontWeight: 'bold' }} lg={5} xs={5}>Tên sản phẩm :</Col>
                        <Col className="BillName" lg={7} xs={7}>{props.ten}</Col>
                    </Row>
                    <Row  >
                        <Col className="text-left" style={{ fontWeight: 'bold' }} lg={5} xs={5}>Giá :</Col>
                        <Col className="BillPrice" lg={7} xs={7}>{props.gia}</Col>
                    </Row>
                    <Row >
                        <Col className="text-left" style={{ fontWeight: 'bold' }} lg={5} xs={5}>Số lượng :</Col>
                        <Col className="BillAmount" lg={7} xs={7}>{props.soluong}</Col>
                    </Row>

                </Col>
            </Row>
        </div>
    )
}
