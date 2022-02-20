import React, { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();


  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  

  const handleChangeReserveData = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4500/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "Login Success") {
          navigate("/admin/user");
        } else {
          swal(
            "โปรดตรวจสอบการเข้าระบบของคุณอีกครั้ง !",
            "Username ไม่ถูกต้อง",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <body
      className="hold-transition login-page"
      style={{ backgroundColor: "#455a64" }}
    >
      <div className="h1">
        <div className="text-center" style={{ color: "white" }}>
          <b>IService2021</b>
        </div>
        <div className="text-center" style={{ color: "white" }}>
          <b>ระบบเเจ้งซ่อมออนไลน์</b>
        </div>
      </div>
      <div className="login-box">
        <div className="card card-outline">
          <div className="card-header text-center">
            <div className="h1">
              <p className="login-box-msg">เข้าสู่ระบบ</p>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  autoComplete="off"
                  name="username"
                  value={user.username}
                  onChange={handleChangeReserveData("username")}
                  type="text"
                  className="form-control"
                  placeholder="Username"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  autoComplete="off"
                  name="password"
                  value={user.password}
                  onChange={handleChangeReserveData("password")}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}
