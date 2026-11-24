import { useState, type FormEvent } from 'react';
import type {
  DateBounds,
  ReservationError,
  ReservationField,
  ReservationFormValues,
  ReservationRequest,
} from '../types';
import {
  getAvailableTimes,
  getDateBounds,
  isEmailValid,
  parseDateValue,
  readStoredReservation,
  saveReservation,
} from '../utils/reservation';

interface ReservationInitialState {
  values: ReservationFormValues;
  availableTimes: string[];
  savedRequest: ReservationRequest | null;
}

interface ReservationController {
  values: ReservationFormValues;
  availableTimes: string[];
  dateBounds: DateBounds;
  error: ReservationError | null;
  savedRequest: ReservationRequest | null;
  isFormVisible: boolean;
  confirmationFocusToken: number;
  updateField: (field: ReservationField, value: string) => void;
  submit: (event: FormEvent<HTMLFormElement>) => void;
  edit: () => void;
}

const EMPTY_FORM_VALUES: ReservationFormValues = {
  date: '',
  time: '',
  party: '',
  name: '',
  email: '',
  note: '',
};

function createInitialState(): ReservationInitialState {
  const savedRequest = readStoredReservation();

  if (!savedRequest) {
    return {
      values: { ...EMPTY_FORM_VALUES },
      availableTimes: [],
      savedRequest: null,
    };
  }

  return {
    values: {
      date: savedRequest.date,
      time: savedRequest.time,
      party: String(savedRequest.party),
      name: savedRequest.name,
      email: savedRequest.email,
      note: savedRequest.note,
    },
    availableTimes: getAvailableTimes(savedRequest.date),
    savedRequest,
  };
}

export function useReservation(): ReservationController {
  const [initialState] = useState<ReservationInitialState>(createInitialState);
  const [values, setValues] = useState<ReservationFormValues>(
    initialState.values,
  );
  const [availableTimes, setAvailableTimes] = useState<string[]>(
    initialState.availableTimes,
  );
  const [savedRequest, setSavedRequest] = useState<ReservationRequest | null>(
    initialState.savedRequest,
  );
  const [isFormVisible, setIsFormVisible] = useState<boolean>(
    initialState.savedRequest === null,
  );
  const [error, setError] = useState<ReservationError | null>(null);
  const [confirmationFocusToken, setConfirmationFocusToken] = useState(0);
  const [dateBounds] = useState<DateBounds>(() => getDateBounds());

  const updateField = (field: ReservationField, value: string): void => {
    setError(null);

    if (field === 'date') {
      const nextTimes = getAvailableTimes(value);
      setAvailableTimes(nextTimes);
      setValues((current) => ({
        ...current,
        date: value,
        time: nextTimes.includes(current.time) ? current.time : '',
      }));
      return;
    }

    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setError(null);

    const parsedDate = parseDateValue(values.date);

    if (
      !parsedDate ||
      values.date < dateBounds.min ||
      values.date > dateBounds.max
    ) {
      setError({
        message: 'Choose a date within the next 90 days.',
        field: 'date',
      });
      return;
    }

    if (parsedDate.getDay() === 1) {
      setError({
        message: 'We are closed on Mondays. Choose another evening.',
        field: 'date',
      });
      return;
    }

    const times = getAvailableTimes(values.date);

    if (times.length === 0) {
      setError({
        message: 'No seatings remain for this date. Please choose another date.',
        field: 'date',
      });
      return;
    }

    if (!times.includes(values.time)) {
      setError({
        message: 'Choose an available seating time for your date.',
        field: 'time',
      });
      return;
    }

    const party = Number(values.party);

    if (!Number.isInteger(party) || party < 1 || party > 8) {
      setError({
        message: 'Choose a party size between 1 and 8.',
        field: 'party',
      });
      return;
    }

    const name = values.name.trim();

    if (name.length < 2) {
      setError({
        message: 'Enter your full name.',
        field: 'name',
      });
      return;
    }

    const email = values.email.trim();

    if (!email || !isEmailValid(email)) {
      setError({
        message: 'Enter a valid email address.',
        field: 'email',
      });
      return;
    }

    const request: ReservationRequest = {
      date: values.date,
      time: values.time,
      party,
      name,
      email,
      note: values.note.trim(),
      savedAt: new Date().toISOString(),
    };

    if (!saveReservation(request)) {
      setError({
        message:
          'This browser could not save your request. Please allow local storage and try again.',
      });
      return;
    }

    setSavedRequest(request);
    setIsFormVisible(false);
    setConfirmationFocusToken((token) => token + 1);
  };

  const edit = (): void => {
    setError(null);
    setIsFormVisible(true);
  };

  return {
    values,
    availableTimes,
    dateBounds,
    error,
    savedRequest,
    isFormVisible,
    confirmationFocusToken,
    updateField,
    submit,
    edit,
  };
}
