import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './Product';
import { Row, Pagination, Breadcrumb } from 'react-bootstrap';
import {
    Link,
} from "react-router-dom";
import * as FetchAPI from '../Utils/FetchAPI';
import { link } from '../Utils/Link';
import { getPriceVND } from '../Contain/getPriceVND';

export default function FullFood() {
    let [mangsanpham, setmangsanpham] = useState([]);
    let [itemPagination, setItemPagination] = useState([]);
    let [active, setActive] = useState(1);
    let [page, setPage] = useState(1);
    let [length, setLength] = useState();
    useEffect(() => {
        {
            window.scroll(0, 0);
            getFullsanpham();
        }
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
        } catch (error) {
        }

    }
    let elements = mangsanpham.map((item, type) => {

        return (
            <div style={{ padding: 40, width: '100%' }}>
                <Product
                    status={item.status}
                    ten={item.ten}
                    hinhanh={item.hinhanh}
                    gia={getPriceVND(item.gia) + " đ / 1 phần"}
                    id={item.id}
                />
            </div>

        )
    });

    // Xử lý phân trang
    function pagination(ac, l) {
        let item = [];
        for (let number = 1; number <= l; number++) {
            item.push(
                <Pagination.Item key={number} active={number === ac} onClick={() => { pagination(number, l); window.scroll(0, 0) }}>
                    {number}
                </Pagination.Item>,
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

        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 800 }}>
            <Breadcrumb style={{ paddingLeft: 40, paddingTop: 20, paddingRight: 40 }}>
                <Breadcrumb.Item  >
                    <Link to={"/home"}>Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Tất cả sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <Row className="justify-content-xs-center" style={{ width: '100%' }} sm={12} xs={12} md={2} lg={2} xl={3} >
                {elements}
            </Row>
            <div>
                <Pagination style={{ justifyContent: 'center' }}>
                    <Pagination.First onClick={() => { setActive(1); pagination(1, length); window.scroll(0, 0) }} />
                    <Pagination.Prev onClick={() => prevPagination()} />
                    {itemPagination}
                    <Pagination.Next onClick={() => nextPagination()} />
                    <Pagination.Last onClick={() => { setActive(length); pagination(length, length); window.scroll(0, 0) }} />
                </Pagination>
            </div>
        </div>

    )
}