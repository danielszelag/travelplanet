import { FC, useState } from 'react'
import { Room } from './Room'
import { useQuery } from '@tanstack/react-query'
import { getRooms } from '../api/getRooms'

interface Props {}

export const Rooms: FC<Props> = () => {
  const ROOMS_BY_PAGE = 5
  const [page, setPage] = useState(1)
  const [sortedBy, setSortedBy] = useState('price')
  const { isPending, isError, data } = useQuery({ queryKey: ['rooms'], queryFn: getRooms })
  if (isPending) return 'Loading...'
  if (isError) return 'Error!'
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center bg-red-100 gap-2'>
      {data
        .slice(page * ROOMS_BY_PAGE - ROOMS_BY_PAGE, page * ROOMS_BY_PAGE)

        .map(
          (room: { id: number; name: string; price: { currencyCode: string; value: number } }) => (
            <Room key={room.id} id={room.id} name={room.name} price={room.price} />
          )
        )}
      <div>
        <button disabled={page < 2} onClick={() => setPage((prev) => prev - 1)}>
          Previous
        </button>
        <button
          disabled={page >= Math.floor(data.length / 4)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
