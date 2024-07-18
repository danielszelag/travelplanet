import { useState } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { getRooms } from './api/getRooms'

const queryClient = new QueryClient()

interface Room {
  id: number
  name: string
  price: { currencyCode: string; value: number }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Rooms />
    </QueryClientProvider>
  )
}
export default App

function Rooms() {
  const queryClient = useQueryClient()
  const { isPending, isError, data } = useQuery({ queryKey: ['rooms'], queryFn: getRooms })
  console.log(data)
  if (isPending) return 'Loading...'
  if (isError) return 'Error!'
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-red-100'>
      {data.map((room: Room) => (
        <div key={room.id}>{room.name}</div>
      ))}
    </div>
  )
}
