import { useState } from "react";
import axios from "axios";

const SelfNomination = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [document, setDocument] = useState(null);
  const [conductCertificate, setConductCertificate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // ✅ State to store errors
  const [successMessage, setSuccessMessage] = useState(""); // ✅ State to store success messages

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("department", department);
    formData.append("position", position);
    formData.append("cgpa", cgpa);
    formData.append("document", document);
    formData.append("conductCertificate", conductCertificate);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/self-nomination",
        formData
      );
  
      console.log("✅ Nomination submitted successfully!", response.data);
      alert("✅ Nomination submitted successfully!");
    } catch (error) {
      console.error("❌ Error submitting nomination:", error);
      alert(`❌ Error: ${error.response?.data?.message || "Something went wrong."}`);
    }
  };
  

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Self-Nomination Form</h2>

      {/* Display success or error messages */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="CGPA" value={cgpa} onChange={(e) => setCgpa(e.target.value)} className="w-full p-2 border rounded" required />

        {/* Upload ID proof */}
        <label className="block font-semibold">Upload ID Proof</label>
        <input type="file" onChange={(e) => handleFileChange(e, setDocument)} className="w-full p-2 border rounded" required />

        {/* Upload Conduct Certificate */}
        <label className="block font-semibold">Upload Conduct Certificate</label>
        <input type="file" onChange={(e) => handleFileChange(e, setConductCertificate)} className="w-full p-2 border rounded" required />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit Nomination</button>
      </form>
    </div>
  );
};

export default SelfNomination;
