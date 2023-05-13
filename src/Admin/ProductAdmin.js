import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import AddProduct from './AddProduct';
import ManageProduct from './ManageProduct';

export default function ProductAdmin() {
    return (
        <Router>
            <div style={{ padding: 30 }}>
                <Row>
                    <Col xl={2} md={5} xs={6}>
                        <Button className="btnP" style={{ fontWeight: 'bold' }} variant="outline-dark" as={Link} to={"/homeadmin/product/mange"}>
                            Quản lý sản phẩm
                        </Button>
                    </Col>
                    <Col xl={2} md={5} xs={6}>
                        <Button className="btnP" style={{ fontWeight: 'bold' }} variant="outline-danger" as={Link} to={"/homeadmin/product/add"}>
                            Thêm mới sản phẩm
                        </Button>
                    </Col>
                </Row>
                <Switch>
                    <Route path="/homeadmin/product/mange">
                        <ManageProduct />
                    </Route>
                    <Route path="/homeadmin/product/add">
                        <AddProduct />
                    </Route>
                    <Route path="/homeadmin/product">
                        <ManageProduct />
                    </Route>
                </Switch>

            </div>
        </Router>
    )
}