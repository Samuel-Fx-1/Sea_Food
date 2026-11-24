import { skipLinkLabel } from './data/site';
import { HomePage } from './pages/HomePage';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        {skipLinkLabel}
      </a>
      <HomePage />
    </>
  );
}
