import { useState, useEffect } from "react";
import axios from "axios";
import DeparmentList from "../components/DeparmentList";

export default function Home() {
  const [data, setData] = useState({});

  // ฟังก์ชันดึงข้อมูลจาก Database
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get");
      setData(response.data);
      console.log("✅ get Data success");
    } catch (err) {
      console.error("❌ Error fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
        <DeparmentList userData={data} />
    </>
  );
}
