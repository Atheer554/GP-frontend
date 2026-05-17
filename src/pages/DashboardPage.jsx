import { useNavigate } from "react-router-dom"
import { FaUserInjured } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import medicalImage from "../assets/medical-ai.svg";

import Navbar from "../components/layout/Navbar.jsx";

export default function DashboardPage() {
  const navigate = useNavigate()

  return (
    <>
     <Navbar />
    
    
    <div
      style={{
        minHeight: "140px",
        backgroundColor: "#eef2f7",
        padding: "40px",
        fontFamily: "Inter, sans-serif",
      }}
    >
     
<div
  style={{
    background: "linear-gradient(to right, #ffffff, #f8fbff)",
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
        color:  "#0f172a" ,
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

    {/*<button
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
    </button>*/}
  </div>

  <img
    src={medicalImage}
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
  e.currentTarget.style.boxShadow =
    "0 12px 28px rgba(15, 23, 42, 0.12)";
}}

  onMouseLeave={(e) => {
  e.currentTarget.style.transform = "translateY(0px)";
  e.currentTarget.style.boxShadow =
    "0 8px 24px rgba(15, 23, 42, 0.06)";
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
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
    border: "1px solid #e2e8f0",
  }}
>
  <FaUserInjured
  size={38}
  color="#2563eb"
  style={{ marginBottom: "20px" }}
/>
  <h2 style={{ color: "#0f172a" }}>
  Patients List
</h2>

  <p>View your patients    </p>
</div>      
{/** this patient list card  */}

       <div
  onClick={() => navigate("/predict")}

  onMouseEnter={(e) => {
  e.currentTarget.style.transform = "translateY(-5px)";
  e.currentTarget.style.boxShadow =
    "0 12px 28px rgba(15, 23, 42, 0.12)";
}}

 onMouseLeave={(e) => {
  e.currentTarget.style.transform = "translateY(0px)";
  e.currentTarget.style.boxShadow =
    "0 8px 24px rgba(15, 23, 42, 0.06)";
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
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
    border: "1px solid #e2e8f0",
  }}
>
  <MdAnalytics
  size={38}
  color="#2563eb"
  style={{ marginBottom: "20px" }}
/>
 <h2 style={{ color: "#0f172a" }}>
 Add Analysis
</h2>

  <p>Create a new breast cancer analysis</p>
</div>
</div>
  </>
)
}