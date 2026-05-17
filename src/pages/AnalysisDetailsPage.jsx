import { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import {
  FaArrowLeft,
  FaRegCalendarAlt,
  FaFileMedical,
  FaBrain,
} from 'react-icons/fa'

import PageContainer from '../components/layout/PageContainer.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'

import { formatDate } from '../utils/formatDate.js'
import { ROUTES } from '../utils/constants.js'

import { getAnalysisDetailsApi } from '../api/analysisApi.js'

const BORDER = '#e2e8f0'

export default function AnalysisDetailsPage() {
  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  const [analysis, setAnalysis] =
    useState(null)

  const { id } = useParams()

  useEffect(() => {
    async function loadAnalysis() {
      try {
        const data =
          await getAnalysisDetailsApi(id)

        console.log(data)

        setAnalysis(data)
      } catch (err) {
        console.error(err)

        setError(
          'Failed to load analysis'
        )
      } finally {
        setLoading(false)
      }
    }

    loadAnalysis()
  }, [id])

  if (!analysis && !loading) {
    return (
      <PageContainer>
        <div
          style={{
            padding: '40px',

            fontFamily:
              "'Inter', 'Segoe UI', sans-serif",
          }}
        >
          <h2>No analysis selected</h2>
        </div>
      </PageContainer>
    )
  }

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
        {/* BACK BUTTON */}
        <Link
          to={ROUTES.history}
          style={{
            display: 'inline-flex',

            alignItems: 'center',

            gap: '10px',

            marginBottom: '24px',

            color: '#2563eb',

            textDecoration: 'none',

            fontWeight: '700',

            background: '#eff6ff',

            padding: '12px 18px',

            borderRadius: '16px',
          }}
        >
          <FaArrowLeft />

          Back to History
        </Link>

        {/* HEADER */}
        <div
          style={{
            background:
              'linear-gradient(135deg, #ffffff, #f8fbff)',

            borderRadius: '32px',

            padding: '36px',

            marginBottom: '28px',

            border: `1px solid ${BORDER}`,

            boxShadow:
              '0 12px 30px rgba(15, 23, 42, 0.06)',
          }}
        >
          <div
            style={{
              display: 'flex',

              alignItems: 'center',

              gap: '18px',
            }}
          >
            <div
              style={{
                width: '64px',

                height: '64px',

                borderRadius: '20px',

                background:
                  'linear-gradient(135deg, #dbeafe, #eff6ff)',

                display: 'flex',

                alignItems: 'center',

                justifyContent: 'center',

                color: '#2563eb',

                fontSize: '24px',
              }}
            >
              <FaBrain />
            </div>

            <div>
              <h1
                style={{
                  margin: 0,

                  fontSize: '40px',

                  fontWeight: '800',

                  letterSpacing: '-1px',

                  color: '#0f172a',
                }}
              >
                Analysis Details
              </h1>

              <p
                style={{
                  marginTop: '10px',

                  marginBottom: 0,

                  color: '#64748b',

                  fontSize: '16px',
                }}
              >
                AI breast cancer analysis
                overview
              </p>
            </div>
          </div>
        </div>

        <ErrorMessage message={error} />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div
            style={{
              background:
                'linear-gradient(135deg, #ffffff, #f9fbff)',

              borderRadius: '32px',

              padding: '34px',

              border: `1px solid ${BORDER}`,

              boxShadow:
                '0 12px 30px rgba(15, 23, 42, 0.06)',
            }}
          >
            {/* DATE */}
            <div
              style={{
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',

                  alignItems: 'center',

                  gap: '10px',

                  marginBottom: '10px',

                  color: '#2563eb',

                  fontWeight: '700',
                }}
              >
                <FaRegCalendarAlt />

                Date
              </div>

              <p
                style={{
                  margin: 0,

                  color: '#0f172a',

                  fontSize: '17px',
                }}
              >
                {formatDate(
                  analysis.date
                )}
              </p>
            </div>

            {/* FILE */}
            <div
              style={{
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',

                  alignItems: 'center',

                  gap: '10px',

                  marginBottom: '10px',

                  color: '#2563eb',

                  fontWeight: '700',
                }}
              >
                <FaFileMedical />

                Analysis File
              </div>

              <p
                style={{
                  margin: 0,

                  color: '#0f172a',

                  fontSize: '17px',
                }}
              >
                {analysis.image}
              </p>
            </div>

            {/* RESULT */}
            <div
              style={{
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',

                  alignItems: 'center',

                  gap: '10px',

                  marginBottom: '14px',

                  color: '#2563eb',

                  fontWeight: '700',
                }}
              >
                <FaBrain />

                AI Result
              </div>

              <div
                style={{
                  display: 'inline-flex',

                  alignItems: 'center',

                  padding: '12px 20px',

                  borderRadius: '999px',

                  background:
                    analysis.has_tumor
                      ? '#fee2e2'
                      : '#dcfce7',

                  color:
                    analysis.has_tumor
                      ? '#b91c1c'
                      : '#15803d',

                  fontWeight: '700',

                  fontSize: '15px',
                }}
              >
                {analysis.has_tumor
                  ? 'Tumor Detected'
                  : 'No Tumor Detected'}
              </div>
            </div>

            {/* TUMOR TYPE */}
            <div>
              <div
                style={{
                  display: 'flex',

                  alignItems: 'center',

                  gap: '10px',

                  marginBottom: '10px',

                  color: '#2563eb',

                  fontWeight: '700',
                }}
              >
                <FaBrain />

                Tumor Type
              </div>

              <p
                style={{
                  margin: 0,

                  color: '#0f172a',

                  fontSize: '18px',

                  fontWeight: '600',
                }}
              >
                {analysis.tumor_type ||
                  'Unknown'}
              </p>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  )
}