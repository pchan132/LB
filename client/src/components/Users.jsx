import { useState, useEffect } from "react";

export default function Users({
  userData,
  ModalOpen,
  searchTerm,
  onSearchName,
}) {
  const filterUsers = Array.isArray(userData)
    ? userData.filter((user) => {
        const matchName =
          typeof onSearchName === "string" && onSearchName.trim() !== ""
            ? user.receiver_name
                ?.toLowerCase()
                .includes(onSearchName.toLowerCase())
            : true; // ถ้าไม่มีค่าให้ผ่านทั้งหมด

        const matchDepartment =
          typeof searchTerm === "string" && searchTerm.trim() !== ""
            ? String(user.department_id || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            : true; // ถ้าไม่มีค่าให้ผ่านทั้งหมด

        return matchName && matchDepartment;
      })
    : [];

  return (
    <div className="p-4 max-w-4xl mx-auto border mt-2 overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ชือผู้รับ</th>
            <th>ชื่อแผนก</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers.length > 0 ? (
            filterUsers.map((user, index) => (
              <tr
                className="hover:bg-amber-100"
                key={index}
                onClick={() => {
                  ModalOpen(true, user);
                }}
              >
                <td>{user.receiver_name}</td>
                <td>{user.department_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center text-gray-500">
                ไม่พบข้อมูล
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
