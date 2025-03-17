import axios from "axios";
import { useState, useEffect } from "react";
import TableName from "../components/TableName";

export default function EditName(userData) {
  const [tableData, setTableData] = useState([]); //ข้อมูลทั้งหมด
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    department: "",
  });

  // ฟังก์ชันดึงข้อมูลจาก Database
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getName");
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

  const submit = async (newData) => {
    const response = await axios.post(
      "http://localhost:3000/createName",
      newData
    );
    console.log(response.data);
    fetchData();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ลบข้อมูล
  const deleteData = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteName/${id}`
      );
      console.log("✅ delete success");
      fetchData(); // 🔄 โหลดข้อมูลใหม่
    } catch (err) {
      console.error("Error Delete data:", err);
    }
  };

  const departments = [
    "แผนกวิชาช่างยนต์",
    "แผนกวิชาช่างกลโรงงาน",
    "แผนกวิชาช่างเชื่อมโลหะ",
    "แผนกวิชาช่างไฟฟ้ากำลัง",
    "แผนกวิชาช่างอิเล็กทรอนิกส์",
    "แผนกวิชาเทคโนโลยีคอมพิวเตอร์",
    "แผนกวิชาช่างก่อสร้าง",
    "แผนกวิชาเทคโนโลยีพื้นฐาน",
    "แผนกวิชาเทคนิคพื้นฐาน",
    "แผนกวิชาเทคนิคสถาปัตยกรรม",
    "แผนกวิชาอาหารและโภชนาการ",
    "แผนกวิชาคหกรรมศาสตร์",
    "แผนกวิชาสามัญสัมพันธ์ (พลานามัย)",
    "แผนกวิชาศิลปกรรม",
    "แผนกวิชาการจัดการโลจิสติกส์",
    "แผนกวิชาการบัญชี",
    "แผนกวิชาการขายและการตลาด",
    "แผนกวิชาเทคโนโลยีสารสนเทศ",
    "แผนกวิชาวิจิตรศิลป์",
    "แผนกวิชาเทคนิคอุตสาหกรรม",
    "แผนกวิชาการออกแบบนิเทศศิลป์",
    "แผนกวิชาสามัญสัมพันธ์ (ภาษาไทย)",
    "แผนกวิชาสามัญสัมพันธ์ (สังคม)",
    "แผนกวิชาสามัญสัมพันธ์ (อังกฤษ)",
    "แผนกวิชาสามัญสัมพันธ์ (คณิตศาสตร์)",
    "แผนกวิชาสามัญสัมพันธ์ (วิทยาศาสตร์)",
    "แผนกวิชาคอมพิวเตอร์กราฟิก",
    "แผนกการจัดการคหกรรมเพื่อการโรงแรม",
    "แผนกวิชาแมคคาทรอนิกส์",
    "แผนกวิชาช่างซ่อมบำรุง",
    "แผนกวิชายานยนต์ไฟฟ้า",
    "แผนกวิชาการโรงแรม",
    "แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit(formData);
    setFormData({
      firstName: "",
      lastName: "",
      department: "",
    });
  };
  const openModal = (mode, data) => {
    setUserData(data);
    console.log(data);
    setModalMode(mode); // กำหนดโหมดของ Modal ('add' หรือ 'edit')
    setIsOpen(true); // เปิด Modal
  };

  return (
    <div className="flex items-center justify-center mb-3 mt-15 mr-10">
      <div>
        <form className="fieldset flex">
          <input
            type="text"
            className="input"
            placeholder="ชื่อ"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            className="input"
            placeholder="นามสกุล"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <select
            name="department"
            id="department"
            className="select"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="" disabled={true}>
              เลือกแผนก
            </option>
            {departments.map((user, index) => (
              <option key={index} value={user}>
                {user}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            เพิ่มรายชื่อ
          </button>
        </form>
        <TableName tableDataName={tableData}/>
      </div>
    </div>
  );
}
