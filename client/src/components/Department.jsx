import { useState, useEffect } from "react";

export default function Department({ userData }) {
  const arrayUserData =
    userData && Array.isArray(userData) ? userData : Object.values(userData);

  const departments = [
    ...new Set(arrayUserData.map((user) => user.department_id)),
  ];

  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!userData || !userData.length) return;

    const departmentMap = new Map();

    userData.forEach((user) => {
      if (departments.includes(user.department_id)) {
        if (!departmentMap.has(user.department_id)) {
          departmentMap.set(user.department_id, []);
        }
        departmentMap.get(user.department_id).push(user);
      }
    });

    // ค้นหาด้วย searchTerm
    const filtered = [...departmentMap.keys()].filter((department) =>
      department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredDepartments(
      filtered.map((dept) => ({
        name: dept,
        users: departmentMap.get(dept) || [],
      }))
    );
  }, [userData, searchTerm]);

  return (
    <div className="p-4 max-w-12X1 mx-auto border mt-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard แผนกที่มีจดหมาย</h1>
      {/* รายการแผนก */}
      <div className="grid grid-cols-4 gap-2">
        {filteredDepartments.map(({ name, users }) => (
          <div key={name} className="card shadow p-2">
            <div className="card-body">
              <h2 className="card-title w-auto justify-between ">
                {name.substring(0, 4)}
                {name.substring(8)}
                <div className="flex justify-between">
                  {users.length} คน
                </div>
              </h2>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}
