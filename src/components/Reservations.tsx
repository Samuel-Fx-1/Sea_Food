import { useEffect, useRef } from 'react';
import { reservationContent } from '../data/site';
import { useReservation } from '../hooks/useReservation';
import { formatReservationSummary } from '../utils/reservation';
import { DisplayHeading } from './DisplayHeading';

export function Reservations() {
  const {
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
  } = useReservation();

  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);
  const partyRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = error?.field;

    if (!field) {
      return;
    }

    switch (field) {
      case 'date':
        dateRef.current?.focus();
        break;
      case 'time':
        timeRef.current?.focus();
        break;
      case 'party':
        partyRef.current?.focus();
        break;
      case 'name':
        nameRef.current?.focus();
        break;
      case 'email':
        emailRef.current?.focus();
        break;
      case 'note':
        break;
    }
  }, [error]);

  useEffect(() => {
    if (isFormVisible && savedRequest) {
      dateRef.current?.focus();
    }
  }, [isFormVisible, savedRequest]);

  useEffect(() => {
    if (confirmationFocusToken === 0) {
      return;
    }

    const panel = successRef.current;

    if (!panel) {
      return;
    }

    panel.focus({ preventScroll: true });
    panel.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'center',
    });
  }, [confirmationFocusToken]);

  const timePlaceholder = !values.date
    ? reservationContent.timePlaceholder
    : availableTimes.length === 0
      ? reservationContent.timeNoSeatings
      : reservationContent.timeSelectPlaceholder;

  return (
    <section
      className="reservation-section page-gutter"
      id="reservations"
      aria-labelledby="reservation-title"
    >
      <div className="reservation-intro reveal">
        <span className="eyebrow">{reservationContent.eyebrow}</span>
        <DisplayHeading
          as="h2"
          id="reservation-title"
          content={reservationContent.heading}
        />
        <p>{reservationContent.description}</p>
        <span className="reservation-sparkle" aria-hidden="true">
          {reservationContent.sparkle}
        </span>
      </div>

      <div className="reservation-panel reveal">
        <div className="form-top">
          <h3>{reservationContent.formTitle}</h3>
          <span>{reservationContent.formIndex}</span>
        </div>

        <form
          id="reservation-form"
          noValidate
          onSubmit={submit}
          hidden={!isFormVisible}
        >
          <div className="form-grid">
            <div className="field">
              <label htmlFor="res-date">
                {reservationContent.dateLabel}{' '}
                <span aria-hidden="true">*</span>
              </label>
              <input
                ref={dateRef}
                id="res-date"
                name="date"
                type="date"
                required
                aria-describedby="date-hint"
                min={dateBounds.min}
                max={dateBounds.max}
                value={values.date}
                onChange={(event) => updateField('date', event.target.value)}
              />
              <small id="date-hint">{reservationContent.dateHint}</small>
            </div>

            <div className="field">
              <label htmlFor="res-time">
                {reservationContent.timeLabel}{' '}
                <span aria-hidden="true">*</span>
              </label>
              <select
                ref={timeRef}
                id="res-time"
                name="time"
                required
                disabled={availableTimes.length === 0}
                value={values.time}
                onChange={(event) => updateField('time', event.target.value)}
              >
                <option value="">{timePlaceholder}</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="res-party">
                {reservationContent.partyLabel}{' '}
                <span aria-hidden="true">*</span>
              </label>
              <select
                ref={partyRef}
                id="res-party"
                name="party"
                required
                value={values.party}
                onChange={(event) => updateField('party', event.target.value)}
              >
                <option value="">
                  {reservationContent.partyPlaceholder}
                </option>
                {reservationContent.partyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="res-name">
                {reservationContent.nameLabel}{' '}
                <span aria-hidden="true">*</span>
              </label>
              <input
                ref={nameRef}
                id="res-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={reservationContent.namePlaceholder}
                minLength={2}
                maxLength={80}
                required
                value={values.name}
                onChange={(event) => updateField('name', event.target.value)}
              />
            </div>

            <div className="field field-full">
              <label htmlFor="res-email">
                {reservationContent.emailLabel}{' '}
                <span aria-hidden="true">*</span>
              </label>
              <input
                ref={emailRef}
                id="res-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={reservationContent.emailPlaceholder}
                maxLength={120}
                required
                value={values.email}
                onChange={(event) => updateField('email', event.target.value)}
              />
            </div>

            <div className="field field-full">
              <label htmlFor="res-note">
                {reservationContent.noteLabel}{' '}
                <span className="optional">
                  {reservationContent.optionalLabel}
                </span>
              </label>
              <textarea
                id="res-note"
                name="note"
                rows={2}
                maxLength={300}
                placeholder={reservationContent.notePlaceholder}
                value={values.note}
                onChange={(event) => updateField('note', event.target.value)}
              />
            </div>
          </div>

          <p className="form-error" id="form-error" role="alert" hidden={!error}>
            {error?.message}
          </p>

          <button className="submit-button" type="submit">
            {reservationContent.submitLabel}{' '}
            <span aria-hidden="true">↗</span>
          </button>

          <p className="form-disclaimer">{reservationContent.disclaimer}</p>
        </form>

        <div
          ref={successRef}
          id="reservation-success"
          className="reservation-success"
          role="status"
          aria-live="polite"
          tabIndex={-1}
          hidden={isFormVisible}
        >
          {!isFormVisible && savedRequest ? (
            <>
              <h4>{reservationContent.successTitle}</h4>
              <p>{formatReservationSummary(savedRequest)}</p>
              <p>{reservationContent.successDisclaimer}</p>
              <button type="button" onClick={edit}>
                {reservationContent.editLabel} ↗
              </button>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
