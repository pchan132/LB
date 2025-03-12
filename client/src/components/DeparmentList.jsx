import axios from "axios";

export default function DeparmentList({
  userData,
  ModalUserData,
  openModalDepartment,
}) {
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

  const renderDepartmentList = () => {
    if (!userData || !userData.length)
      // ตรวจสอบว่ามีข้อมูลหรือไม่
      return (
        <>
          <div>ไม่มีจดหมาย </div>
        </>
      );

    // จัดกลุ่ม จดหมายของแต่ละแผนก
    const departmentMap = new Map();

    userData.forEach((user) => {
      // ตรวจสอบว่า แผนกใน departments มีค่าตรงกับ user.department_id ที่อยู่ในนั้นไหมไหม
      if (departments.includes(user.department_id)) {
        // ถ้าไม่มีในข้อมูลที่ จัดใหม่ให้ สร้างชุดข้อมูล
        if (!departmentMap.has(user.department_id)) {
          // เอาแผนกใส่ไปใน departmentMap
          departmentMap.set(user.department_id, []); // ถ้ายังไม่มี key นี้ ให้สร้างอาร์เรย์ใหม่
        }
        // เมื่อ departments มีค่าตรงกับ user.department_id ให้เพิ่มข้อมูล user เข้าไปใน departmentMap
        departmentMap.get(user.department_id).push(user);
        console.log("สร้างข้อมูลแล้ว");
      }
    });
    // ให้ส่งออกไปที่หน้าเว็บ
    return (
      <>
        {[...departmentMap.keys()].map((department_id) => (
          <details
            tabIndex={0}
            key={department_id}
            className="collapse collapse-arrow bg-base-100 border-base-300 border mb-2 hover:bg-amber-50"
          >
            {/* <input type="radio" name="department"/> */}
            <summary className="collapse-title text-lx font-semibold">
              {department_id}
            </summary>
            <div className="collapse-content flex flex-col gap-2 ">
              {departmentMap.get(department_id).map((user, index) => (
                <div
                  key={index}
                  className="p-2  hover:bg-amber-200 rounded cursor-pointer border"
                  onClick={() => {
                    ModalUserData(true, user);
                  }}
                >
                  {user.receiver_name}
                </div>
              ))}
            </div>
          </details>
        ))}{" "}
      </>
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto border mt-2">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <h1 className="text-2xl font-bold">แผนกที่มีจดหมาย</h1>
      </div>
      {renderDepartmentList()}
    </div>
  );
}
