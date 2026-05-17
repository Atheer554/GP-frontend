import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import PageContainer from '../components/layout/PageContainer.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'

import { ROUTES } from '../utils/constants.js'
import { loginApi } from '../api/authApi.js'

import logo from '../assets/logo.png'

const BORDER = '#dbe3ee'
const PRIMARY = '#2563eb'
const TITLE_COLOR = '#0f172a'

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading] = useState(false)
  const [error] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await loginApi({
        email,
        password,
      })

      console.log(result)

      localStorage.setItem('token', result.access_token)

      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      alert('Login failed')
    }
  }

  return (
   <PageContainer showNavbar={false}>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',

            borderRadius: '28px',

            border: '1px solid #e2e8f0',

            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',

            width: '100%',
            maxWidth: '460px',

            padding: '45px',
          }}
        >
          {/* LOGO */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '18px',
            }}
          >
            <img
              src={logo}
              alt="ELPIS AI Logo"
              style={{
                width: '90px',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* BRAND */}
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '8px',
              color: PRIMARY,
              fontWeight: '700',
              fontSize: '18px',
              letterSpacing: '1px',
            }}
          >
            ELPIS AI
          </h2>

          {/* TITLE */}
          <h1
            style={{
              margin: '0 0 10px',
              fontSize: '34px',
              fontWeight: 700,
              color: TITLE_COLOR,
              textAlign: 'center',
            }}
          >
            Welcome Back
          </h1>

          {/* SUBTITLE */}
          <p
            style={{
              margin: '0 0 30px',
              color: '#475569',
              textAlign: 'center',
              lineHeight: '1.6',
            }}
          >
            Sign in to access the breast cancer
            detection dashboard.
          </p>

          <ErrorMessage message={error} />

          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: error ? '12px' : 0,
            }}
          >
            {/* EMAIL */}
            <div style={{ marginBottom: '16px' }}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',

                  border: `1px solid ${BORDER}`,

                  borderRadius: '14px',

                  padding: '14px 16px',

                  boxSizing: 'border-box',

                  fontSize: '15px',

                  backgroundColor: '#f8fafc',

                  transition: '0.2s ease',

                  outline: 'none',
                }}
              />
            </div>

            {/* PASSWORD */}
            <div style={{ marginBottom: '22px' }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',

                  border: `1px solid ${BORDER}`,

                  borderRadius: '14px',

                  padding: '14px 16px',

                  boxSizing: 'border-box',

                  fontSize: '15px',

                  backgroundColor: '#f8fafc',

                  transition: '0.2s ease',

                  outline: 'none',
                }}
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              style={{
                width: '100%',

                backgroundColor: PRIMARY,

                color: '#ffffff',

                border: 'none',

                borderRadius: '14px',

                padding: '14px 16px',

                fontSize: '15px',

                fontWeight: 600,

                cursor: 'pointer',

                boxShadow:
                  '0 4px 14px rgba(37, 99, 235, 0.25)',

                transition: '0.2s ease',
              }}
            >
              Sign In
            </button>
          </form>

          {loading ? <LoadingSpinner /> : null}

          {/* REGISTER */}
          <p
            style={{
              margin: '24px 0 0',
              textAlign: 'center',
              color: '#475569',
            }}
          >
            <Link
              to={ROUTES.register}
              style={{
                color: PRIMARY,
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Don&apos;t have an account? Register
            </Link>
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
