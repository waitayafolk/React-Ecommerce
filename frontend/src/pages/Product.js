import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import swal from "sweetalert";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [groupproduct, setGrpupproduct] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [detailProduct, setDetailProduct] = useState({
    header: "",
    id: 0,
    product_code: "",
    product_name: "",
    product_price: 0,
    discount: 0,
    group_product_id: "",
    product_detail: "",
    image: "",
    status: "",
  });

  useEffect(() => {
    getGroupproduct();
    getProduct();
  }, []);

  const handleChangeReserveData = (prop) => (event) => {
    setDetailProduct({ ...detailProduct, [prop]: event.target.value });
  };

  const getGroupproduct = async () => {
    let url = "http://localhost:4500/groupproduct";
    let rs = await axios.get(url);
    setGrpupproduct(rs.data);
  };

  const getProduct = async () => {
    let url = "http://localhost:4500/product";
    let rs = await axios.get(url);
    setProduct(rs.data);
  };

  const ProductSave = async (product) => {
    setDetailProduct(product);
    setShow(true);
  };

  const Savedata = async () => {
    let url = "http://localhost:4500/product/save";
    let rs = await axios.post(url, {
      id: detailProduct.id,
      product_code: detailProduct.product_code,
      product_name: detailProduct.product_name,
      product_price: detailProduct.product_price,
      discount: detailProduct.discount,
      group_product_id: detailProduct.group_product_id,
      product_detail: detailProduct.product_detail,
      image: detailProduct.image,
    });
    if (rs.data.status == "success") {
      getProduct();
      swal("บันทึกสำเร็จ !", "บันทึกข้อมูลเสร็จสิ้น", "success");
      setShow(false);
    } else {
      swal("เกิดข้อผิดพลาด !", "กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง", "error");
    }
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post("http://localhost:4500/picture_product", formData);
      setDetailProduct({ ...detailProduct, image :res.data.fileName });
    } catch (ex) {
      console.log(ex);
    }
  };

  const DeleteProduct = async (id) => {
    swal({
      title: "ลบสินค้า?",
      text: "ยืนยันการลบ !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        let url = `http://localhost:4500/product/delete/${id}`;
        let rs = await axios.get(url);
        if (rs.data.status == "success") {
          getProduct();
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
                สินค้า
              </h3>
            </div>
            <div style={{ padding: 20 }}>
              <div className="row">
                <div className="text-left col-6 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <button
                    onClick={() => {
                      ProductSave({
                        header: "เพิ่มสินค้า",
                        id: 0,
                        product_code: "",
                        product_name: "",
                        product_price: 0,
                        discount: 0,
                        group_product_id: "",
                        product_detail: "",
                        image: "",
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
                    เพิ่มสินค้า
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
                      <th className="min-vw-90">รูปภาพ</th>
                      <th className="min-vw-90">รหัสสินค้า</th>
                      <th className="min-vw-90">ชื่อสินค้า</th>
                      <th className="min-vw-90">ราคา</th>
                      <th className="min-vw-90">ส่วนลด</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.length > 0 ? (
                      <>
                        {product.map((item, index) => {
                          item.header = "แก้ไขสินค้า";
                          return (
                            <>
                              <tr>
                                <th style={{ textAlign: "center", width: 10 }}>
                                  {index + 1}
                                </th>
                                <th><img style={{width : 50 , width : 50}} src={`http://localhost:4500/public/${item.image}`}/></th>
                                <th>{item.product_code}</th>
                                <th>{item.product_name}</th>
                                <th>{item.product_price}</th>
                                <th>{item.discount}</th>
                                <th>
                                  <div className="row">
                                    <div
                                      className="min-vw-90"
                                      className="col-12 col-sm-12 col-md-6 col-ml-6 col-xl-6"
                                    >
                                      <button
                                        onClick={() => {
                                          ProductSave(item);
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
                                        onClick={() => {
                                          DeleteProduct(item.id);
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
            <h4 className="modal-title">{detailProduct.header}</h4>
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
              <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>รหัสสินค้า</label>
                    <input
                      autoComplete="off"
                      name="product_code"
                      value={detailProduct.product_code}
                      onChange={handleChangeReserveData("product_code")}
                      type="text"
                      className="form-control"
                      placeholder="รหัสสินค้า"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>ชื่อสินค้า</label>
                    <input
                      autoComplete="off"
                      name="product_name"
                      value={detailProduct.product_name}
                      onChange={handleChangeReserveData("product_name")}
                      type="text"
                      className="form-control"
                      placeholder="ชื่อสินค้า"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>ราคา</label>
                    <input
                      autoComplete="off"
                      name="product_price"
                      value={detailProduct.product_price}
                      onChange={handleChangeReserveData("product_price")}
                      type="number"
                      className="form-control"
                      placeholder="ราคา"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>ส่วนลด</label>
                    <input
                      autoComplete="off"
                      name="discount"
                      value={detailProduct.discount}
                      onChange={handleChangeReserveData("discount")}
                      type="number"
                      className="form-control"
                      placeholder="ส่วนลด"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>รายละเอียด</label>
                    <input
                      autoComplete="off"
                      name="product_detail"
                      value={detailProduct.product_detail}
                      onChange={handleChangeReserveData("product_detail")}
                      type="text"
                      className="form-control"
                      placeholder="รายละเอียด"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label>ประเภทสินค้า</label>
                    <select
                      onChange={handleChangeReserveData("group_product_id")}
                      value={detailProduct.group_product_id}
                      class="form-control"
                    >
                      {groupproduct.length > 0 ? (
                        <>
                          {groupproduct.map((item, index) => {
                            return (
                              <>
                                <option name="group_product_id" value={item.id}>
                                  {item.group_product_name}
                                </option>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <></>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-ml-6 col-xl-6">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">รูปภาพ</label>
                    <input
                      onChange={saveFile}
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                    />
                  </div>
                  <button onClick={uploadFile}>Upload</button>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={()=>{Savedata()}}
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
          </div>
        </div>
      </Modal>
    </>
  );
}
