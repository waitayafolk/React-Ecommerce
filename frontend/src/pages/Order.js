import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import swal from "sweetalert";
export default function Order() {
  const [order, setOrder] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [orderDetail, setOrderDetail] = useState([]);
  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    let url = "http://localhost:4500/order";
    let rs = await axios.get(url);
    setOrder(rs.data);
  };

  const UpdateStatus = (id, status) => {
    swal({
      title: `${status}?`,
      text: "ยืนยันเปลี่ยนสถานะ !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        console.log(id, status);
        let url = `http://localhost:4500/order/updatestatus/${id}/${status}`;
        let rs = await axios.get(url);
        if (rs.data.status == "success") {
          loadOrder();
          swal("บันทึกสำเร็จ !", "บันทึกข้อมูลเสร็จสิ้น", "success");
        } else {
          swal("เกิดข้อผิดพลาด !", "กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง", "error");
        }
      }
    });
  };

  const listOrder = async(id)=>{
    let url = `http://localhost:4500/order/orderdetail/${id}`;
    let rs = await axios.get(url);
    setOrderDetail(rs.data);
    setShow(true)
  }

  return (
    <>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="card-body">
          <div className="card">
            <div
              className="card-header"
              style={{ backgroundColor: "#546e7a", color: "white" }}
            >
              <h3 className="card-title">
                <span>
                  <i className="nav-icon fas fa-users" />
                </span>{" "}
                จัดการ Order
              </h3>
            </div>
            <div style={{ padding: 20 }}>
              <div className="row">
                <div className="text-left col-6 col-sm-6 col-md-6 col-ml-6 col-xl-6"></div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table" width="100%">
                  <thead>
                    <tr>
                      <th
                        className="min-vw-10"
                        style={{ textAlign: "center", width: 10 }}
                      >
                        ลำดับ
                      </th>
                      <th className="min-vw-90">ชื่อ</th>
                      <th className="min-vw-50">เบอร์โทร</th>
                      <th className="min-vw-90">ที่อยู่</th>
                      <th className="min-vw-90">สถานะ</th>
                      <th className="min-vw-90 text-center">รายละเอียด</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.length > 0 ? (
                      <>
                        {order.map((item, index) => {
                          let status = "";
                          if (item.status == "use") {
                            status = "รอจัดส่ง";
                          } else if (item.status == "send") {
                            status = "กำลังจัดส่ง";
                          } else {
                            status = "จัดส่งสำเร็จ";
                          }
                          return (
                            <>
                              <tr>
                                <th style={{ textAlign: "center", width: 10 }}>
                                  {index + 1}
                                </th>
                                <th>{item.name}</th>
                                <th>{item.tel}</th>
                                <th>{item.address}</th>
                                <th>{status}</th>
                                <th className="text-center">
                                  <button
                                    onClick={() => {
                                      listOrder(item.id);
                                    }}
                                    className="btn"
                                    style={{
                                      backgroundColor: "#03a9f4",
                                      fontWeight: "bold",
                                      color : 'white'
                                    }}
                                    data-toggle="modal"
                                    data-target="#modal-default"
                                  >
                                    {" "}
                                    <span>
                                      <i className="nav-icon fas fa-list" />
                                    </span>{" "}
                                    ดูรายดารในบิล
                                  </button>
                                </th>
                                <th>
                                  <div className="row">
                                    <div
                                      className="min-vw-90"
                                      className="col-6 col-sm-4 col-md-4 col-ml-4 col-xl-4"
                                    >
                                      <button
                                        onClick={() => {
                                          UpdateStatus(item.id, "send");
                                        }}
                                        className="btn"
                                        style={{
                                          backgroundColor: "#fdd835",
                                          fontWeight: "bold",
                                        }}
                                        data-toggle="modal"
                                        data-target="#modal-default"
                                      >
                                        {" "}
                                        <span>
                                          <i className="nav-icon fas fa-car" />
                                        </span>{" "}
                                        จัดส่ง
                                      </button>
                                    </div>
                                    <div
                                      className="min-vw-90"
                                      className="col-6 col-sm-4 col-md-4 col-ml-4 col-xl-4"
                                    >
                                      <button
                                        onClick={() => {
                                          UpdateStatus(item.id, "success");
                                        }}
                                        className="btn"
                                        style={{
                                          backgroundColor: "#8bc34a",
                                          fontWeight: "bold",
                                        }}
                                        data-toggle="modal"
                                        data-target="#modal-default"
                                      >
                                        {" "}
                                        <span>
                                          <i className="nav-icon fas fa-check" />
                                        </span>{" "}
                                        เสร็จสิ้น
                                      </button>
                                    </div>
                                    <div className="col-6 col-sm-4 col-md-4 col-ml-4 col-xl-4">
                                      <button
                                        onClick={() => {
                                          UpdateStatus(item.id, "delete");
                                        }}
                                        className="btn"
                                        style={{
                                          backgroundColor: "#d32f2f",
                                          color: "white",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        <span>
                                          <i className="nav-icon fas fa-trash" />
                                        </span>{" "}
                                        ลบ
                                      </button>
                                    </div>
                                  </div>
                                </th>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} size="xl" onHide={handleClose}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">การสั่งซื้อ</h4>
            <button
              onClick={() => {
                handleClose();
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span>×</span>
            </button>
          </div>
          <div className="card-body" style={{ padding: 20 }}>
            <div className="table-responsive">
              <table className="table table" width="100%">
                <thead>
                  <tr>
                    <th minWidth="50">ลำดับ</th>
                    <th minWidth="100">รูปภาพ</th>
                    <th minWidth="100">สินค้า</th>
                    <th minWidth="130">ราคา</th>
                    <th minWidth="80">จำนวน</th>
                    <th minWidth="200">รวม</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail.length > 0 ? (
                    <>
                      {orderDetail.map((item, index) => {
                        return (
                          <>
                            <tr>
                              <th>{index + 1}</th>
                              <th>
                                <img
                                  style={{ width: 50, width: 50 }}
                                  src={`http://localhost:4500/public/${item.image}`}
                                />
                              </th>
                              <th>{item.product_name}</th>
                              <th>{item.product_price}</th>
                              <th>{item.qty}</th>
                              <th>{item.product_price * item.qty}</th>
                            </tr>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
