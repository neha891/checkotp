import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [nominations, setNominations] = useState([]);

  // Fetch students
  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));

    axios.get("http://localhost:5000/api/admin/nominations")
      .then((res) => setNominations(res.data))
      .catch((err) => console.error("Error fetching nominations:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Registered Students Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Registered Students</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Department</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.email}</td>
                <td className="border p-2">{student.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nomination Requests Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Nomination Requests</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Position</th>
              <th className="border p-2">CGPA</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {nominations.map((nomination, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{nomination.name}</td>
                <td className="border p-2">{nomination.position}</td>
                <td className="border p-2">{nomination.cgpa}</td>
                <td className="border p-2">{nomination.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
