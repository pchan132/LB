import { useState, useEffect } from "react";
import axios from "axios";

export default function Table ({ dataTable, onEdit, dataDelete}) {
  const formatDate = (dateString) => {
    if (!dateString) return "-"; // กัน error ถ้าไม่มีค่า
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // วันที่
    const month = String(date.getMonth() + 1).padStart(2, "0"); // เดือน (เริ่มที่ 0 ต้อง +1)
    const year = date.getFullYear(); // ปี
    return `${day}-${month}-${year}`; // แสดงเป็น DD-MM-YYYY
  };
  return (
    <>
      <div className="overfrow-x-auto">
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
            
            {dataTable.map((item, index) => {
              return (
                <tr key={item.letter_id} className="text-center">
                  <td className="text-base">{index + 1}</td>
                  <td className="text-base">{item.receiver_name}</td>
                  <td className="text-base">{item.sender_name}</td>
                  <td className="text-base">{formatDate(item.received_date)}</td>
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
                    <button className="btn btn-soft btn-sm"
                    onClick={() => dataDelete(item.letter_id)}
                    >ลบ</button>
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
