// import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import AuthGuard from "@/hoc/auth.guard";
import Wapper from "@/hoc/wapper";
import "@/styles/global.css";

export default function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={props.params.locale} className={GeistSans.className}>
      <body>
        <Wapper>
          <AuthGuard>{props.children}</AuthGuard>
        </Wapper>
      </body>
    </html>
  );
}
