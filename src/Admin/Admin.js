import React, { useEffect, useState } from 'react';
import {
    useHistory,
} from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as FetchAPI from '../Utils/FetchAPI';
import { link } from '../Utils/Link';
import { getWindowDimensions } from '../Contain/getWindow';

export default function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusLogin, setstatusLogin] = useState(false);
    const [statusLogin1, setstatusLogin1] = useState(false);
    let [timeCurrent, setTimeCurrent] = useState('');
    var [loading, setLoading] = useState(false);
    var history = useHistory();
    function myTimer() {
        let thistime = new Date();
        setTimeCurrent(thistime.toLocaleTimeString());
    }
    useEffect(() => {
        setInterval(myTimer, 1000);
        document.getElementsByClassName("header-nav")[0].style.display = 'none';
        document.getElementsByClassName("footer")[0].style.display = 'none';
    }, [])
    async function HandleLogin() {
        setstatusLogin1(false);
        setstatusLogin(false);
        try {
            const data = {
                "USERNAME": username,
                "PASSWORD": password,
            }
            const res = await FetchAPI.postDataApi(link + "taoToken.php", data);
            if (res.token === "ERROR") {
                console.log("Đăng nhập thất bại");
                setstatusLogin(true)
            } else {
                console.log("Đăng nhập thành công" + res.token);
                getUser(res.token)
            }
        } catch (error) {
        }

    }
    async function getUser(token) {
        try {
            const data = {
                "token": token
            }
            const res = await FetchAPI.postDataApi(link + "checkToken.php", data);
            console.log(res.permission)
            if (res.permission == '1') {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    history.replace('/homeadmin');
                    localStorage.setItem('keyAdmin', 'admin');
                }, 1500);
            } else {
                setstatusLogin1(true);
            }
        } catch (error) {
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            HandleLogin();
        }
    }
    return (
        <div style={{ height: getWindowDimensions().height, backgroundColor: '#dc3545' }}>
            {!loading ?
                (
                    <Container>
                        <Row>
                            <Col>
                                <ReactCSSTransitionGroup
                                    transitionName="UpDown"
                                    transitionAppear={true}
                                    transitionAppearTimeout={1000}
                                    transitionLeaveTimeout={300}>
                                    <Card className="wrapperLoginAdmin">
                                        <span style={{ fontSize: 20, textAlign: 'right' }}>{timeCurrent}</span>
                                        <p style={{ fontSize: 25, textAlign: 'center' }}><b>Đăng nhập quản lý May Beauty</b></p>

                                        <form>
                                            <label  >
                                                <input
                                                    type="text" name="username" placeholder="Tên đăng nhập"
                                                    value={username} onChange={e => setUsername(e.target.value)}
                                                />
                                            </label>
                                            <label >
                                                <input
                                                    style={{ marginTop: 20 }}
                                                    type="password" name="password" placeholder="Mật khẩu"
                                                    value={password} onChange={e => setPassword(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                />
                                            </label>

                                            <Button className="btnLogin" onClick={() => HandleLogin()}>ĐĂNG NHẬP</Button>
                                            {statusLogin && <p style={{ color: 'red', marginTop: 10, fontSize: 14 }}>Đăng nhập thất bại.</p>}
                                            {statusLogin1 && <p style={{ color: 'red', marginTop: 10, fontSize: 14 }}>Xin lỗi, bạn không có quyền quản lý.</p>}
                                        </form>
                                    </Card>

                                </ReactCSSTransitionGroup>
                            </Col>
                        </Row>
                    </Container>
                ) : (
                    <Spinner style={{ position: 'absolute', bottom: '50%', left: '50%' }} animation="border" role="status" variant="white" >
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )

            }

        </div>
    )
}
