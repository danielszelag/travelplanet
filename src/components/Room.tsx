import { FC } from 'react'
import { checkAvailability } from '../api/checkAvailability'
import { useQuery } from '@tanstack/react-query'

export interface IRoom {
  id: number
  name: string
  price: { currencyCode: string; value: number }
}

export const Room: FC<IRoom> = (props) => {
  const { name, price, id } = props

  const { isFetching, isError, data, refetch } = useQuery({
    queryKey: ['availability', id],
    queryFn: () => checkAvailability(id),
    enabled: false
  })

  const availabilityText = isFetching
    ? 'Checking availability'
    : isError
    ? 'Availability Error'
    : data?.availabilityStatus

  return (
    <div className=' w-2/3 items-center flex border border-solid border-black bg-slate-200 gap-4'>
      <div className='w-1/4 p-1'>{name}</div>
      <div className='w-1/5 flex gap-1'>
        Price:
        <div>{price.value}</div>
        <div>{price.currencyCode}</div>
      </div>
      <div className='w-1/5'>
        {data?.price?.value && (
          <div className='flex w-1/5 gap-2'>
            <div className='flex whitespace-nowrap'>New Price: {data.price.value}</div>
            {data.price.value > price.value && (
              <div className='text-red-500'>+{data.price.value - price.value}</div>
            )}
            {data.price.value < price.value && (
              <div className='text-green-500'>-{Math.abs(data.price.value - price.value)}</div>
            )}
          </div>
        )}
      </div>
      <div className='w-1/6'>{availabilityText}</div>
      <div className='flex w-1/6'>
        <button className='w-1/2' onClick={() => refetch()}>
          Check
        </button>
        <button
          className='w-1/2'
          disabled={
            data?.availabilityStatus !== 'available' && data?.availabilityStatus !== 'onRequest'
          }
          onClick={() => console.log({ name, price, id, data })}
        >
          Book
        </button>
      </div>
    </div>
  )
}
