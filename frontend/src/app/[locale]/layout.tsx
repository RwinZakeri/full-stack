import { useTranslations } from "next-intl";
import "@/styles/global.css";

export default function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = useTranslations("RootLayout");

  return (
    <html lang={props.params.locale}>
      <body>
        <main>{props.children}</main>
      </body>
    </html>
  );
}
