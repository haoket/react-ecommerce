import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Card, Button, Spinner } from 'react-bootstrap';
import logo from '../images/logo2.gif';
import '../Css/Login.css';
import {
    useHistory,
    Link
} from "react-router-dom";
import * as FetchAPI from '../Utils/FetchAPI';
import { link } from '../Utils/Link';
import { getWindowDimensions } from '../Contain/getWindow';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusLogin, setstatusLogin] = useState(false);
    var history = useHistory();
    var [loading, setLoading] = useState(false);
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handlelogin();
        }
    }
    async function handlelogin() {
        try {
            console.log("Đã nhấn login");
            const data = {
                "USERNAME": username,
                "PASSWORD": password,
            }
            const res = await FetchAPI.postDataApi(link + "taoToken.php", data);
            if (res.token === "ERROR") {
                console.log("Đăng nhập thất bại");
                setstatusLogin(true)
            } else {
                console.log("Đăng nhập thành công " + res.token);

                setLoading(true);
                document.getElementsByClassName("footer")[0].style.display = 'none'
                document.getElementsByClassName("header-nav")[0].style.display = 'none'
                setTimeout(() => {
                    setLoading(false);
                    history.replace('/');
                    document.getElementsByClassName("footer")[0].style.display = ''
                    document.getElementsByClassName("header-nav")[0].style.display = ''
                    window.location.reload();
                }, 1500);

                localStorage.setItem('keyToken', res.token);
            }
        } catch (error) {

        }

    }

    useEffect(() => {
        // document.getElementsByClassName('footer')[0].style.display ='none'
    }, [])
    return (
        <div style={{ flex: 1 }}>
            {!loading ? (
                <div style={{ backgroundColor: '#dc3545', marginTop: 30, height: getWindowDimensions().height * 0.8, marginBottom: '5%' }}>
                    <Container>
                        <Row>
                            <Col className="justify-content-center hiddenlogo" lg={6} >
                                <Image src={logo} />
                            </Col>
                            <Col style={{ height: getWindowDimensions().height * 0.7 }} lg={6} md={12} >
                                <Card className="wrapperLogin">
                                    <p style={{ fontSize: 20 }}>Đăng Nhập</p>
                                    <form>
                                        <label  >
                                            {/* <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            > */}
                                            <input
                                                type="text" name="username" placeholder="Tên đăng nhập"
                                                value={username} onChange={e => setUsername(e.target.value)}
                                                onKeyPress={e => {
                                                    if (e.key === 'Enter') {
                                                        console.log("Đã click enter")
                                                        // document.getElementsByName('password')[0].click();
                                                    }
                                                }}
                                            />
                                            {/* </FloatingLabel> */}
                                        </label>
                                        <label >
                                            <input
                                                name="password"
                                                style={{ marginTop: 20 }}
                                                type="password" placeholder="Mật khẩu"
                                                value={password} onChange={e => setPassword(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                            />
                                        </label>

                                        <Button className="btnLogin" onClick={() => handlelogin()}>ĐĂNG NHẬP</Button>
                                        {statusLogin && <p style={{ color: 'red', marginTop: 10, fontSize: 14 }}>Đăng nhập thất bại</p>}
                                        <a href="#"><p style={{
                                            fontSize: 17, marginTop: 15, textAlign: 'center'
                                        }}>Quên mật khẩu</p></a>

                                        <div style={{ width: '90%', textAlign: 'center' }}>
                                            Bạn mới biết đến May Beauty? <Link to={'/signup'}>Đăng ký ngay</Link>
                                        </div>
                                    </form>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            ) : (
                <Spinner style={{ position: 'absolute', bottom: '50%', left: '50%' }} animation="border" role="status" variant="danger" >
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
            }

        </div >
    )
}