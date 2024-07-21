export const checkAvailability = async (id: number) => {
  const response = await fetch(`${import.meta.env.VITE_AVAILABILITY_ENDPOINT}/${id}`)
  return await response.json()
}
