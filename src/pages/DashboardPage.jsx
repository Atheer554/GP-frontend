import { useNavigate } from "react-router-dom"

export default function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        padding: "40px",
      }}
    >
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
    background: "white",
    borderRadius: "18px",
    marginBottom: "40px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  }}
>
  <div>
    <h1
      style={{
        margin: 0,
        color: "#1e293b",
        fontSize: "28px",
      }}
    >
      ELPIS AI
    </h1>

    <p
      style={{
        color: "#64748b",
        marginTop: "5px",
      }}
    >
      Breast Cancer Detection System
    </p>
  </div>

  <div
    style={{
      display: "flex",
      gap: "25px",
      alignItems: "center",
    }}
  >
    <span style={{ cursor: "pointer" }}>Home</span>

    <span
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/patients")}
    >
      Patients
    </span>

    <span style={{ cursor: "pointer" }}>
      History
    </span>

    <span style={{ cursor: "pointer", color: "#dc2626" }}>
      Logout
    </span>
  </div>
</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
        }}
      >
        <div
          onClick={() => navigate("/patients")}
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Patients List</h2>
          <p>View patients and their analysis history</p>
        </div>

        <div
          onClick={() => navigate("/predict")}
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Add Analysis</h2>
          <p>Create a new breast cancer analysis</p>
        </div>
      </div>
    </div>
  )
}