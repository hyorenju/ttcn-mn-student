import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { RouterProvider } from "react-router-dom";
import ProviderRedux from "./redux/ProviderRedux";
import router from "./router";

function App(props) {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAQF_0E21SOY8Sk0sAdR9Bq0vfu9flNU7Q",
    authDomain: "vnua-student-fita.firebaseapp.com",
    projectId: "vnua-student-fita",
    storageBucket: "vnua-student-fita.appspot.com",
    messagingSenderId: "894824720795",
    appId: "1:894824720795:web:d1af0c8731f798d0a4593e",
    measurementId: "G-D243JT2C2Z",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
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
