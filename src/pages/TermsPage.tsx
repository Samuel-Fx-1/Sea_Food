import { LegalPage } from '../components/common/LegalPage';
import { siteConfig } from '../config/site';

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="The small print"
      title="Terms of use"
      description="A few plain-language notes about using this demo site."
      seoDescription="Terms of use for the Sea_Food Hotel & Resort demo website."
      sections={[
        {
          heading: 'Demo experience',
          paragraphs: [
            'This site is a competition demo. Hotel details, prices, availability and photographs are illustrative and do not represent a real booking service.',
          ],
        },
        {
          heading: 'Reservations and enquiries',
          paragraphs: [
            'Submitting a request does not confirm a table or a room. Our team would still need to check availability and reply to you.',
            'Please give accurate contact details so we can get back to you. For larger groups, call us at ' +
              siteConfig.phone +
              '.',
          ],
        },
        {
          heading: 'Pricing',
          paragraphs: [
            'All prices shown are demo values. The boil builder total is an estimate based on the selected size, seafood, extras and sauce; it is not a charge or a quote.',
          ],
        },
        {
          heading: 'Content and images',
          paragraphs: [
            'Menu descriptions, stories and guest testimonials are written for this demo. Photo credits are listed in the project’s public/images/CREDITS.md file.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update these terms as the demo evolves. Questions can be sent to ' +
              siteConfig.email +
              '.',
          ],
        },
      ]}
    />
  );
}
