import { useEffect, useState } from "react";

export default function ModalUser({
  isOpen,
  onClose,
  userData,
  userName,
  openModalUser,
}) {
  const ArrayUserData = Object.values(userData);

  // กรองจกหมายตามชื่อผู้ส่ง
  const filterReceiverName = () => {
    const receiverMatch = ArrayUserData.filter(
      (letter) => letter.receiver_name === userName
    );
    return receiverMatch;
  };
  console.log("filterReceiverName: ", filterReceiverName());

  if (!isOpen) return null;
  return (
    <>
      <div className="text-black fixed flex inset-0 bg-stone-500/10 justify-center items-center backdrop-blur-sm">
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold mr-20">จดหมายนาย {userName}</h1>
            <button
              variant="ghost"
              className="btn"
              onClick={() => {
                onClose();
                openModalUser(userData);
              }}
            >
              ✕
            </button>
          </div>

          {/* แสดงจดหมาย */}
          <div className="space-y-3 max-h-100 overflow-y-auto  mt-3">
              {filterReceiverName().length > 0 ? (
                filterReceiverName().map((letter, index) => (
                  <div key={index} className="card  bg-base-100 shadow-md border border-gray-200 rounded">
                    <div className="card-body">
                      <p className="font-bold text-lg card-title">จดหมายที่ {index + 1} ✉️📦</p>
                      <p className="text-sm">ผู้รับ: {letter.receiver_name}</p>
                      <p className="text-sm">ผู้ส่ง: {letter.sender_name}</p>
                      <p className="text-sm">วันที่รับ: {letter.received_date? new Date(letter.received_date).toLocaleDateString():"ไม่มีข้อมูล"}</p>
                    </div>
                  </div>
                ))
              ):(
                <p className="text-gray-500 text-center">
                  ไม่มีจดหมายในขณะนี้
                </p>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
