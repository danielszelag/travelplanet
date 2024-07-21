import { FC } from 'react'

export interface IRoom {
  id: number
  name: string
  price: { currencyCode: string; value: number }
}

export const Room: FC<IRoom> = (props) => {
  const { id, name, price } = props
  return (
    <div className='w-1/3 justify-between flex border border-solid border-green-500'>
      <div>{name}</div>
      <div className='flex gap-1'>
        <div>{price.value}</div>
        <div>{price.currencyCode}</div>
      </div>
    </div>
  )
}
