import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">PAGE NOT FOUND / 404</p>
      <h1>That page isn’t in this dataset.</h1>
      <p>The link may have changed. Return to the portfolio to explore the published projects and profile.</p>
      <Link className="button button--dark" href="/">Back to the portfolio <span>↗</span></Link>
    </main>
  );
}
