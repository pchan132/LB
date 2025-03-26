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

  // console.log(receiverName);
  // console.log(userData);
  // console.log(countMap);
  if (!onOpenTable) return null;
  return (
    <>
      <div className="text-black fixed flex inset-0 bg-stone-500/10 justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold mr-4 ">
              รายชื่อที่มีจดหมาย {userData[0].department_id?.substring(0, 4)}
              {userData[0].department_id?.substring(8)}
            </h1>
            <button className="btn" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* แสดงรายชื่อ */}
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="text-black">
                <tr className="bg-gray-100 ">
                  <th>ชื่อ-นามสกุล</th>
                  <th className="text-center ">จำนวนจดหมาย</th>
                </tr>
              </thead>
              <tbody>
                {receiverName.map((receiverName, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-100"
                      onClick={() => OpenModalUser(receiverName)}
                    >
                      <td>{receiverName}</td>
                      <td className="text-center ">
                        <p>{countMap[receiverName]}</p> ฉบับ
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
