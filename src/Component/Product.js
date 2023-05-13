import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import '../Css/FullFood.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link
} from "react-router-dom";
import setHTTP from '../Utils/setHTTP';
export default function Product(props) {
  const [cssOutStock, setcssOutStock] = useState();
  useEffect(() => {
    if (props.status == 1) {
      setcssOutStock({ cursor: 'not-allowed' })
    } else {
      setcssOutStock({ cursor: 'pointer' })
    }
  })
  return (
    <Container className="itemProduct thumbnail wrapperItem">
      <Row className="justify-content-center">
        {props.status == "1" &&
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(36, 31, 31, 0.4)', width: 320, height: 250, color: 'white', boxSizing: 'border-box' }}>
            <h6>sản phẩm tạm thời hết hàng.<br /> Mong quý khách thông cảm...</h6>
          </div>
        }
        <Image style={{ height: 200, width: '60%', paddingBottom: 5, paddingTop: 10 }} src={setHTTP(props.hinhanh)}></Image>
      </Row>
      <Row >
        <Col className="text-right" style={{ fontWeight: 'bold' }} lg={5} xs={5}>Tên sản phẩm :</Col>
        <Col lg={7} xs={7}>{props.ten}</Col>
      </Row>
      <Row style={{ paddingBottom: 20 }}>
        <Col className="text-right" style={{ fontWeight: 'bold' }} lg={5} xs={5}>Giá :</Col>
        <Col lg={7} xs={7}>{props.gia}</Col>
      </Row>
      <Row className="justify-content-around">
        <Col sm={12} md={6} >
          <Button as={Link} to={{ pathname: `/details/${"id=" + props.id}`, state: { id: props.id } }} style={{ width: '100%', marginTop: 5, marginBottom: 5 }} variant="primary">Xem chi tiết</Button>
        </Col >
        {!props.hideOrder &&
          <Col sm={12} md={6}>
            <Button style={{ width: '100%', marginTop: 5, marginBottom: 5, ...cssOutStock }} variant="primary" disabled={props.status == 1}>Đặt ngay</Button>
          </Col>
        }
      </Row>
    </Container>
  )
} 