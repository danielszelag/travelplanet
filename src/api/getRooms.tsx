export const getRooms = async () => {
  const response = await fetch(import.meta.env.VITE_ROOMS_ENDPOINT)
  return await response.json()
}
