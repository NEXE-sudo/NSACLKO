import NavBar from "./components/navbar";
import Progressbar from "./components/progressbar";
import Footer from "./components/footer";
import { Providers } from "./components/Providers";

import "./styles/base.css";
import "./styles/index.css";
import "./styles/register.css";
import "./styles/timeline.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <Progressbar />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
