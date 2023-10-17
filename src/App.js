import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { RouterProvider } from "react-router-dom";
import ProviderRedux from "./redux/ProviderRedux";
import router from "./router";

function App(props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          fontFamily: "saira, sans-serif",
          colorPrimary: "#005B30",
        },
      }}
    >
      <ProviderRedux>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ProviderRedux>
    </ConfigProvider>
  );
}

export default App;
