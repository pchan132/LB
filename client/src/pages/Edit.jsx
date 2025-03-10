import { useState, useEffect } from "react";
import axios from "axios";

import Table from "../components/Table";
import ModalForm from "../components/ModalForm";
import { data } from "react-router-dom";

export default function Edit() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [tableData, setTableData] = useState([]); //ข้อมูลทั้งหมด
  const [userData, setUserData] = useState({}); // ข้อมูลตอแก้ไข
  // ฟังก์ชันเปิด Modal
  const openModal = (mode, data) => {
    setUserData(data);
    console.log(data);
    setModalMode(mode); // กำหนดโหมดของ Modal ('add' หรือ 'edit')
    setIsOpen(true); // เปิด Modal
  };

  // ฟังก์ชันปิด Modal
  const closeModal = () => {
    setIsOpen(false); // ปิด Modal
  };

  // ฟังก์ชันดึงข้อมูลจาก Database
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get");
      setTableData(response.data);
      console.log("✅ get Data success");
    } catch (err) {
      console.error("❌ Error fetch data:", err);
    }
  };

  // ดึงข้อมูลเมื่อ Component โหลดครั้งแรก
  useEffect(() => {
    fetchData();
  }, []);

  // ฟังก์ชันบันทึกข้อมูล
  const submit = async (newData) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post("http://localhost:3000/add", newData);
        console.log("add", response.data);
        fetchData(); // 🔄 โหลดข้อมูลใหม่
        console.log(newData.received_date);
      } catch (err) {
        console.error("Error Add data:", err);
      }
    } else if (modalMode === "edit") {
      try {
        console.log(data.letter_id);
        const response = await axios.put(
          `http://localhost:3000/update/${userData.letter_id}`,
          newData
        );
        console.log("edit success");
        fetchData(); // 🔄 โหลดข้อมูลใหม่
        console.log(newData.received_date);
      } catch (err) {
        console.error("Error Edit data:", err);
      }
    }
  };

  // ลบข้อมูล
  const deleteData = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/delete/${id}`);
      console.log("✅ delete success");
      fetchData(); // 🔄 โหลดข้อมูลใหม่
    } catch (err) {
      console.error("Error Delete data:", err);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-3 mt-15 mr-5">
        <h1 className="text-2xl ml-20">รายการ</h1>
        <button className="btn btn-primary" onClick={() => openModal("add")}>
          เพิ่มข้อมูล
        </button>
      </div>
      <Table dataTable={tableData} onEdit={openModal} dataDelete={deleteData} />
      <ModalForm
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={submit}
        mode={modalMode}
        userData={userData}
      />
    </>
  );
}
