import type {
  BoilConfiguration,
  CartItem,
  RoomEnquiry,
  TableBooking,
} from '../types';
import { isRecord, isStringArray, readStoredValue, writeStoredValue } from './storage';

export const CART_STORAGE_KEY = 'seafood.cart.v1';
export const TABLE_BOOKINGS_STORAGE_KEY = 'seafood.table-bookings.v1';
export const ROOM_ENQUIRIES_STORAGE_KEY = 'seafood.room-enquiries.v1';

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function isBoilConfiguration(value: unknown): value is BoilConfiguration {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNonEmptyString(value.size) &&
    isStringArray(value.seafood) &&
    isStringArray(value.addOns) &&
    isNonEmptyString(value.sauce) &&
    isNonEmptyString(value.spice)
  );
}

function isCartItem(value: unknown): value is CartItem {
  if (!isRecord(value)) {
    return false;
  }

  const validConfiguration =
    value.configuration === undefined || isBoilConfiguration(value.configuration);

  return (
    isNonEmptyString(value.id) &&
    (value.kind === 'dish' || value.kind === 'boil') &&
    isNonEmptyString(value.name) &&
    typeof value.unitPrice === 'number' &&
    Number.isFinite(value.unitPrice) &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0 &&
    validConfiguration
  );
}

function isCartItemArray(value: unknown): value is CartItem[] {
  return Array.isArray(value) && value.every(isCartItem);
}

function isTableBooking(value: unknown): value is TableBooking {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNonEmptyString(value.name) &&
    isNonEmptyString(value.phone) &&
    isNonEmptyString(value.email) &&
    isNonEmptyString(value.date) &&
    isNonEmptyString(value.time) &&
    typeof value.guests === 'number' &&
    typeof value.specialRequests === 'string' &&
    isCartItemArray(value.cart) &&
    isNonEmptyString(value.reference) &&
    isNonEmptyString(value.savedAt)
  );
}

function isRoomEnquiry(value: unknown): value is RoomEnquiry {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNonEmptyString(value.name) &&
    isNonEmptyString(value.email) &&
    isNonEmptyString(value.phone) &&
    isNonEmptyString(value.checkIn) &&
    isNonEmptyString(value.checkOut) &&
    typeof value.guests === 'number' &&
    isNonEmptyString(value.roomSlug) &&
    typeof value.message === 'string' &&
    isNonEmptyString(value.reference) &&
    isNonEmptyString(value.savedAt)
  );
}

export function readCart(): CartItem[] {
  return readStoredValue(CART_STORAGE_KEY, isCartItemArray) ?? [];
}

export function writeCart(items: CartItem[]): boolean {
  return writeStoredValue(CART_STORAGE_KEY, items);
}

export function readTableBookings(): TableBooking[] {
  const value = readStoredValue(TABLE_BOOKINGS_STORAGE_KEY, (candidate) =>
    Array.isArray(candidate) && candidate.every(isTableBooking),
  );

  return value ?? [];
}

export function writeTableBookings(bookings: TableBooking[]): boolean {
  return writeStoredValue(TABLE_BOOKINGS_STORAGE_KEY, bookings);
}

export function readRoomEnquiries(): RoomEnquiry[] {
  const value = readStoredValue(ROOM_ENQUIRIES_STORAGE_KEY, (candidate) =>
    Array.isArray(candidate) && candidate.every(isRoomEnquiry),
  );

  return value ?? [];
}

export function writeRoomEnquiries(enquiries: RoomEnquiry[]): boolean {
  return writeStoredValue(ROOM_ENQUIRIES_STORAGE_KEY, enquiries);
}

export function createReference(prefix: 'TBL' | 'RM'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
