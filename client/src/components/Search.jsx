import { useState } from "react";
export default function Search({ onSearch, onSearchName }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchName, setSearchName] = useState("");
  const departments = [
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
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // ส่งค่าไปที่ Component หลัก
  };

  const handleSearchName = (event) => {
    const value = event.target.value;
    setSearchName(value);
    onSearchName(value); // ส่งค่าไปที่ Users
  };

  return (
    <div className="flex justify-center items-center">
      <input
        type="search"
        className="input input-bordered w-full max-w-xs"
        onChange={handleSearchName}
        placeholder="ค้นหาชื่อ"
        value={searchName}
      />
      <select className="select select-bordered ml-2" onChange={handleSearch}>
        <option value="">เลือกแผนก</option>
        {departments.map((departments, index) => (
          <option key={index} value={departments}>
            {departments}
          </option>
        ))}
      </select>
    </div>
  );
}
