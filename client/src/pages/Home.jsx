import { useState, useEffect } from "react";
import axios from "axios";

import ModalUser from "../components/ModalUser";
import Department from "../components/Department";
import ModalLetter from "../components/ModalLetter";
export default function Home() {
  const [data, setData] = useState({});
  const [onOpen, setOnOpen] = useState(false);
  const [openModalUser, setOpenModalUser] = useState(false);
  const [userData, setUserData] = useState({});
  const [userName, setUserName] = useState([]);
  // เปิดรายละเอียดข้อมูล
  const openModal = (user) => {
    setOnOpen(true);
    setUserData(user);
  };
  console.log("onOpen: ", onOpen);
  console.log("openModalUser: ", openModalUser);
  // เปิด ModalUser
  const isModalUser = (user) => {
    setOpenModalUser(true);
    setOnOpen(false);
    setUserName(user)
  };
  console.log("UserName: ", userName);
  console.log("userData: ", userData);

  // ปิดรายละเอียดข้อมูล
  const closeModal = () => {
    setOnOpen(false);
    setOpenModalUser(false);
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
      <Department userData={data} onOpen={openModal} />

      <ModalLetter
        onOpenTable={onOpen}
        onClose={closeModal}
        userData={userData}
        OpenModalUser={isModalUser}
      />
      <ModalUser
        isOpen={openModalUser}
        userData={userData}
        onClose={closeModal}
        userName={userName}
        openModalUser={openModal}
      />
    </>
  );
}
