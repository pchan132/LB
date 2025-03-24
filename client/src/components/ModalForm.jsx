import { useState, useEffect } from "react";

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
        status: userData?.status || "",
      });
    } else if (mode === "add") {
      setFormData({
        latter_name: "NOT",
        receiver_name: "",
        sender_name: "",
        received_date: "",
        department_id: "",
        status: "",
      });
    }
  }, [mode, userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    try {
      await onSubmit(formData); // ส่งไปให้
      setFormData({
        latter_name: "NOT",
        receiver_name: "",
        sender_name: "",
        received_date: "",
        department_id: "",
        status: "",
      });
      onClose(); // ปิด Modal
    } catch (error) {
      console.log(error);
    }
  };

  // เอาค่า department มาเก็บ
  const departments = [...new Set(nameData.map((data) => data.department))];

  // กรองข้อมูลชื่อ
  const fileteredName = nameData.filter((name) => {
    const nameMatch =
      name.firstName === "" ||
      name.lastName ||
      name.firstName.toLowerCase().includes(sarchName.toLowerCase()) ||
      name.lastName.toLowerCase().includes(setSarchName.toLowerCase());
  });

  if (!isOpen) return null; // ไม่แสดง Modal ถ้า isOpen เป็น false

  return (
    <>
      <div className="fixed flex inset-0 items-center justify-center bg-stone-500/10">
        <div className="bg-white p-6 rounded shadow-lg">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">
              {mode === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
            </h2>
            <button className="btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label
              className="fieldset-label mb-0.5 mt-0.5"
              htmlFor="receiver_name"
            >
              ผู้รับ
            </label>
            <input
              type="text"
              className="input"
              id="receiver_name"
              name="receiver_name"
              value={formData.receiver_name}
              onChange={handleChange}
              list="Name_receiver"
            />
            {/* ชื่อขึ้น สามารถพิมพ์แผนกได้ */}
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

            <label
              htmlFor="sender_name"
              className="fieldset-label mb-0.5 mt-0.5"
            >
              ผู้ส่ง
            </label>
            <input
              type="text"
              className="input"
              id="sender_name"
              name="sender_name"
              value={formData.sender_name}
              onChange={handleChange}
            />
            <label
              htmlFor="received_date"
              className="fieldset-label mb-0.5 mt-0.5"
            >
              วันที่รับ (ดด/วว/ปปปป)
            </label>
            <input
              type="date"
              className="input"
              id="received_date"
              name="received_date"
              value={formData.received_date}
              onChange={handleChange}
            />
            <label
              htmlFor="department_id"
              className="fieldset-label mb-0.5 mt-0.5"
            >
              แผนก
            </label>
            <select
              id="department_id"
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              className="select"
            >
              <option disabled={true} value="">
                เลือกแผนก
              </option>
              {departments.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
              ;
            </select>
            <label htmlFor="status" className="fieldset-label mb-0.5 mt-0.5">
              สถานะ
            </label>
            <select
              className="select"
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option disabled={true} value="">
                เลือกสถานะ
              </option>
              <option value="NOT" className="text-red-500">
                ยังไม่รับ
              </option>
              <option value="RECEIVED" className="text-green-500">
                รับแล้ว
              </option>
            </select>
            <button className="btn btn-success mt-3 text-white" type="submit">
              {mode === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
