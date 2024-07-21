import { FC, useState } from 'react'
import { Room, IRoom } from './Room'
import { useQuery } from '@tanstack/react-query'
import { getRooms } from '../api/getRooms'
import { ROOMS_PER_PAGE } from '../data/constants'

export const Rooms: FC = () => {
  const [page, setPage] = useState(1)
  const [sortedBy, setSortedBy] = useState('price')
  const { isPending, isError, data } = useQuery({ queryKey: ['rooms'], queryFn: getRooms })

  if (isPending) return 'Loading...'
  if (isError) return 'Error!'
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-5'>
      {data
        .slice(page * ROOMS_PER_PAGE - ROOMS_PER_PAGE, page * ROOMS_PER_PAGE)
        .sort((a: IRoom, b: IRoom) => {
          if (sortedBy === 'price') {
            return a.price.value - b.price.value
          } else {
            return a.name.localeCompare(b.name)
          }
        })
        .map(
          (room: { id: number; name: string; price: { currencyCode: string; value: number } }) => (
            <Room key={room.id} id={room.id} name={room.name} price={room.price} />
          )
        )}
      <div className='flex justify-between w-2/3'>
        <div className='flex gap-2'>
          <button disabled={page < 2} onClick={() => setPage((prev) => prev - 1)}>
            Previous
          </button>
          <button
            disabled={page >= Math.ceil(data.length / ROOMS_PER_PAGE)}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
        <div className='flex justify-center items-center gap-1'>
          Sort By
          <select value={sortedBy} onChange={(e) => setSortedBy(e.target.value)}>
            <option value={'price'}>Price</option>
            <option value={'name'}>Name</option>
          </select>
        </div>
      </div>
    </div>
  )
}
