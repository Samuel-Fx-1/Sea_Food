import { LegalPage } from '../components/common/LegalPage';
import { siteConfig } from '../config/site';

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="The small print"
      title="Privacy policy"
      description="What we do with the details you share when you plan a stay with us."
      seoDescription="How Sea_Food handles the details you send through our reservation, enquiry and contact forms."
      sections={[
        {
          heading: 'Who we are',
          paragraphs: [
            `Sea_Food Hotel & Resort is a demo competition entry. You can reach us at ${siteConfig.email} or ${siteConfig.phone}.`,
          ],
        },
        {
          heading: 'What we collect',
          paragraphs: [
            'Our forms ask for the details needed to answer you: your name, email address, phone number, booking dates, guest count, room choice and any message you choose to send.',
            'Saved table requests and room enquiries also stay in this browser using localStorage so you can review them on the confirmation page.',
          ],
        },
        {
          heading: 'How we use it',
          paragraphs: [
            'We use your details only to reply to your request and to manage the table or room you asked about. When an email form endpoint is configured, the form contents are sent to that endpoint so our team can follow up.',
            'This demo does not sell, rent or share your details with advertisers.',
          ],
        },
        {
          heading: 'Your choices',
          paragraphs: [
            'You can clear saved requests at any time by clearing this browser’s local storage. You can also ask us to remove any details you have emailed us by writing to ' +
              siteConfig.email +
              '.',
          ],
        },
        {
          heading: 'Cookies and analytics',
          paragraphs: [
            'We do not set advertising cookies or run third-party analytics in this demo. Your theme preference is kept locally in your browser.',
          ],
        },
      ]}
    />
  );
}
