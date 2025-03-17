import { useState, useEffect } from "react";
import axios from "axios";
import DeparmentList from "../components/DeparmentList";
import ModalUser from "../components/ModalUser";
import Search from "../components/Search";
import Users from "../components/Users";
export default function Home() {
  const [data, setData] = useState({});
  const [onOpen, setOnOpen] = useState(false);
  const [userData, setuserData] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // state สำหรับเก็บค่าค้นหา
  const [searchName, setSearchName] = useState(""); // state สำหรับเก็บค่าค้นหา]
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
      <div className="flex justify-center mt-2">
        <Search onSearch={setSearchTerm} onSearchName={setSearchName} />
      </div>
      <div className="">
          {/* <DeparmentList
            userData={data}
            ModalUserData={openModal}
            searchTerm={searchTerm}
          /> */}
          <Users
            userData={data}
            ModalOpen={openModal}
            searchTerm={searchTerm}
            onSearchName={searchName}
          />
      
        <div className="flex ">
          <ModalUser isOpen={onOpen} userData={userData} onClose={closeModal} />
        </div>
      </div>
    </>
  );
}
