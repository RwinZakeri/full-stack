import { useTranslations } from "next-intl";
import "@/styles/global.css";
import AuthGuard from "@/hoc/auth.guard";

export default function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = useTranslations("RootLayout");

  return (
    <html lang={props.params.locale}>
      <body>
        <AuthGuard>{props.children}</AuthGuard>
      </body>
    </html>
  );
}
