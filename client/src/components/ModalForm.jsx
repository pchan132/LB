import { useState, useEffect, useMemo } from "react";

export default function ModalForm({
  isOpen,
  onClose,
  onSubmit,
  mode,
  userData,
  nameData,
}) {
  const [sarchName, setSarchName] = useState(""); //state สำหรับเก็บค่าชื่อ

  //สร้าง State สำหรับเก็บค่าฟอร์ม
  const [formData, setFormData] = useState({
    latter_name: "NOT",
    receiver_name: "",
    sender_name: "",
    received_date: "",
    department_id: "",
    status: "",
  });

  useEffect(() => {
    if (mode === "edit" && userData) {
      setFormData({
        latter_name: userData?.latter_name || "",
        receiver_name: userData?.receiver_name || "",
        sender_name: userData?.sender_name || "",
        received_date: userData.received_date
          ? userData.received_date.split("T")[0]
          : "",
        department_id: userData?.department_id || "",
        status: userData?.status || "NOT", // ถ้าไม่มีค่า ให้ใช้ "NOT"
      });
    } else if (mode === "add") {
      setFormData({
        latter_name: "NOT",
        receiver_name: "",
        sender_name: "",
        received_date: "",
        department_id: "",
        status: "NOT",
      });
    }
  }, [mode, userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    // ตรวจสอบว่ามีการกรอกข้อมูลครบถ้วนหรือไม่
    if (!formData.receiver_name) {
      alert("กรุณากรอกชื่อผู้รับ");
      return;
    } else if (!formData.sender_name) {
      alert("กรุณากรอกชื่อผู้ส่ง");
      return;
    } else if (!formData.received_date) {
      alert("กรุณากรอกวันที่รับ");
      return;
    } else if (!formData.department_id) {
      alert("กรุณาเลือกแผนก");
      return;
    } else if (!formData.status) {
      alert("กรุณาเลือกสถานะ");
      return;
    }
    try {
      await onSubmit(formData); // ส่งไปให้
      setFormData({
        latter_name: "NOT",
        receiver_name: "",
        sender_name: "",
        received_date: "",
        department_id: "",
        status: "NOT", // ค่าเริ่มต้นเป็น "NOT"
      });
      onClose(); // ปิด Modal
    } catch (error) {
      console.log(error);
    }
  };

  // เอาค่า department มาเก็บ
  const departments = Array.from(
    new Set(nameData.map((data) => data.department))
  );

  // กรองข้อมูลชื่อ
  const fileteredName = nameData.filter((name) => {
    const nameMatch =
      name.firstName === "" ||
      name.lastName ||
      name.firstName.toLowerCase().includes(sarchName.toLowerCase()) ||
      name.lastName.toLowerCase().includes(setSarchName.toLowerCase());
  });

  // ฟังก์ชั่นทำให้ชื่อที่เลือกตรงกับ แผนก
  const handleNameChange = (e) => {
    const selectedName = e.target.value;
    setFormData({ ...formData, receiver_name: selectedName });

    const foundUser = nameData.find(
      (name) => `${name.firstName} ${name.lastName}` === selectedName
    );

    if (foundUser) {
      setFormData((prevData) => ({
        ...prevData,
        department_id: foundUser.department || "",
      }));
    }
  };

  if (!isOpen) return null; // ไม่แสดง Modal ถ้า isOpen เป็น false

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
            </h2>
            <button
              className="btn btn-sm btn-circle btn-error btn-outline"
              onClick={onClose}
              aria-label="Close Modal"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="receiver_name"
              >
                ผู้รับ
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="ชื่อ-นามสกุล"
                id="receiver_name"
                name="receiver_name"
                value={formData.receiver_name}
                onChange={handleNameChange}
                list="Name_receiver"
              />
              <datalist id="Name_receiver">
                {nameData.map((name, index) => (
                  <option
                    key={index}
                    value={`${name.firstName} ${name.lastName}`}
                  >
                    {name.department}
                  </option>
                ))}
              </datalist>
            </div>

            <div>
              <label
                htmlFor="sender_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ผู้ส่ง
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="ชื่อผู้ส่ง, บริษัท"
                id="sender_name"
                name="sender_name"
                value={formData.sender_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="received_date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                วันที่รับ (ดด/วว/ปปปป)
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                id="received_date"
                name="received_date"
                value={formData.received_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="department_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                แผนก
              </label>
              <select
                id="department_id"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option disabled={true} value="">
                  เลือกแผนก
                </option>
                {departments.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                สถานะ
              </label>
              <select
                className="select select-bordered w-full"
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="NOT" className="text-red-500">
                  ยังไม่รับ
                </option>
                <option value="RECEIVED" className="text-green-500">
                  รับแล้ว
                </option>
              </select>
            </div>

            <button
              className={`btn w-full text-white ${
                mode === "add"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
              type="submit"
            >
              {mode === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
