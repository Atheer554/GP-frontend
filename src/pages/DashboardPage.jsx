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
    background: "white",
    borderRadius: "24px",
    padding: "40px",
    marginBottom: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  }}
>
  <div>
    <h1
      style={{
        fontSize: "40px",
        marginBottom: "15px",
        color: "#1e293b",
      }}
    >
      Welcome back, Doctor
    </h1>

    <p
      style={{
        color: "#64748b",
        maxWidth: "500px",
        lineHeight: "1.6",
      }}
    >
      Monitor patient records and manage AI-powered
      breast cancer analyses efficiently and securely.
    </p>

    <button
      onClick={() => navigate("/predict")}
      style={{
        marginTop: "25px",
        background: "#2563eb",
        color: "white",
        border: "none",
        padding: "14px 22px",
        borderRadius: "12px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Start Analysis
    </button>
  </div>

  <img
    src="/medical-ai.svg"
    alt="Medical AI"
    style={{
      width: "280px",
    }}
  />
</div>
{/*check the src for image i need to ad to react public folder  */}

<div
  onClick={() => navigate("/patients")}
  
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0px)";
  }}

  style={{
    background: "white",
    padding: "35px",
    minHeight: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "0.2s ease",
    borderRadius: "20px",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  }}
>
  <h2>Patients List</h2>

  <p>View your patients    </p>
</div>      
{/** this patient list card  */}

       <div
  onClick={() => navigate("/predict")}

  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0px)";
  }}

  style={{
    background: "white",
    padding: "35px",
    minHeight: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "0.2s ease",
    borderRadius: "20px",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  }}
>
  <h2>Add Analysis</h2>

  <p>Create a new breast cancer analysis</p>
</div>
</div>)}