
import Nav from "../components/Nav";
import Model from "../components/Model";
import Notice from "../components/Notice";
import store from "../provider/store/store";
import "../styles/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";


export default function App({ Component, pageProps }) {
  const [orgin, setorgin] = useState();
  const [href, sethref] = useState();
  const router = useRouter();
  useEffect(() => {
    setorgin(window.location.origin);
    sethref(window.location.href);
  }, [router.pathname]);
  return (
    <>
      <Link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Provider store={store}>
        <div className="w-screen h-screen">
          {href !== `${orgin}/login` ? <Nav /> : ""}
          <div
            className={`w-full  ${
              href !== `${orgin}/login` ? "h-[90%]" : "h-full"
            }`}
          >
            <Component {...pageProps} />
            <Notice />
          </div>
          <Model />
        </div>
      </Provider>
    </>
  );
}
