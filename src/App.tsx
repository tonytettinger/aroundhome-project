import Layout from "./components/Layout";
import TimeSlotCards from "./components/TimeSlotCards";
import { QueryClient, QueryClientProvider } from "react-query";

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
});

function App() {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <TimeSlotCards />
      </QueryClientProvider>
    </Layout>
  );
}

export default App;
