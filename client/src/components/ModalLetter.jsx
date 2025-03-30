import { useEffect, useState } from "react";

export default function ModalLetter({
  onOpenTable,
  onClose,
  userData,
  OpenModalUser,
}) {
  const arrayUserData = Object.values(userData);

  // กรองให้เหลือชื่อที่ไม่ซ้ำกัน
  const receiverName = Array.from(
    new Set(arrayUserData.map((receiverName) => receiverName.receiver_name))
  );

  // ใช้ .reduce() ในการนับจำนวนจดหมายสำหรับแต่ละชื่อ
  // acc(accumulator) ตัวแปรที่ใช้สะสมค่า (ค่าเริ่มต้นคือ initialValue)
  // crr(currentValue)  สมาชิกในอาร์เรย์ที่ถูกวนลูป
  // ค่าปัจจุบัน initialValue ค่าตั้งต้นของ accumulator (ถ้าไม่กำหนด จะใช้ค่าตัวแรกของอาร์เรย์)
  const countMap = arrayUserData.reduce((acc, user) => {
    acc[user.receiver_name] = (acc[user.receiver_name] || 0) + 1;
    return acc;
  }, {});

  if (!onOpenTable) return null;
  return (
    <>
      <div className="text-black fixed flex inset-0 bg-black/50 justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-primary">
              รายชื่อที่มีจดหมาย {userData[0].department_id?.substring(0, 4)}
              {userData[0].department_id?.substring(8)}
            </h1>
            <button
              className="btn btn-sm btn-circle btn-error btn-outline"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* แสดงรายชื่อ */}
          <div className="overflow-x-auto max-h-96">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th>ชื่อ-นามสกุล</th>
                  <th className="text-center">จำนวนจดหมาย</th>
                </tr>
              </thead>
              <tbody>
                {receiverName.map((receiverName, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-primary/10 cursor-pointer"
                      onClick={() => OpenModalUser(receiverName)}
                    >
                      <td className="text-gray-700">{receiverName}</td>
                      <td className="text-center text-gray-700">
                        <p className="badge badge-neutral badge-outline">
                          {countMap[receiverName]}
                        </p>{" "}
                        ฉบับ
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
