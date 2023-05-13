import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from "react-chartjs-2";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getPriceVND } from '../Contain/getPriceVND';
import * as FetchAPI from '../Utils/FetchAPI';
import { link } from '../Utils/Link';

export default function StatisAdmin() {
    const [currentMonth, setCurrentMonth] = useState();
    const [currentYear, setCurrentYear] = useState();
    const [dataMonth, setDataMonth] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [statusShown, setStatusShown] = useState(false);
    const [turnover, setTurnover] = useState('');
    const [turnoverMonth, setTurnoverMonth] = useState('');
    const [totalOrder, setTotalOrder] = useState('');
    const [totalOrder30Day, setTotalOrder30Day] = useState('');
    const [totalOrderToDay, setTotalOrderToDay] = useState('');
    const [statusOrderPayment, setStatusOrderPayment] = useState([0, 0]);
    function getCalendar() {
        let currentTime = new Date();
        setCurrentMonth(currentTime.getMonth());
        setCurrentYear(currentTime.getFullYear());
    }
    async function getBill() {
        try {
            const res = await FetchAPI.getDataApi(link + "getFullBill.php");
            let thistime = new Date();
            let turn = 0;
            let turnMonth = 0;
            let total = 0;
            let total30day = 0;
            let totalToday = 0;
            for (var i = 0; i < res.length; i++) {
                if (res[i].status == 1 || res[i].status == 2) {
                    let x = new Date(res[i].datedat);
                    let y = (thistime.getTime() - x.getTime()) / (24 * 3600 * 1000);
                    total++;
                    statusOrderPayment[0]++;
                    for (var z = 0; z < 12; z++) {
                        if (x.getMonth() == z) {
                            dataMonth[z]++;
                        }
                    }
                    if (Math.floor(y) < 31) {
                        total30day++;
                    }
                    if (x.getFullYear() == thistime.getFullYear()) {
                        turn += parseInt(res[i].tongtien);
                    }
                    if (x.getMonth() == thistime.getMonth()) {
                        turnMonth += parseInt(res[i].tongtien);
                    }
                    if (x.getDate() == thistime.getDate() && x.getMonth() == thistime.getMonth() && x.getFullYear() == thistime.getFullYear()) {
                        totalToday++;
                    }
                }
                else {
                    statusOrderPayment[1]++;
                }
            }
            setTurnover(turn);
            setTurnoverMonth(turnMonth);
            setTotalOrder(total);
            setTotalOrder30Day(total30day);
            setTotalOrderToDay(totalToday);
        } catch (error) {

        }

    }
    useEffect(() => {
        getCalendar();
        getBill();
        setTimeout(() => {
            setStatusShown(true)
        }, 300)

    }, [])
    return (
        <div style={{ padding: 30 }}>
            {/* dashboard */}
            <div className="dashboard">
                <Row>
                    <Col xl={3}>
                        <Card className="cardStatis carddd">
                            Số đơn bán được trong hôm nay <br />
                            <b>{totalOrderToDay}</b>
                        </Card>
                    </Col>
                    <Col xl={3}>
                        <Card className="cardStatis cardc">
                            Số đơn bán được trong 30 ngày <br />
                            <b>{totalOrder30Day}</b>
                        </Card>
                    </Col>
                    <Col xl={3} >
                        <Card className="cardStatis carda">
                            Tổng tiền bán được của năm {currentYear}<br />
                            <b> {getPriceVND(turnover) + "VNĐ"} </b>
                        </Card>
                    </Col>
                    <Col xl={3}>
                        <Card className="cardStatis cardb">
                            Tổng tiền bán được của tháng hiện tại (Tháng {currentMonth + 1}/{currentYear}) <br />
                            <b>{getPriceVND(turnoverMonth) + "VNĐ"}</b>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* graph */}
            <Row>
                <Col xl={6}>
                    <h4> Thống kê số đơn hàng bán được trong năm {currentYear}</h4>
                    <Container className="chart1" >
                        {statusShown &&
                            <Bar
                                data={{
                                    labels: [
                                        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
                                        "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
                                        "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
                                    ],
                                    datasets: [
                                        {
                                            label: "Bảng thống kế đơn hàng theo năm .Tổng ( " + totalOrder + " đơn )",
                                            backgroundColor: [
                                                "#3e95cd",
                                                "#8e5ea2",
                                                "#3cba9f",
                                                "#e8c3b9",
                                                "#c45850"
                                            ],
                                            data: dataMonth
                                        }
                                    ]
                                }}
                                options={{
                                    legend: { display: true },
                                    title: {
                                        display: true,
                                        text: "Số đơn hàng trong năm 2021",
                                    }
                                }}
                            />
                        }
                    </Container>
                </Col>
                <Col xl={6}>
                    <h4> Đơn hàng thanh toán</h4>
                    <Container className="chart1">
                        {statusShown &&
                            <Doughnut
                                className="graphcircle"
                                data={{
                                    labels: [
                                        "Đơn đã thanh toán",
                                        "Đơn chưa thanh toán",
                                    ],
                                    datasets: [
                                        {
                                            label: "Population (millions)",
                                            backgroundColor: [
                                                "#3e95cd",
                                                "#8e5ea2",
                                            ],
                                            data: statusOrderPayment
                                        }
                                    ]
                                }}
                                width={300}
                                height={300}
                                option={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    title: {
                                        display: true,
                                        text: "Predicted world population (millions) in 2050",
                                    }
                                }}
                            />
                        }
                    </Container>
                </Col>
            </Row>

        </div>
    )
}