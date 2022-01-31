import Layout from "./components/Layout";
import TimeSlotCards from "./components/TimeSlotCards";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false
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
