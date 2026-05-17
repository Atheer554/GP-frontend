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
import client from '../api/client'
import { getHistoryApi } from '../api/analysisApi.js'

const BORDER = '#e2e8f0'

export default function HistoryPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])
  const [patients, setPatients] = useState([])
 

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getHistoryApi()
        const patientsResponse =
  await client.get('/patients/')

setPatients(patientsResponse.data)

        console.log(data)

        setItems(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load history')
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [])
  const groupedPatients = items.reduce(
  (acc, item) => {

   const patient = patients.find(
  (p) => p.id === item.patient_id
)

const patientName =
  patient?.name || 'Unknown Patient'

    // if patient does not exist yet
    if (!acc[patientName]) {
      acc[patientName] = []
    }

    // add analysis to this patient
    acc[patientName].push(item)

    return acc
  },
  {}
)

  return (
    <PageContainer>
      <div
        style={{
          minHeight: '100vh',

          background:
            'linear-gradient(to bottom, #f8fbff, #eef5ff)',

          padding: '40px',

          fontFamily:
            "'Inter', 'Segoe UI', sans-serif",
        }}
      >
        {/* HEADER */}
        <div
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
        >
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
            {Object.entries(groupedPatients).map(
  ([patientName, analyses]) => (
    <div
      key={patientName}
      style={{
        background:
          'linear-gradient(135deg, #ffffff, #f9fbff)',

        borderRadius: '30px',

        padding: '26px',

        border: `1px solid ${BORDER}`,

        boxShadow:
          '0 10px 25px rgba(15, 23, 42, 0.05)',
      }}
    >
      {/* PATIENT HEADER */}
      <div
        style={{
          display: 'flex',

          alignItems: 'center',

          gap: '12px',

          marginBottom: '22px',
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
            {patientName}
          </h2>

          <p
            style={{
              margin: '4px 0 0',

              color: '#64748b',

              fontSize: '14px',
            }}
          >
            {analyses.length} analyses
          </p>
        </div>
      </div>

      {/* ANALYSES */}
      <div
        style={{
          display: 'flex',

          flexDirection: 'column',

          gap: '16px',
        }}
      >
        {analyses.map((analysis) => (
          <div
            key={analysis.analysis_id}
            style={{
              padding: '18px',

              borderRadius: '20px',

              border: '1px solid #e2e8f0',

              background: '#ffffff',

              display: 'flex',

              justifyContent: 'space-between',

              alignItems: 'center',

              flexWrap: 'wrap',

              gap: '16px',
            }}
          >
            <div>
              {/* FILE */}
              <div
                style={{
                  display: 'flex',

                  alignItems: 'center',

                  gap: '10px',

                  marginBottom: '10px',

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
                  {analysis.filename}
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
                  {formatDate(
                    analysis.date
                  )}
                </span>
              </div>
            </div>

            {/* BUTTON */}
            <Link
              to={ROUTES.analysisDetail(
                analysis.analysis_id
              )}
              style={{
                display: 'flex',

                alignItems: 'center',

                gap: '10px',

                background:
                  'linear-gradient(135deg, #2563eb, #3b82f6)',

                color: 'white',

                textDecoration: 'none',

                padding: '12px 18px',

                borderRadius: '16px',

                fontWeight: '700',

                fontSize: '14px',
              }}
            >
              View Analysis

              <FaArrowRight />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
)}
          </div>
        )}
      </div>
    </PageContainer>
  )
}