import axios from 'axios'
import type { Event } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'Application/json',
  },
})

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  },
  saveEvent(event: Event) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...eventWithoutId } = event
    return apiClient.post('/events', eventWithoutId)
  },
}
