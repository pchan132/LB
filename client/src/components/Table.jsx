import { useState, useEffect } from "react";
import axios from "axios";

export default function Table({data, onEdit}) {

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
              <th>วันที่รับ</th>
              <th>แผนก</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {/* แสดงข้อมูล */}
            {data.map((item, index) => {
              return (
                <tr key={index} className="text-center">
                  <td className="text-base">{index + 1}</td>
                  <td className="text-base">{item.receiver_name}</td>
                  <td className="text-base">{item.sender_name}</td>
                  <td className="text-base">
                    {new Date(item.received_date).toLocaleDateString("th-TH")}
                  </td>
                  <td className="text-base">{item.department_id}</td>
                  <td>
                    <span
                      className={`btn btn-xs text-base p-3.5 cursor-auto ${
                        item.status == "NOT" ? "btn-error" : "btn-success"
                      }`}
                    >
                      {item.status == "NOT" ? "ยังไม่รับ" : "รับแล้ว"}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-soft btn-sm ">ลบ</button>
                    <button
                      className="btn btn-warning btn-sm ml-2"
                      onClick={() => onEdit("edit")}
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
