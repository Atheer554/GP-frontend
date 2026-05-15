import client from './client'

export async function fetchPatients() {
    const response = await client.get('/patients/')
    return response.data
}

export async function createPatient(data) {
    const response = await client.post('/patients/', data)
    return response.data
}