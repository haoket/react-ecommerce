import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Card, Button, Spinner, Alert } from 'react-bootstrap';
import logo from '../images/logo2.gif';
import '../Css/Login.css';
import {
    useHistory,
    Link
} from "react-router-dom";
import * as FetchAPI from '../Utils/FetchAPI';
import { link } from '../Utils/Link';
import { getWindowDimensions } from '../Contain/getWindow';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMess, errMessage] = useState('');
    const [hoten, setHoTen] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [statusSignup, setstatusSignup] = useState(false);
    var history = useHistory();
    var [loading, setLoading] = useState(false);
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handlesignup();
        }
    }
    async function handlesignup() {
        try {
            console.log("Đã nhấn signup");
            const data = {
                "HOTEN": hoten,
                "USERNAME": username.toLowerCase(),
                "PASSWORD": password,
                "EMAIL": email,
                "PHONE": phone,
                "ADDRESS": address
            }
            const res = await FetchAPI.postDataApi(link + "signup.php", data);
            console.log(res)
            if (res.result == "errUserName") {
                console.log("Tên đăng nhập đã tồn tại, vui lòng chọn tên khác");
                errMessage("Tên đăng nhập đã tồn tại, vui lòng chọn tên khác")
                setstatusSignup(true)

            } else if (res.result == "errEmail") {
                console.log("Email đã tồn tại, chọn email khác")
                errMessage("Email đã tồn tại, chọn email khác")
                setstatusSignup(true)

            } else if (res.result == "error") {
                console.log("Có lỗi đăng ký")
                errMessage("Có lỗi đăng ký!")
                setstatusSignup(true)

            } else {

                console.log("Đăng ký thành công ");
                alert("Đăng ký thành công!")
                setLoading(true);

                setTimeout(() => {
                    setLoading(false);
                    history.replace('/login');


                }, 1500);

            }

            // const data = {
            //     "USERNAME": username,
            //     "PASSWORD": password,
            //     "EMAIL": email,
            //     "HOTEN": hoten,
            //     "PHONE": phone,
            //     "ADDRESS": address

            // }
            // const res = await FetchAPI.postDataApi(link + "signup.php", data);
            // if (res.checkusername === "" && res.checkemail === "") {
            //     console.log("Đăng ký thành công ");

            //     setLoading(true);

            //     setTimeout(() => {
            //         setLoading(false);
            //         history.replace('/login');


            //     }, 1500);



            // } else {

            //     console.log("Đăng ký thất bại");
            //     setstatusSignup(true)

            // }
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
                                    <p style={{ fontSize: 20 }}>Đăng Ký</p>
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

                                                    }
                                                }}
                                            />

                                        </label>


                                        <label >
                                            <input
                                                name="password"
                                                type="password" placeholder="Mật khẩu"
                                                value={password} onChange={e => setPassword(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                            />
                                        </label>
                                        <label  >

                                            <input
                                                type="text" name="hoten" placeholder="Họ và Tên"
                                                value={hoten} onChange={e => setHoTen(e.target.value)}
                                                onKeyPress={e => {
                                                    if (e.key === 'Enter') {
                                                        console.log("Đã click enter")

                                                    }
                                                }}
                                            />

                                        </label>
                                        <label  >

                                            <input
                                                type="text" name="phone" placeholder="SĐT"
                                                value={phone} onChange={e => setPhone(e.target.value)}
                                                onKeyPress={e => {
                                                    if (e.key === 'Enter') {
                                                        console.log("Đã click enter")

                                                    }
                                                }}
                                            />

                                        </label>
                                        <label  >

                                            <input
                                                type="text" name="email" placeholder="Email"
                                                value={email} onChange={e => setEmail(e.target.value)}
                                                onKeyPress={e => {
                                                    if (e.key === 'Enter') {
                                                        console.log("Đã click enter")

                                                    }
                                                }}
                                            />

                                        </label>
                                        <label  >

                                            <input
                                                type="text" name="address" placeholder="Địa chỉ"
                                                value={address} onChange={e => setAddress(e.target.value)}
                                                onKeyPress={e => {
                                                    if (e.key === 'Enter') {
                                                        console.log("Đã click enter")
                                                        // document.getElementsByName('password')[0].click();
                                                    }
                                                }}
                                            />

                                        </label>

                                        <Button className="btnSignup" onClick={() => handlesignup()}>ĐĂNG KÝ</Button>
                                        {statusSignup && <p style={{ color: 'red', marginTop: 10, fontSize: 14 }}> {errMess}</p>}


                                        <div style={{ width: '90%', textAlign: 'center' }}>
                                            Bạn đã có tài khoản? <Link to={'/Login'}>Đăng nhập tại đây</Link>
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