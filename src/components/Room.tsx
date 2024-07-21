import { FC } from 'react'

interface Props {
  id: number
  name: string
  price: { currencyCode: string; value: number }
}

export const Room: FC<Props> = (props) => {
  const { id, name, price } = props
  return (
    <div className='w-1/3 justify-between flex border border-solid border-green-500'>
      <div>{id}</div>
      <div>{name}</div>
      <div>{price.value}</div>
    </div>
  )
}
