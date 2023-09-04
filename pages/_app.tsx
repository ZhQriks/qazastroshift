import type { AppProps } from "next/app";

import "@/styles/global.css";
import { AuthProvider } from "../lib/Auth";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
