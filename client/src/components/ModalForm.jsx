import { useState, useEffect } from "react";

export default function ModalForm({
  isOpen,
  onClose,
  onSubmit,
  mode,
  userData,
}) {
  const department = [
    "แผนกวิชาช่างยนต์",
    "แผนกวิชาช่างกลโรงงาน",
    "แผนกวิชาช่างเชื่อมโลหะ",
    "แผนกวิชาช่างไฟฟ้ากำลัง",
    "แผนกวิชาช่างอิเล็กทรอนิกส์",
    "แผนกวิชาเทคโนโลยีคอมพิวเตอร์",
    "แผนกวิชาช่างก่อสร้าง",
    "แผนกวิชาเทคโนโลยีพื้นฐาน",
    "แผนกวิชาเทคนิคพื้นฐาน",
    "แผนกวิชาเทคนิคสถาปัตยกรรม",
    "แผนกวิชาอาหารและโภชนาการ",
    "แผนกวิชาคหกรรมศาสตร์",
    "แผนกวิชาสามัญสัมพันธ์ (พลานามัย)",
    "แผนกวิชาศิลปกรรม",
    "แผนกวิชาการจัดการโลจิสติกส์",
    "แผนกวิชาการบัญชี",
    "แผนกวิชาการขายและการตลาด",
    "แผนกวิชาเทคโนโลยีสารสนเทศ",
    "แผนกวิชาวิจิตรศิลป์",
    "แผนกวิชาเทคนิคอุตสาหกรรม",
    "แผนกวิชาการออกแบบนิเทศศิลป์",
    "แผนกวิชาสามัญสัมพันธ์ (ภาษาไทย)",
    "แผนกวิชาสามัญสัมพันธ์ (สังคม)",
    "แผนกวิชาสามัญสัมพันธ์ (อังกฤษ)",
    "แผนกวิชาสามัญสัมพันธ์ (คณิตศาสตร์)",
    "แผนกวิชาสามัญสัมพันธ์ (วิทยาศาสตร์)",
    "แผนกวิชาคอมพิวเตอร์กราฟิก",
    "แผนกการจัดการคหกรรมเพื่อการโรงแรม",
    "แผนกวิชาแมคคาทรอนิกส์",
    "แผนกวิชาช่างซ่อมบำรุง",
    "แผนกวิชายานยนต์ไฟฟ้า",
    "แผนกวิชาการโรงแรม",
    "แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล",
  ];

  //สร้าง State สำหรับเก็บค่าฟอร์ม
  const [formData, setFormData] = useState({
    latter_name: "",
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
        received_date: userData?.received_date || "",
        department_id: userData?.department_id || "",
        status: userData?.status || "",
      });
    } else {
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
    e.preventDefault();
    try {
      await onSubmit(formData); // ส่งไปให้
      onClose(); // ปิด Modal
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null; // ไม่แสดง Modal ถ้า isOpen เป็น false

  return (
    <>
      <div className="fixed flex inset-0 items-center justify-center bg-stone-500/10">
        <div className="bg-white p-6 rounded shadow-lg">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">
              {mode === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
            </h2>
            <button className="btn " onClick={onClose}>
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
            />
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
              value={formData.received_date
                ? new Date(formData.received_date).toLocaleDateString("fr-CA")
                : ""}
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
              {department.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
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
            <button className="btn btn-success mt-3 text-white" type="submit"
            >
              {mode === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
