import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export default function Menu() {
  const navigate = useNavigate();

  const logout = async () => {
    swal({
      title: "ออกจากระบบ?",
      text: "คุณต้องการออกจาระบบ !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        navigate("/");
      } 
    });
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a className="brand-link" style={{ backgroundColor: "#455a64" }}>
        <div className="text-center">
          <span
            className="brand-text font-weight-light"
            style={{ color: "white", fontWeight: "bold" }}
          >
            IServiece 2022
          </span>
        </div>
      </a>
      <div className="sidebar" style={{ backgroundColor: "#455a64" }}>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link className="nav-link" to="/admin/order">
                <i className="nav-icon fa fa-list" />
                <p>ออร์เดอร์</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/groupproduct">
                <i className="nav-icon fa fa-list-alt" />
                <p>ประเภทสินค้า</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/product">
                <i className="nav-icon fas fa-building" />
                <p>สินค้า</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/user">
                <i className="nav-icon fa fa-users" />
                <p>ผู้ใช้งานระบบ</p>
              </Link>
            </li>
            <li
              className="nav-item"
              onClick={() => {
                logout();
              }}
            >
              <a className="nav-link" href="#">
                <i className="nav-icon fa fa-sign-out" />
                <p>ออกจากระบบ</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
