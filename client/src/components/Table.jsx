import { useState, useEffect } from "react";
import axios from "axios";

export default function Table({ dataTable, onEdit, dataDelete, dataUser }) {
  const [searchTerm, setSearchTerm] = useState(""); // state สำหรับเก็บค่าค้นหา
  const [selectedDepartment, setSelectedDepartment] = useState(""); // state สำหรับเก็บค่าแผนกที่เลือก
  const [status, setStatus] = useState(""); // state สำหรับเก็บค่าสถานะ

  // ฟังก์ชันจัดรูปแบบวันที่
  const formatDate = (dateString) => {
    if (!dateString) return "-"; // กัน error ถ้าไม่มีค่า
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // วันที่
    const month = String(date.getMonth() + 1).padStart(2, "0"); // เดือน (เริ่มที่ 0 ต้อง +1)
    const year = date.getFullYear(); // ปี
    return `${day}-${month}-${year}`; // แสดงเป็น DD-MM-YYYY
  };

  // ฟังก์ชั่นค้นหาข้อมูล
  const filteredData = dataTable.filter((data) => {
    const departmentMatch =
      selectedDepartment === "" || data.department_id === selectedDepartment;
    const nameMatch =
      data.receiver_name === "" ||
      data.receiver_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.sender_name.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = status === "" || data.status === status;
    return departmentMatch && nameMatch && statusMatch;
  });

  // รีเซ็ทคำค้นหา
  const resetSearch = () => {
    setSearchTerm("");
    setSelectedDepartment("");
    setStatus("");
  };

  // department
  const departments = [...new Set(dataTable.map((item) => item.department_id))];

  return (
    <>
      {/* ช่องค้นหา */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="ค้นหาชื่อผู้ส่ง/ชื่อผู้รับ"
          className="input input-bordered mx-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* เลือกแผนก */}
        <select
          name="department"
          id="department"
          className="select select-bordered "
          onChange={(e) => setSelectedDepartment(e.target.value)}
          value={selectedDepartment}
        >
          <option value="">เลือกแผนก</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* เลือกสถานะ */}
        <select
          name="status"
          id="status"
          className="select select-bordered mx-2"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option value="">เลือกสถานะ</option>
          <option value="NOT">ยังไม่รับ</option>
          <option value="RECEIVED">รับแล้ว</option>
        </select>
        <button className="btn" onClick={resetSearch}>
          รีเซ็ตการค้นหา
        </button>
      </div>

      {/* ตารางข้อมูล */}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          {/* หัวตาราง */}
          <thead className="bg-gray-50 text-center">
            <tr>
              <th>ลำดับ</th>
              <th>ผู้รับ</th>
              <th>ผู้ส่ง</th>
              <th>วันที่รับ (วว/ดด/ปปปป)</th>
              <th>แผนก</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {/* แสดงข้อมูล */}
            {filteredData.map((item, index) => {
              return (
                <tr key={item.letter_id} className="text-center">
                  <td className="text-base">{index + 1}</td>
                  <td className="text-base">{item.receiver_name}</td>
                  <td className="text-base">{item.sender_name}</td>
                  <td className="text-base">
                    {formatDate(item.received_date)}
                  </td>
                  <td className="text-base">{item.department_id}</td>
                  <td>
                    <span
                      className={`badge badge-sm text-base text-white p-3.5 cursor-auto ${
                        item.status == "NOT" ? "badge-error" : "badge-success"
                      }`}
                    >
                      {item.status == "NOT" ? "ยังไม่รับ" : "รับแล้ว"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-soft btn-sm"
                      onClick={() => dataDelete(item.letter_id)}
                    >
                      ลบ
                    </button>
                    <button
                      className="btn btn-warning btn-sm ml-2"
                      onClick={() => onEdit("edit", item)}
                    >
                      แก้ไข
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
