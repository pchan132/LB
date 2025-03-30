import { useState, useEffect } from "react";
import axios from "axios";
export default function ModalName({
  openModal,
  closeModal,
  dataName,
  departments,
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
      <div className="flex fixed inset-0 items-center justify-center bg-black/50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
            </h2>
            <button
              className="btn btn-sm btn-circle btn-outline btn-error"
              type="button"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                ชื่อ
              </label>
              <input
                type="text"
                value={info.firstName}
                id="firstName"
                name="firstName"
                className="input input-bordered w-full mt-1"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                นามสกุล
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={info.lastName}
                className="input input-bordered w-full mt-1"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700"
              >
                แผนก
              </label>
              <input
                type="text"
                value={info.department}
                name="department"
                id="department"
                className="input input-bordered w-full m-1"
                onChange={handleChange}
                list="departments"
              />
              <datalist id="departments">
                {departments.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </datalist>
            </div>
            <div>
              <input
                type="submit"
                className={`btn w-full ${
                  mode === "add" ? "btn-success" : "btn-warning"
                }`}
                value={mode === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
