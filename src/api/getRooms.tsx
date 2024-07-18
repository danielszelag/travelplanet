export const getRooms = async () => {
  const response = await fetch('https://dcontent.inviacdn.net/shared/dev/test-api/rooms')
  return await response.json()
}
