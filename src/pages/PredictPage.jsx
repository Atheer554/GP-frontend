import { useRef, useState, useEffect } from 'react'
import PageContainer from '../components/layout/PageContainer.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import {predictApi} from '../api/analysisApi.js'

import {fetchPatients} from '../api/patientApi'
import client from '../api/client'


const BORDER = '#d1e3f8'
const PRIMARY = '#2a7fd4'
const TITLE_COLOR = '#1a1a2e'
const CARD_SHADOW = '0 2px 12px rgba(26, 26, 46, 0.08)'

const ACCEPT_ATTR = 'image/jpeg,image/png,.jpg,.jpeg,.png'

function isAllowedImage(file) {
  if (!file) return false
  const okTypes = ['image/jpeg', 'image/png']
  if (okTypes.includes(file.type)) return true
  return /\.(jpe?g|png)$/i.test(file.name)
}

export default function PredictPage() {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState("")
  
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

  const pickFile = (next) => {
    if (!next || !isAllowedImage(next)) {
      setError('Please choose a JPG or PNG image.')
      return
    }
    setError('')
    setFile(next)
  }

  const handleInputChange = (e) => {
    const next = e.target.files?.[0]
    pickFile(next)
    e.target.value = ''
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const next = e.dataTransfer.files?.[0]
    pickFile(next)
  }

  const handleBrowseClick = () => {
    inputRef.current?.click()
  }

 const handleAnalyze = async () => {
  if (!file) return

  if (!selectedPatient) {
    setError('Please select a patient')
    return
  }

  try {
    setLoading(true)
    setError('')

    const response = await predictApi(
      file,
      selectedPatient
    )

    console.log(response)

    setResult(response)

  } catch (err) {
    console.error(err)

    console.log(
      "BACKEND ERROR:",
      err.response?.data
    )

    setError(
  JSON.stringify(
    err.response?.data
  )
)

  } finally {
    setLoading(false)
  }
}

  const cardBase = {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: CARD_SHADOW,
  }

  return (
    <PageContainer>
      <header style={{ marginBottom: '35px' }}>
        <h1
          style={{
            margin: '0 0 8px',
            fontSize: '40px',
            fontWeight: 700,
            color: TITLE_COLOR,
          }}
        >
          Breast Cancer Detection
        </h1>
        <p
  style={{
    margin: 0,

    fontSize: '17px',

    color: '#475569',

    maxWidth: '700px',

    lineHeight: '1.7',
  }}
>
  Upload ultrasound scans and let the AI model
  assist in breast cancer detection and analysis.
</p>
      </header>
{/**/}



      <ErrorMessage message={error} />
      <ErrorMessage message={error} />

<div
  style={{
    background:
      "linear-gradient(to right, #ffffff, #f8fbff)",

    borderRadius: "32px",

    padding: "45px",

    border: "1px solid #e2e8f0",

    boxShadow:
      "0 10px 30px rgba(15, 23, 42, 0.06)",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    gap: "50px",

    marginTop: "30px",
  }}
>
  {/* LEFT SIDE */}
  <div
    style={{
      flex: 1,
    }}
  >
    {/* TITLE */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        marginBottom: "18px",
      }}
    >
      <div
        style={{
          width: "55px",
          height: "55px",
          borderRadius: "16px",
          background:
            "linear-gradient(to bottom right, #2563eb, #60a5fa)",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          color: "white",

          fontSize: "24px",

          fontWeight: "700",
        }}
      >
        AI
      </div>

      <div>
        <h2
          style={{
            margin: 0,
            color: "#0f172a",
            fontSize: "30px",
          }}
        >
          AI Analysis Workspace
        </h2>

        <p
          style={{
            marginTop: "6px",
            color: "#64748b",
          }}
        >
          Upload ultrasound scans for
          intelligent breast cancer detection.
        </p>
      </div>
    </div>

    {/* SELECT */}
    <div
      style={{
        marginBottom: "24px",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "10px",
          fontWeight: "600",
          color: "#0f172a",
        }}
      >
        Select Patient
      </label>

      <select
        value={selectedPatient}
        onChange={(e) =>
          setSelectedPatient(e.target.value)
        }
        style={{
          width: "100%",

          padding: "15px 16px",

          borderRadius: "16px",

          border: "1px solid #dbe3ee",

          backgroundColor: "#ffffff",

          fontSize: "15px",

          outline: "none",
        }}
      >
        <option value="">
          Choose patient
        </option>

        {patients.map((patient) => (
          <option
            key={patient.id}
            value={patient.id}
          >
            {patient.name} (
            {patient.patient_id})
          </option>
        ))}
      </select>
    </div>

    {/* UPLOAD */}
    <div
      role="button"
      tabIndex={0}
      onClick={handleBrowseClick}
      onKeyDown={(e) => {
        if (
          e.key === "Enter" ||
          e.key === " "
        ) {
          e.preventDefault()
          handleBrowseClick()
        }
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border:
          "2px dashed #93c5fd",

        background:
          "linear-gradient(to bottom, #f8fbff, #ffffff)",

        borderRadius: "24px",

        padding: "55px 30px",

        textAlign: "center",

        cursor: "pointer",

        transition: "0.2s ease",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        style={{ display: "none" }}
        onChange={handleInputChange}
      />

      <div
        style={{
          fontSize: "50px",
          marginBottom: "12px",
        }}
      >
        🩺
      </div>

      <p
        style={{
          margin: "0 0 10px",

          fontSize: "18px",

          color: PRIMARY,

          fontWeight: 700,
        }}
      >
        Click to upload or drag and drop
      </p>

      <p
        style={{
          margin: 0,

          fontSize: "14px",

          color: "#64748b",
        }}
      >
        JPG or PNG only
      </p>

      {file ? (
        <p
          style={{
            marginTop: "18px",

            color: "#0f172a",

            fontWeight: 600,
          }}
        >
          Selected: {file.name}
        </p>
      ) : null}
    </div>

    {/* BUTTON */}
    <button
      type="button"
      disabled={!file}
      onClick={handleAnalyze}
      style={{
        marginTop: "24px",

        padding: "16px 22px",

        fontSize: "15px",

        fontWeight: 600,

        color: "#ffffff",

        backgroundColor: !file
          ? "#93c5ec"
          : PRIMARY,

        border: "none",

        borderRadius: "16px",

        cursor: !file
          ? "not-allowed"
          : "pointer",

        width: "100%",

        boxShadow:
          "0 4px 14px rgba(37, 99, 235, 0.25)",

        transition: "0.2s ease",
      }}
    >
      Analyze Image
    </button>
  </div>

  {/* RIGHT SIDE IMAGE */}
  <div
    style={{
      flex: 1,

      display: "flex",

      justifyContent: "center",
    }}
  >
    <img
      src="/medical-ai.svg"
      alt="Medical AI"
      style={{
        width: "100%",
        maxWidth: "420px",
      }}
    />
  </div>
</div>
{/**/}
      {loading ? <LoadingSpinner /> : null}

     {result ? (
  <div
    style={{
      marginTop: "35px",

      background:
        "linear-gradient(to right, #ffffff, #f8fbff)",

      borderRadius: "24px",

      padding: "30px",

      border: "1px solid #dbeafe",

      boxShadow:
        "0 8px 24px rgba(15, 23, 42, 0.05)",

      maxWidth: "500px",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",

          borderRadius: "14px",

          background:
            result?.prediction === "malignant"
              ? "linear-gradient(to bottom right, #dc2626, #ef4444)"
              : "linear-gradient(to bottom right, #16a34a, #22c55e)",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          color: "white",

          fontSize: "22px",
        }}
      >
        {result?.prediction === "malignant"
          ? "⚠"
          : "✓"}
      </div>

      <div>
        <h2
          style={{
            margin: 0,
            color: "#0f172a",
          }}
        >
          Analysis Result
        </h2>

        <p
          style={{
            marginTop: "5px",
            color: "#64748b",
          }}
        >
          AI detection completed successfully
        </p>
      </div>
    </div>

    <div
      style={{
        display: "flex",
        gap: "14px",
        marginBottom: "18px",
      }}
    >
      <div
        style={{
          padding: "10px 16px",

          borderRadius: "999px",

          backgroundColor:
            result?.prediction === "malignant"
              ? "#fee2e2"
              : "#dcfce7",

          color:
            result?.prediction === "malignant"
              ? "#b91c1c"
              : "#166534",

          fontWeight: "700",

          fontSize: "14px",
        }}
      >
        {result?.prediction === "malignant"
          ? "Tumor Detected"
          : "No Tumor Detected"}
      </div>
    </div>

    <div
      style={{
        background: "#f8fafc",

        borderRadius: "18px",

        padding: "18px",
      }}
    >
      <p
        style={{
          margin: "0 0 10px",
          color: "#64748b",
          fontSize: "14px",
        }}
      >
        Tumor Type
      </p>

      <h3
        style={{
          margin: 0,
          color: "#0f172a",
          textTransform: "capitalize",
        }}
      >
        {result?.prediction}
      </h3>
    </div>
  </div>
) : null}
   
    </PageContainer>
     
   
  )}

