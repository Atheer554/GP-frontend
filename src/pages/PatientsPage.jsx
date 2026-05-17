import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {createPatient} from '../api/patientApi'
import client from '../api/client'
import PageContainer from '../components/layout/PageContainer.jsx'

export default function PatientsPage() {
  const [patients, setPatients] = useState([])

  const [showForm, setShowForm] = useState(false)

  const [name, setName] = useState("")
  const [patientId, setPatientId] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")

  const navigate = useNavigate()

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const response = await client.get("/patients/")
      setPatients(response.data)
    } catch (error) {
      console.error(error.response?.data)
  alert(JSON.stringify(error.response?.data))
    }
  }

  const handleAddPatient = async () => {
  try {
    const data = await createPatient({
      name,
      patient_id: patientId,
      age: Number(age),
      gender,
    })

    console.log(data)

    alert("Patient added successfully")

    fetchPatients()

    setShowForm(false)

    setName("")
    setPatientId("")
    setAge("")
    setGender("male")

  } catch (error) {
    console.error(error)
    alert("Failed to add patient")
  }
}

 return (
  <PageContainer>
  <div
  style={{
    minHeight: "100vh",
    padding: "20px 40px",
    fontFamily: "Inter, sans-serif",
  }}
>
    {/* PAGE HEADER */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "38px",
            color: "#0f172a",
          }}
        >
          Patients List
        </h1>

        <p
          style={{
            color: "#475569",
            marginTop: "8px",
            fontSize: "16px",
          }}
        >
          Manage and review patient records.
        </p>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          backgroundColor: "#2563eb",
          color: "white",

          border: "none",

          padding: "14px 20px",

          borderRadius: "14px",

          fontWeight: "600",

          cursor: "pointer",

          boxShadow:
            "0 4px 14px rgba(37, 99, 235, 0.25)",

          transition: "0.2s ease",
        }}
      >
        {showForm ? "Close Form" : "+ Add Patient"}
      </button>
    </div>

    {/* FORM CARD */}
    {showForm && (
      <div
        style={{
          background: "white",

          borderRadius: "24px",

          padding: "30px",

          marginBottom: "30px",

          border: "1px solid #e2e8f0",

          boxShadow:
            "0 8px 24px rgba(15, 23, 42, 0.06)",

          maxWidth: "500px",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "20px",
            color: "#0f172a",
          }}
        >
          Add New Patient
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <input
            type="text"
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={inputStyle}
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={inputStyle}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button
            onClick={handleAddPatient}
            style={{
              backgroundColor: "#2563eb",

              color: "white",

              border: "none",

              padding: "14px",

              borderRadius: "14px",

              fontWeight: "600",

              cursor: "pointer",

              marginTop: "10px",

              boxShadow:
                "0 4px 14px rgba(37, 99, 235, 0.25)",
            }}
          >
            Save Patient
          </button>
        </div>
      </div>
    )}

    {/* TABLE CARD */}
    <div
      style={{
        background: "white",

        borderRadius: "24px",

        padding: "30px",

        border: "1px solid #e2e8f0",

        boxShadow:
          "0 8px 24px rgba(15, 23, 42, 0.06)",

        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={tableHeader}>ID</th>
            <th style={tableHeader}>Patient ID</th>
            <th style={tableHeader}>Name</th>
            <th style={tableHeader}>Age</th>
            <th style={tableHeader}>Gender</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.id}
              style={{
                transition: "0.2s ease",
              }}
            >
              <td style={tableCell}>{patient.id}</td>

              <td style={tableCell}>
                {patient.patient_id}
              </td>

              <td style={tableCell}>
                {patient.name}
              </td>

              <td style={tableCell}>
                {patient.age}
              </td>

              <td style={tableCell}>
                <span
                  style={{
                    padding: "6px 12px",

                    borderRadius: "999px",

                    backgroundColor:
                      patient.gender === "male"
                        ? "#dbeafe"
                        : "#fce7f3",

                    color:
                      patient.gender === "male"
                        ? "#1d4ed8"
                        : "#be185d",

                    fontSize: "14px",

                    fontWeight: "600",
                  }}
                >
                  {patient.gender}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  </PageContainer>
)


}
const tableHeader = {
  textAlign: "left",

  padding: "18px",

  color: "#475569",

  fontWeight: "600",

  borderBottom: "1px solid #e2e8f0",

  fontSize: "15px",
}

const tableCell = {
  padding: "20px 18px",

  borderBottom: "1px solid #f1f5f9",

  color: "#0f172a",
}

const inputStyle = {
  width: "100%",

  border: "1px solid #dbe3ee",

  borderRadius: "14px",

  padding: "14px 16px",

  boxSizing: "border-box",

  fontSize: "15px",

  backgroundColor: "#f8fafc",

  outline: "none",
}
