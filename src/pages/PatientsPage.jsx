import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {createPatient} from '../api/patientApi'
import client from '../api/client'

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
      console.error(error)
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
    <div style={{ padding: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Patients List</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Add Patient
        </button>
      </div>

      {showForm && (
        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "400px",
          }}
        >
          <input
            type="text"
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button onClick={handleAddPatient}>
            Save Patient
          </button>
        </div>
      )}

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
            <tr key={patient.id}>
              <td style={tableCell}>{patient.id}</td>
              <td style={tableCell}>{patient.patient_id}</td>
              <td style={tableCell}>{patient.name}</td>
              <td style={tableCell}>{patient.age}</td>
              <td style={tableCell}>{patient.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const tableHeader = {
  borderBottom: "1px solid #ccc",
  padding: "12px",
  textAlign: "left",
}

const tableCell = {
  borderBottom: "1px solid #eee",
  padding: "12px",
}