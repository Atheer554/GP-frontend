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
          marginBottom: "40px",
        }}
      >
        <div>
  <h1 style={{ margin: 0 }}>ELPIS AI</h1>

  <p style={{ color: "#666", marginTop: "5px" }}>
    Breast Cancer Detection System
  </p>
</div>

        <button
          onClick={() => navigate("/profile")}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Profile
        </button>
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