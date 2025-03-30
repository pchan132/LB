import { useState, useEffect} from "react";

export default function Department({ userData, onOpen }) {
  const arrayUserData =
    userData && Array.isArray(userData) ? userData : Object.values(userData);

  const departments = [
    ...new Set(arrayUserData.map((user) => user.department_id)),
  ];
  console.log(departments);

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

    // Filter departments based on searchTerm
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
    <div className="p-4 max-w-7xl mx-auto border mt-4 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        แผนกที่มีจดหมาย
      </h1>

      {/* Search bar */}
      <div className="form-control mb-6 items-center flex justify-center">
        <input
          type="text"
          placeholder="ค้นหาแผนก..."
          className="input input-bordered border-blue-400 focus:border-blue-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display message if no departments found */}
      {filteredDepartments.length === 0 ? (
        <div className="text-center text-gray-400">
          <p>ไม่มีแผนก</p>
        </div>
      ) : (
        // Display department cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDepartments.map(({ name, users }) => (
            <div
              key={name}
              className="card bg-blue-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                onOpen(users);
              }}
            >
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold text-blue-800">
                  {name.substring(0, 4)}
                  {name.substring(8)}
                </h2>
                <p className="text-sm text-blue-600">({users.length} ฉบับ)</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
