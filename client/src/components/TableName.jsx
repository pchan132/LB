import React, { useState } from "react";
import axios from "axios";
export default function TableName({ tableDataName, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState(""); // คำที่ใช้ค้นหา
  const [selectedDepartment, setSelectedDepartment] = useState(""); // แผนกที่เลือก

  // ดึงรายชื่อแผนกที่ไม่ซ้ำกันจากข้อมูล
  const departments = [
    ...new Set(tableDataName.map((data) => data.department)),
  ];

  // ฟังก์กรองข้อมูล
  const filteredData = tableDataName.filter((data) => {
    const departmentMatch =
      selectedDepartment === "" || data.department === selectedDepartment;
    const nameMatch =
      data.firstName === "" || data.lastName === "" ||
      data.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    return departmentMatch && nameMatch;
  });

  const reset = () => {
    setSearchTerm("");
    setSelectedDepartment("");
  };
  console.log(departments); // !!
  return (
    <div className="flex flex-col items-center p-4">
      {/* ช่องค้นหา */}
      <div className="md-4 flex gap-2 w-full max-w-lg">
        <input
          type="text"
          placeholder="ค้นหาชื่อ-นามสกุล"
          className="input w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* เลือกแผนก */}
        <select
          className="select w-auto"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">เลือกแผนก</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <button className="btn" onClick={reset}>
          รีเซ็ต
        </button>
      </div>

      {/* แสดงข้อมูล */}
      <div className="mb-4 flex gap-2"></div>
      <table className="table ">
        <thead className="bg-gray-200 text-center">
          <tr>
            <th className="border px-4 py-2">ลำดับ</th>
            <th className="border px-4 py-2">ชื่อ</th>
            <th className="border px-4 py-2">นามสกุล</th>
            <th className="border px-4 py-2">แผนก</th>
            <th className="border px-4 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={data.idName} className="text-center hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4">{data.firstName}</td>
              <td className="border px-4">{data.lastName}</td>
              <td className="border px-4">{data.department}</td>
              <td className="border px-4">
                <button
                  className="bg-red-500 px-2 rounded py-1 text-white mx-1"
                  onClick={() => onDelete(data.idName)}
                >
                  ลบ
                </button>
                <button
                  className="bg-blue-500 px-2 rounded py-1 text-white "
                  onClick={() => onEdit("edit", data)}
                >
                  แก้ไข
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
