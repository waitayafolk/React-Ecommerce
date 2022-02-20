import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import swal from "sweetalert";

export default function User() {
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [detailUser, setDetailUser] = useState({
    header: "",
    id: 0,
    name: "",
    password: "",
    status: "",
    user_code: "",
    username: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  const handleChangeReserveData = (prop) => (event) => {
    setDetailUser({ ...detailUser, [prop]: event.target.value });
  };

  const getUser = async () => {
    let url = "http://localhost:4500/user";
    let rs = await axios.get(url);
    setUser(rs.data);
  };

  const UserSave = async (user) => {
    setDetailUser(user);
    setShow(true);
  };

  const Savedata = async (event) => {
    event.preventDefault();
    let url = "http://localhost:4500/user/save";
    let rs = await axios.post(url, {
      id: detailUser.id,
      name: detailUser.name,
      username: detailUser.username,
      password: detailUser.password,
      user_code: detailUser.user_code,
    });
    if (rs.data.status == "success") {
      getUser();
      swal("บันทึกสำเร็จ !", "บันทึกข้อมูลเสร็จสิ้น", "success");
      setShow(false);
    } else {
      swal("เกิดข้อผิดพลาด !", "กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง", "error");
    }
  };

  const DeleteUser = async (id) => {
    swal({
      title: "ออกจากระบบ?",
      text: "คุณต้องการออกจาระบบ !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {
        let url = `http://localhost:4500/user/delete/${id}`;
        let rs = await axios.get(url);
        if (rs.data.status == "success") {
          getUser();
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
                ผู้ใช้งานระบบ
              </h3>
            </div>
            <div style={{ padding: 20 }}>
              <div className="row">
                <div className="text-left col-6 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <button
                    onClick={() => {
                      UserSave({
                        header: "เพิ่มผู้ใช้งานระบบ",
                        id: 0,
                        name: "",
                        password: "",
                        status: "",
                        user_code: "",
                        username: "",
                      });
                    }}
                    className="btn"
                    style={{
                      backgroundColor: "#0288d1",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    เพิ่มผู้ใช้งานระบบ
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
                      <th className="min-vw-90">รหัสผุ้ใช้งาน</th>
                      <th className="min-vw-50">ชื่อ</th>
                      <th className="min-vw-90">username</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.length > 0 ? (
                      <>
                        {user.map((item, index) => {
                          item.header = "แก้ไขผู้ใช้งานระบบ";
                          return (
                            <>
                              <tr>
                                <th style={{ textAlign: "center", width: 10 }}>
                                  {index + 1}
                                </th>
                                <th>{item.user_code}</th>
                                <th>{item.name}</th>
                                <th>{item.username}</th>
                                <th>
                                  <div className="row">
                                    <div
                                      className="min-vw-90"
                                      className="col-12 col-sm-12 col-md-6 col-ml-6 col-xl-6"
                                    >
                                      <button
                                        onClick={() => {
                                          UserSave(item);
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
                                        onClick={() => {DeleteUser(item.id)}}
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
            <h4 className="modal-title">{detailUser.header}</h4>
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
                    <label>ชื่อ-สกุล</label>
                    <input
                      autoComplete="off"
                      name="name"
                      value={detailUser.name}
                      onChange={handleChangeReserveData("name")}
                      type="text"
                      className="form-control"
                      placeholder="ชื่อ-สกุล"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>User Code</label>
                    <input
                      autoComplete="off"
                      name="user_code"
                      value={detailUser.user_code}
                      onChange={handleChangeReserveData("user_code")}
                      type="text"
                      className="form-control"
                      placeholder="User Code"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      autoComplete="off"
                      name="username"
                      value={detailUser.username}
                      onChange={handleChangeReserveData("username")}
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      autoComplete="off"
                      name="password"
                      value={detailUser.password}
                      onChange={handleChangeReserveData("password")}
                      type="password"
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
