import type {
  DateBounds,
  ReservationRequest,
} from '../types';

export const RESERVATION_STORAGE_KEY = 'ondine.table-request.v1';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface StoredReservation {
  date: string;
  time: string;
  party: number;
  name: string;
  email: string;
  note?: string;
  savedAt: string;
}

export function formatDateValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function parseDateValue(value: string): Date | null {
  if (!DATE_PATTERN.test(value)) {
    return null;
  }

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime()) || formatDateValue(date) !== value) {
    return null;
  }

  return date;
}

export function getDateBounds(now: Date = new Date()): DateBounds {
  const maxDate = new Date(now);
  maxDate.setDate(now.getDate() + 90);

  return {
    min: formatDateValue(now),
    max: formatDateValue(maxDate),
  };
}

export function getAvailableTimes(
  dateValue: string,
  now: Date = new Date(),
): string[] {
  const date = parseDateValue(dateValue);

  if (!date || date.getDay() === 1) {
    return [];
  }

  const closingTime =
    date.getDay() === 0 ? 1230 : date.getDay() === 5 || date.getDay() === 6 ? 1320 : 1290;
  const today = formatDateValue(now);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const times: string[] = [];

  for (let minutes = 1110; minutes <= closingTime; minutes += 30) {
    if (dateValue === today && minutes <= currentMinutes + 90) {
      continue;
    }

    times.push(
      `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(
        minutes % 60,
      ).padStart(2, '0')}`,
    );
  }

  return times;
}

export function isEmailValid(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

export function saveReservation(request: ReservationRequest): boolean {
  try {
    window.localStorage.setItem(
      RESERVATION_STORAGE_KEY,
      JSON.stringify(request),
    );
    return true;
  } catch {
    return false;
  }
}

function isStoredReservation(value: unknown): value is StoredReservation {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.date === 'string' &&
    candidate.date.length > 0 &&
    typeof candidate.time === 'string' &&
    candidate.time.length > 0 &&
    typeof candidate.party === 'number' &&
    Number.isInteger(candidate.party) &&
    candidate.party >= 1 &&
    candidate.party <= 8 &&
    typeof candidate.name === 'string' &&
    candidate.name.length > 0 &&
    typeof candidate.email === 'string' &&
    candidate.email.length > 0 &&
    typeof candidate.savedAt === 'string'
  );
}

export function readStoredReservation(): ReservationRequest | null {
  try {
    const stored = window.localStorage.getItem(RESERVATION_STORAGE_KEY);

    if (!stored) {
      return null;
    }

    const parsed: unknown = JSON.parse(stored);

    if (!isStoredReservation(parsed)) {
      return null;
    }

    const bounds = getDateBounds();

    if (parsed.date < bounds.min || parsed.date > bounds.max) {
      window.localStorage.removeItem(RESERVATION_STORAGE_KEY);
      return null;
    }

    if (!getAvailableTimes(parsed.date).includes(parsed.time)) {
      window.localStorage.removeItem(RESERVATION_STORAGE_KEY);
      return null;
    }

    return {
      date: parsed.date,
      time: parsed.time,
      party: parsed.party,
      name: parsed.name,
      email: parsed.email,
      note: typeof parsed.note === 'string' ? parsed.note : '',
      savedAt: parsed.savedAt,
    };
  } catch {
    return null;
  }
}

export function formatReservationSummary(request: ReservationRequest): string {
  const date = parseDateValue(request.date);
  const formattedDate = date
    ? new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date)
    : request.date;
  const guestLabel = request.party === 1 ? 'guest' : 'guests';

  return `${formattedDate} at ${request.time} · ${request.party} ${guestLabel} · ${request.name}`;
}
