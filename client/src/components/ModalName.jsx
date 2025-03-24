import { useState, useEffect } from "react";
import axios from "axios";
export default function ModalName({
  openModal,
  closeModal,
  dataName,
  mode,
  onSubmit,
}) {
  // สร้ารการเปลี่ยนแปลง
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    department: "",
  });
  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // submit ให้ข้อมูลเข้าไปที่ info
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บ
    // ตรวจสอบข้อมูลก่อนส่ง
    if (!info.firstName) {
      alert("กรุณากรอกชื่อ");
      return;
    } else if (!info.lastName) {
      alert("กรุณากรอกนามสกุล");
      return;
    } else if (!info.department) {
      alert("กรุณากรอกแผนก");
      return;
    }
    try {
      await onSubmit(info);
      setInfo({
        firstName: "",
        lastName: "",
        department: "",
      });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      setInfo({
        firstName: dataName.firstName || "",
        lastName: dataName.lastName || "",
        department: dataName.department || "",
      });
    } else if (mode === "add") {
      setInfo({
        firstName: "",
        lastName: "",
        department: "",
      });
    }
  }, [mode, dataName]);
  if (!openModal) return null;
  return (
    <>
      <div className="flex fixed inset-0 items-center justify-center bg-stone-500/10">
        <div className="bg-white p-4 rounded-sm shadow-lg">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">
              {mode === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
            </h2>
            <button className="btn" type="button" onClick={closeModal}>
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName" className="fieldset-label mb-0.5 mt-0.5">
              ชื่อ
            </label>
            <input
              type="text"
              value={info.firstName}
              id="firstName"
              name="firstName"
              className="input"
              onChange={handleChange}
            />
            <label htmlFor="lastName" className="fieldset-label mb-0.5 mt-0.5">
              นามสกุล
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={info.lastName}
              className="input"
              onChange={handleChange}
            />
            <label htmlFor="deparment" className="fieldset-label mb-0.5 mt-0.5">
              แผนก
            </label>
            <input
              type="text"
              value={info.department}
              name="department"
              id="department"
              className="input"
              onChange={handleChange}
            />
            <input
              type="submit"
              className={`btn mt-2 text-white ${
                mode === "add" ? "bg-green-500" : "bg-yellow-500"
              }`}
              value={mode === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
            />
          </form>
        </div>
      </div>
    </>
  );
}
