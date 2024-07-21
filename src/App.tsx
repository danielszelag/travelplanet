import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Rooms } from './components/Rooms'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Rooms />
    </QueryClientProvider>
  )
}
