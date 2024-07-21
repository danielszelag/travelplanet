export const checkAvailability = async (id: number) => {
  const response = await fetch(`https://dcontent.inviacdn.net/shared/dev/test-api/room/${id}`)
  return await response.json()
}
