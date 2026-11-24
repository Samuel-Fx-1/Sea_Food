import { Link } from 'react-router-dom';
import { Seo } from '../components/common/Seo';

export default function NotFoundPage() {
  return (
    <section className="page-shell page-gutter">
      <Seo title="Page not found" description="That page has drifted out to sea." />
      <h1>404 — Page not found</h1>
      <Link className="button button--gold" to="/">
        Back to shore
      </Link>
    </section>
  );
}
