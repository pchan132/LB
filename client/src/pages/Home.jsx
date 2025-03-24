import { useState, useEffect } from "react";
import axios from "axios";

import ModalUser from "../components/ModalUser";
import Department from "../components/Department";
export default function Home() {
  const [data, setData] = useState({});
  const [onOpen, setOnOpen] = useState(false);
  const [userData, setuserData] = useState({});
  // เปิดรายละเอียดข้อมูล
  const openModal = (statusModal, user) => {
    setOnOpen(statusModal);
    setuserData(user);
  };
  // ปิดรายละเอียดข้อมูล
  const closeModal = () => {
    setOnOpen(false);
  };
  // ฟังก์ชันดึงข้อมูลจาก Database
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get");
      setData(response.data);
      console.log("✅ get Data success");
    } catch (err) {
      console.error("❌ Error fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Department userData={data}/>
    
      {/* <div className="flex ">
        <ModalUser isOpen={onOpen} userData={userData} onClose={closeModal} />
      </div> */}
    </>
  );
}
