import { useEffect, useState } from "react";

export default function ModalUser({ isOpen, onClose, userData }) {
  useEffect(() => {
    if (isOpen) {
      console.log(userData);
      console.log(isOpen);
    }
  });
  if (!isOpen) return null;
  return (
      <div className="fixed flex inset-0 bg-stone-500/10 justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl">{userData.receiver_name}</h2>
          <p>ผู้ส่ง: {userData.sender_name}</p>
          <p>
            วันที่รับ(ด/ว/ป):{" "}
            {userData.received_date
              ? new Date(userData.received_date).toLocaleDateString()
              : ""}
          </p>
          <button className="btn btn-primary mt-2" onClick={onClose}>
            ปิด
          </button>
          </div>
      </div>
  );
}
