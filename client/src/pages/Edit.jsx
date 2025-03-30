import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Table from "../components/Table";
import ModalForm from "../components/ModalForm";
import { data } from "react-router-dom";

export default function Edit() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [tableData, setTableData] = useState([]); //ข้อมูลทั้งหมด
  const [userData, setUserData] = useState({}); // ข้อมูลตอแก้ไข
  const [nameData, setNameData] = useState([]);
  // ฟังก์ชันเปิด Modal
  const openModal = (mode, data) => {
    setUserData(data);
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
      const responseName = await axios.get("http://localhost:3000/getName");
      setTableData(response.data);
      setNameData(responseName.data); // !!
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
      {/* ส่วนหัว */}
      <div className="min-h-screen bg-base-200 p-6 flex flex-col items-center">
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-semibold text-primary">รายการ</h1>
            {/* เพิ่มชื่อคน */}
            <div className="flex flex-wrap gap-2">
              <Link className="btn btn-outline btn-primary" to="/editName">
                เพิ่มชื่อ
              </Link>
              {/* เพิ่มจดหมาย */}
              <button
                className="btn btn-primary"
                onClick={() => openModal("add")}
              >
                เพิ่มจดหมาย
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table
              dataTable={tableData}
              onEdit={openModal}
              dataDelete={deleteData}
              dataUser={nameData}
            />
          </div>
        </div>
        <ModalForm
          isOpen={isOpen}
          onClose={closeModal}
          onSubmit={submit}
          mode={modalMode}
          userData={userData}
          nameData={nameData}
        />
      </div>
    </>
  );
}
