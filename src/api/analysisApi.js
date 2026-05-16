import client from './client'
import { ROUTES } from '../utils/constants'

export async function predictApi(file, patientId) {
  const formData = new FormData()

  formData.append('file', file)
  formData.append('patient_id', patientId)

  const response = await client.post(
    ROUTES.predict,
    formData,
    
  )

  return response.data
}

export async function getHistoryApi(patientId) {
  const response = await client.get(`/history/${patientId}`)
  return response.data
}

export async function getAnalysisDetailsApi(id) {
  const response = await client.get(`/analysis/${id}`)
  return response.data
}
