import { Seo } from '../components/common/Seo';

export default function HomePage() {
  return (
    <section className="page-shell page-gutter">
      <Seo
        title="Home"
        description="Sea_Food Hotel & Resort — where the Atlantic comes to stay."
      />
      <h1>Home</h1>
      <p>Seaside dining, rooms and experiences are coming together here.</p>
    </section>
  );
}
