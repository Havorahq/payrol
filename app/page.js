import Image from "next/image";
import "../styles/styles.scss";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Xalari frontend</h1>
      <li>
        <Link href="/connect-button">Connect Button Integration</Link>
      </li>
    </main>
  );
}
