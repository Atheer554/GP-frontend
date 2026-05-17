import logo from "../../assets/logo.png";
import {
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom'

import {
  FaHome,
  FaHistory,
  FaUserInjured,
  FaSignOutAlt,
  FaBrain,
} from 'react-icons/fa'

import { useAuth } from '../../auth/AuthContext.jsx'

import { ROUTES } from '../../utils/constants.js'


export default function Navbar() {
  const { token, logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.login)
  }

  function navStyle({ isActive }) {
    return {
      display: 'flex',

      flexDirection: 'column',

      alignItems: 'center',

      gap: '6px',

      textDecoration: 'none',

      color: isActive
        ? '#2563eb'
        : '#475569',

      fontSize: '13px',

      fontWeight: isActive
        ? '700'
        : '600',

      transition: '0.2s ease',
    }
  }

  return (
    <header
      style={{
        display: 'flex',

        justifyContent: 'space-between',

        alignItems: 'center',

        padding: '18px 34px',

        background:
          'rgba(255,255,255,0.85)',

        backdropFilter: 'blur(12px)',

        borderBottom:
          '1px solid #e2e8f0',

        position: 'sticky',

        top: 0,

        zIndex: 100,

        boxShadow:
          '0 4px 20px rgba(15, 23, 42, 0.04)',
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          display: 'flex',

          alignItems: 'center',

          gap: '14px',

          textDecoration: 'none',
        }}
      >
        <img
          src={logo}
          alt="ELPIS AI"
          style={{
            width: '48px',
            height: '48px',
            objectFit: 'contain',
          }}
        />

        <div>
          <h2
            style={{
              margin: 0,

              fontSize: '24px',

              fontWeight: '800',

              letterSpacing: '-1px',

              color: '#0f172a',

              fontFamily:
                "'Inter', 'Segoe UI', sans-serif",
            }}
          >
            ELPIS AI
          </h2>

          <p
            style={{
              margin: 0,

              fontSize: '12px',

              color: '#64748b',
            }}
          >
            Medical Intelligence
          </p>
        </div>
      </Link>

      {/* NAV ITEMS */}
      {token ? (
        <nav
          style={{
            display: 'flex',

            alignItems: 'center',

            gap: '34px',
          }}
        >
          <NavLink
            to={ROUTES.dashboard}
            style={navStyle}
          >
            <FaHome size={18} />
            Home
          </NavLink>

          <NavLink
            to={ROUTES.predict}
            style={navStyle}
          >
            <FaBrain size={18} />
            Analysis
          </NavLink>

          <NavLink
            to={ROUTES.history}
            style={navStyle}
          >
            <FaHistory size={18} />
            History
          </NavLink>

          <NavLink
            to={ROUTES.patients}
            style={navStyle}
          >
            <FaUserInjured size={18} />
            Patients
          </NavLink>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',

              flexDirection: 'column',

              alignItems: 'center',

              gap: '6px',

              background: 'transparent',

              border: 'none',

              cursor: 'pointer',

              color: '#dc2626',

              fontWeight: '700',

              fontSize: '13px',
            }}
          >
            <FaSignOutAlt size={18} />
            Logout
          </button>
        </nav>
      ) : null}
    </header>
  )
}