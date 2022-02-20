import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import swal from "sweetalert";

export default function Product() {
  return (
    <>
      <Header />
      <Menu />
    </>
  );
}
