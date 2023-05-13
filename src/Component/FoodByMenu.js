import React, { useState, useEffect } from 'react';
import { Row, Breadcrumb } from 'react-bootstrap';
import Product from './Product';
import {
    Link,
    useLocation
} from "react-router-dom";
import { getPriceVND } from '../Contain/getPriceVND';
import * as FetchAPI from '../Utils/FetchAPI';
import { link } from '../Utils/Link';

export default function FoodByMenu() {
    let [mangsanpham, setMangsanpham] = useState([]);
    let [nameMenu, setNameMenu] = useState('');
    let location = useLocation();
    useEffect(() => {
        // window.location.reload();
        if (typeof (location.state) !== 'undefined') {
            setNameMenu(location.state.tendanhmuc);
        }
        let link = window.location.pathname;
        let i = link.indexOf('id=');
        let kq = link.slice(i + 3, link.length);
        getsanpham(kq);
    }, [location])
    async function getsanpham(id) {
        try {
            const data = {
                'IDDANHMUC': id
            }
            const res = await FetchAPI.postDataApi(link + "getsanphamByList.php", data);
            setMangsanpham(res);
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
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Breadcrumb style={{ paddingLeft: 40, paddingTop: 20, paddingRight: 40 }}>
                <Breadcrumb.Item  >
                    <Link to={"/home"}>Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item >
                    <Link to={"/fullfood"}> Tất cả sản phẩm</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{nameMenu}</Breadcrumb.Item>
            </Breadcrumb>
            {!mangsanpham.length == 0 ?
                (
                    <Row className="justify-content-xs-center" style={{ width: '100%' }} sm={12} xs={12} md={2} lg={2} xl={3} >
                        {elements}
                    </Row>
                ) : (
                    <div style={{ width: '100%', height: 300, textAlign: 'center' }}>

                        Hiện danh mục này chưa có sản phẩm...
                    </div>
                )
            }
        </div>
    )
}