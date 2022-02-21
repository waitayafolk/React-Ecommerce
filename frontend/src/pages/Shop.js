import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import swal from "sweetalert";

export default function Shop() {
  const [customer, setCustomer] = useState({
    customer_name: "",
    customer_tel: "",
    customer_address: "",
  });
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [productCount, setProductCount] = useState(0);
  const [productInCart, setProductInCart] = useState([]);
  useEffect(() => {
    getProduct();
    loadProductToCart();
  }, []);

  const handleChangeReserveData = (prop) => (event) => {
    setCustomer({ ...customer, [prop]: event.target.value });
  };

  const loadProductToCart = async () => {
    if (localStorage.getItem("cart") == null || undefined) {
      localStorage.setItem("cart", JSON.stringify([]));
      setProductCount(0);
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      let ProductInCart = 0;
      for (let item of cart) {
        ProductInCart += item.qty;
      }
      setProductCount(ProductInCart);
    }
  };

  const getProduct = async () => {
    let url = "http://localhost:4500/product";
    let rs = await axios.get(url);
    setProduct(rs.data);
  };

  const productTocart = async (item) => {
    let ProductInCart = JSON.parse(localStorage.getItem("cart"));
    if (ProductInCart.length == 0) {
      ProductInCart.push({
        image: item.image,
        id: item.id,
        qty: 1,
        price: item.product_price - item.discount,
        name: item.product_name,
      });
      localStorage.setItem("cart", JSON.stringify(ProductInCart));
      loadProductToCart();
    } else {
      for (var i = 0; i < ProductInCart.length; i++) {
        if (ProductInCart[i].id === item.id) {
          ProductInCart[i].qty += 1;
          return saveTolocal(ProductInCart);
        }
      }
      ProductInCart.push({
        image: item.image,
        id: item.id,
        qty: 1,
        price: item.product_price - item.discount,
        name: item.product_name,
      });
      localStorage.setItem("cart", JSON.stringify(ProductInCart));
      loadProductToCart();
    }
  };

  const saveTolocal = (item) => {
    localStorage.setItem("cart", JSON.stringify(item));
    loadProductToCart();
  };

  const showModal = async () => {
    setShow(true);
    setProductInCart(JSON.parse(localStorage.getItem("cart")));
  };

  const Savedata = async (event) => {
    event.preventDefault();
    let url = "http://localhost:4500/order/confirmOrder";
    let rs = await axios.post(url, {
      customer_name: customer.customer_name,
      customer_tel: customer.customer_tel,
      customer_address: customer.customer_address,
      product : productInCart
    });
    if (rs.data.message == "success") {
        localStorage.clear("cart")
        loadProductToCart()
        swal("บันทึกสำเร็จ !", "บันทึกข้อมูลเสร็จสิ้น", "success");
        setShow(false);
    } else {
      swal("เกิดข้อผิดพลาด !", "กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง", "error");
    }
  };

  const plsuQTY = async (item) => {
    let ProductInCart = JSON.parse(localStorage.getItem("cart"));
    for (var i = 0; i < ProductInCart.length; i++) {
      if (ProductInCart[i].id === item.id) {
        ProductInCart[i].qty++;
        localStorage.setItem("cart", JSON.stringify(ProductInCart));
        loadProductToCart()
        return showModal();
      }
    }
  };

  const deleteQTY = async (item) => {
    let ProductInCart = JSON.parse(localStorage.getItem("cart"));
    for (var i = 0; i < ProductInCart.length; i++) {
      if (ProductInCart[i].id === item.id) {
        if (ProductInCart[i].qty == 1) {
          ProductInCart.splice(i, 1);
        } else {
          ProductInCart[i].qty--;
        }

        localStorage.setItem("cart", JSON.stringify(ProductInCart));
        loadProductToCart()
        return showModal();
      }
    }
  };

  return (
    <>
      <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
        <div className="container">
          <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
            <li className="nav-item dropdown">
              <a
                onClick={() => {
                  showModal();
                }}
                className="nav-link"
                type="btn"
              >
                <i className="fa fa-shopping-cart" />
                <span className="badge badge-danger navbar-badge">
                  {productCount}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="">
        <div className="content-header">
          <div className="container">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">
                  {" "}
                  Top Navigation <small>Example 3.0</small>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <div className="row">
              {product.length > 0 ? (
                <>
                  {product.map((item, index) => {
                    return (
                      <>
                        <div className="col-12 col-sm-6 col-md-4 col-ml-3 col-lg-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="text-center">
                                <img
                                  style={{ width: 50, width: 50 }}
                                  src={`http://localhost:4500/public/${item.image}`}
                                />
                              </div>
                              <p
                                className="card-text"
                                style={{ fontSize: 20, fontWeight: "bold" }}
                              >
                                {item.product_name}
                              </p>
                              <p className="card-text">{item.product_detail}</p>
                              <div className="text-left">
                                <p
                                  className="card-text"
                                  style={{
                                    fontSize: 20,
                                    padding: 10,
                                    fontWeight: "bold",
                                    color: "#e64a19",
                                  }}
                                >
                                  {" "}
                                  ฿ {item.product_price - item.discount} .-
                                </p>
                              </div>
                              <div className="text-right">
                                <button
                                  onClick={() => {
                                    productTocart(item);
                                  }}
                                  type="btn"
                                  className="btn btn-primary card-link"
                                >
                                  <i className="fa fa-cart-plus" /> เพิ่มสินค้า
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
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
                    <th minWidth="100"></th>
                  </tr>
                </thead>
                <tbody>
                  {productInCart.length > 0 ? (
                    <>
                      {productInCart.map((item, index) => {
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
                              <th>{item.name}</th>
                              <th>{item.price}</th>
                              <th>{item.qty}</th>
                              <th>{item.price * item.qty}</th>
                              <th>
                                <div className="row">
                                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="text-center">
                                      <button
                                        onClick={() => {
                                          plsuQTY(item);
                                        }}
                                        className="btn btn-primary"
                                      >
                                        <i className="fa fa-plus" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="text-center">
                                      <button
                                        onClick={() => {
                                          deleteQTY(item);
                                        }}
                                        className="btn btn-danger"
                                      >
                                        <i className="fa fa-minus" />
                                      </button>
                                    </div>
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
            <form onSubmit={Savedata}>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>ชื่อผู้สั่ง</label>
                    <input
                      autoComplete="off"
                      name="customer_name"
                      value={customer.customer_name}
                      onChange={handleChangeReserveData("customer_name")}
                      type="text"
                      className="form-control"
                      placeholder="ชื่อผู้สั่ง"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>เบอร์โทร</label>
                    <input
                      autoComplete="off"
                      name="customer_tel"
                      value={customer.customer_tel}
                      onChange={handleChangeReserveData("customer_tel")}
                      type="text"
                      className="form-control"
                      placeholder="เบอร์โทร"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-ml-12">
                  <div className="form-group">
                    <label>ที่อยู่</label>
                    <input
                      autoComplete="off"
                      name="customer_address"
                      value={customer.customer_address}
                      onChange={handleChangeReserveData("customer_address")}
                      type="text"
                      className="form-control"
                      placeholder="ที่อยู่"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
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
