import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  FaRegCalendarAlt,
  FaArrowRight,
  FaUserInjured,
  FaFileMedical,
} from 'react-icons/fa'

import PageContainer from '../components/layout/PageContainer.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'

import { formatDate } from '../utils/formatDate.js'
import { ROUTES } from '../utils/constants.js'

import { getHistoryApi } from '../api/analysisApi.js'
import {fetchPatients} from '../api/patientApi'

const BORDER = '#e2e8f0'

export default function HistoryPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState("")

  useEffect(() => {
  loadPatients()
}, [])

    async function loadHistory() {
      try {
        const data = await getHistoryApi()

        console.log(data)

        setItems(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load history')
      } finally {
        setLoading(false)
      }
    }


async function loadPatients() {
  try {
    const data = await fetchPatients()
    setPatients(data)
  } catch (err) {
    console.error(err)
    setError('Failed to load patients')
  }
}

async function loadHistory(patientId) {
  try {
    setLoading(true)

    const data = await getHistoryApi(patientId)

    setItems(data)
  } catch (err) {
    console.error(err)
    setError('Failed to load history')
  } finally {
    setLoading(false)
  }
}

  return (
    <PageContainer>
      <div
        style={{
          minHeight: '100vh',

          background:
            'linear-gradient(to bottom, #f8fbff, #eef5ff)',


      <div style={{ marginBottom: '20px' }}>
  <select
    value={selectedPatient}
    onChange={(e) => {
      setSelectedPatient(e.target.value)
      loadHistory(e.target.value)
    }}
    style={{
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #ccc',
    }}
  >
    <option value="">Choose patient</option>

    {patients.map((patient) => (
      <option key={patient.id} value={patient.id}>
        {patient.name} ({patient.patient_id})
      </option>
    ))}
  </select>
</div>

      {loading ? (
        <LoadingSpinner />
      ) : items.length === 0 ? (
        <p

          padding: '40px',

          fontFamily:
            "'Inter', 'Segoe UI', sans-serif",
        }}
      >
        {/* HEADER */}
        <div
>
          style={{
            background:
              'linear-gradient(135deg, #ffffff, #f8fbff)',

            borderRadius: '32px',

            padding: '38px',

            marginBottom: '34px',

            border: `1px solid ${BORDER}`,

            boxShadow:
              '0 12px 30px rgba(15, 23, 42, 0.06)',
          }}
        
          <h1
            style={{
              margin: 0,

              fontSize: '42px',

              fontWeight: '800',

              letterSpacing: '-1px',

              color: '#0f172a',
            }}
          >
            Analysis History
          </h1>

          <p
            style={{
              marginTop: '12px',

              marginBottom: 0,

              color: '#64748b',

              fontSize: '17px',
            }}
          >
            Review previous AI breast cancer analyses
          </p>
        </div>

        <ErrorMessage message={error} />

        {loading ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <div
            style={{
              background: '#ffffff',

              borderRadius: '28px',

              padding: '70px 30px',

              textAlign: 'center',

              border: `1px solid ${BORDER}`,

              boxShadow:
                '0 10px 24px rgba(15, 23, 42, 0.05)',
            }}
          >
            <h2
              style={{
                margin: 0,

                color: '#0f172a',
              }}
            >
              No analyses yet
            </h2>

            <p
              style={{
                marginTop: '12px',

                color: '#64748b',
              }}
            >
              Patient analyses will appear here
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',

              flexDirection: 'column',

              gap: '22px',
            }}
          >
            {items.map((item) => (
              <div
                key={item.analysis_id}
                style={{
                  background:
                    'linear-gradient(135deg, #ffffff, #f9fbff)',

                  borderRadius: '30px',

                  padding: '26px',

                  border: `1px solid ${BORDER}`,

                  boxShadow:
                    '0 10px 25px rgba(15, 23, 42, 0.05)',

                  transition: '0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(-4px)'

                  e.currentTarget.style.boxShadow =
                    '0 18px 35px rgba(15, 23, 42, 0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(0px)'

                  e.currentTarget.style.boxShadow =
                    '0 10px 25px rgba(15, 23, 42, 0.05)'
                }}
              >
                <div
                  style={{
                    display: 'flex',

                    justifyContent: 'space-between',

                    alignItems: 'center',

                    gap: '20px',

                    flexWrap: 'wrap',
                  }}
                >
                  {/* LEFT SIDE */}
                  <div>
                    {/* PATIENT NAME */}
                    <div
                      style={{
                        display: 'flex',

                        alignItems: 'center',

                        gap: '12px',

                        marginBottom: '14px',
                      }}
                    >
                      <div
                        style={{
                          width: '46px',

                          height: '46px',

                          borderRadius: '14px',

                          background:
                            'linear-gradient(135deg, #dbeafe, #eff6ff)',

                          display: 'flex',

                          alignItems: 'center',

                          justifyContent: 'center',

                          color: '#2563eb',

                          fontSize: '18px',
                        }}
                      >
                        <FaUserInjured />
                      </div>

                      <div>
                        <h2
                          style={{
                            margin: 0,

                            fontSize: '24px',

                            fontWeight: '700',

                            color: '#0f172a',
                          }}
                        >
                          {item.patient?.name ||
                            item.patient_name ||
                            item.patient ||
                            'Patient'}
                        </h2>

                        <p
                          style={{
                            margin: '4px 0 0',

                            color: '#64748b',

                            fontSize: '14px',
                          }}
                        >
                          AI Analysis Record
                        </p>
                      </div>
                    </div>

                    {/* FILE */}
                    <div
                      style={{
                        display: 'flex',

                        alignItems: 'center',

                        gap: '10px',

                        marginBottom: '12px',

                        color: '#475569',

                        fontSize: '14px',
                      }}
                    >
                      <FaFileMedical
                        style={{
                          color: '#2563eb',
                        }}
                      />

                      <span>
                        {item.filename}
                      </span>
                    </div>

                    {/* DATE */}
                    <div
                      style={{
                        display: 'flex',

                        alignItems: 'center',

                        gap: '10px',

                        color: '#64748b',

                        fontSize: '14px',
                      }}
                    >
                      <FaRegCalendarAlt />

                      <span>
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <Link
                    to={ROUTES.analysisDetail(
                      item.analysis_id
                    )}
                    style={{
                      display: 'flex',

                      alignItems: 'center',

                      gap: '10px',

                      background:
                        'linear-gradient(135deg, #2563eb, #3b82f6)',

                      color: 'white',

                      textDecoration: 'none',

                      padding: '14px 22px',

                      borderRadius: '18px',

                      fontWeight: '700',

                      fontSize: '14px',

                      boxShadow:
                        '0 8px 20px rgba(37, 99, 235, 0.25)',
                    }}
                  >
                    View Analysis

                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  )
}