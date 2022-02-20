import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import swal from "sweetalert";

export default function Groupproduct() {
  const [grpupproduct, setGrpupproduct] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [detailGroupproduct, setDetailGroupproduct] = useState({
    header: "",
    id: 0,
    group_code: "",
    group_product_name: "",
    group_product_name_eng: "",
    detail: "",
    status: "",
  });

  const handleChangeReserveData = (prop) => (event) => {
    setDetailGroupproduct({
      ...detailGroupproduct,
      [prop]: event.target.value,
    });
  };

  useEffect(() => {
    getGroupproduct();
  }, []);

  const getGroupproduct = async () => {
    let url = "http://localhost:4500/groupproduct";
    let rs = await axios.get(url);
    setGrpupproduct(rs.data);
  };

  const GroupproductSave = async (groupproduct) => {
    setDetailGroupproduct(groupproduct);
    setShow(true);
  };

  const Savedata = async (event) => {
    event.preventDefault();
    let url = "http://localhost:4500/groupproduct/save";
    let rs = await axios.post(url,{
      id : detailGroupproduct.id ,
      group_product_name : detailGroupproduct.group_product_name ,
      group_code : detailGroupproduct.group_code,
      group_product_name_eng : detailGroupproduct.group_product_name_eng,
      detail : detailGroupproduct.detail
    })
    if(rs.data.status == "success"){
      getGroupproduct()
      swal(
        "บันทึกสำเร็จ !",
        "บันทึกข้อมูลเสร็จสิ้น",
        "success"
      );
      setShow(false);
    }else{
      swal(
        "เกิดข้อผิดพลาด !",
        "กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง",
        "error"
      );
    }
  };

  const DeleteGroupProduct = async (id) => {
    swal({
      title: "ออกจากระบบ?",
      text: "คุณต้องการออกจาระบบ !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {
        let url = `http://localhost:4500/groupproduct/delete/${id}`;
        let rs = await axios.get(url);
        if (rs.data.status == "success") {
          getGroupproduct();
          swal("บันทึกสำเร็จ !", "บันทึกข้อมูลเสร็จสิ้น", "success");
        } else {
          swal("เกิดข้อผิดพลาด !", "กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง", "error");
        }
      } 
    });
  };

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
                ประเภทสินค้า
              </h3>
            </div>
            <div style={{ padding: 20 }}>
              <div className="row">
                <div className="text-left col-6 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <button
                    onClick={() => {
                      GroupproductSave({
                        header: "เพิ่มผู้ใช้งานระบบ",
                        id: 0,
                        group_code: "",
                        group_product_name: "",
                        group_product_name_eng: "",
                        detail: "",
                        status: "",
                      });
                    }}
                    className="btn"
                    style={{
                      backgroundColor: "#0288d1",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    เพิ่มประเภทสินค้า
                  </button>
                </div>
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
                      <th className="min-vw-90">รหัสประเภทสินค้า</th>
                      <th className="min-vw-50">ชื่อประเภทสินค้า</th>
                      <th className="min-vw-90">ชื่อประเภทสินค้า(EN)</th>
                      <th className="min-vw-90">รายละเอียด</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {grpupproduct.length > 0 ? (
                      <>
                        {grpupproduct.map((item, index) => {
                          item.header = "แก้ไขผู้ใช้งานระบบ";
                          return (
                            <>
                              <tr>
                                <th style={{ textAlign: "center", width: 10 }}>
                                  {index + 1}
                                </th>
                                <th>{item.group_code}</th>
                                <th>{item.group_product_name}</th>
                                <th>{item.group_product_name_eng}</th>
                                <th>{item.detail}</th>
                                <th>
                                  <div className="row">
                                    <div
                                      className="min-vw-90"
                                      className="col-12 col-sm-12 col-md-6 col-ml-6 col-xl-6"
                                    >
                                      <button
                                        onClick={() => {
                                          GroupproductSave(item);
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
                                          <i className="nav-icon fas fa-pen" />
                                        </span>{" "}
                                        แก้ไข
                                      </button>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                                      <button
                                        onClick={()=>{DeleteGroupProduct(item.id)}}
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
                                        ลบข้อมูล
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
            <h4 className="modal-title">{detailGroupproduct.header}</h4>
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
            <form onSubmit={Savedata}>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>รหัสประเภทสินค้า</label>
                    <input
                      autoComplete="off"
                      name="group_code"
                      value={detailGroupproduct.group_code}
                      onChange={handleChangeReserveData("group_code")}
                      type="text"
                      className="form-control"
                      placeholder="User Code"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>ชื่อประเภทสินค้า</label>
                    <input
                      autoComplete="off"
                      name="group_product_name"
                      value={detailGroupproduct.group_product_name}
                      onChange={handleChangeReserveData("group_product_name")}
                      type="text"
                      className="form-control"
                      placeholder="ชื่อ-สกุล"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>ชื่อประเภทสินค้า(EN)</label>
                    <input
                      autoComplete="off"
                      name="group_product_name_eng"
                      value={detailGroupproduct.group_product_name_eng}
                      onChange={handleChangeReserveData("group_product_name_eng")}
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>รายละเอียด</label>
                    <input
                      autoComplete="off"
                      name="detail"
                      value={detailGroupproduct.detail}
                      onChange={handleChangeReserveData("detail")}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn text-center"
                  style={{
                    backgroundColor: "#7cb342",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
