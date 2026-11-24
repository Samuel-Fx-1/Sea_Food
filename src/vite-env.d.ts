/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_RESERVATION_ENDPOINT?: string;
  readonly VITE_FORMSPREE_ROOM_ENQUIRY_ENDPOINT?: string;
  readonly VITE_FORMSPREE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
