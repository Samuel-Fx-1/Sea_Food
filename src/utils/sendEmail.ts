export type EmailPayload = Record<string, string | number> & {
  _subject: string;
  _replyto?: string;
};

function readErrorBody(body: unknown): string | null {
  if (!body || typeof body !== 'object') return null;
  const record = body as { error?: unknown; errors?: unknown };
  if (typeof record.error === 'string' && record.error.trim()) return record.error;
  if (Array.isArray(record.errors)) {
    const messages = record.errors
      .map((item) =>
        item && typeof item === 'object' && 'message' in item && typeof item.message === 'string'
          ? item.message
          : null,
      )
      .filter((message): message is string => message !== null);
    if (messages.length > 0) return messages.join(' ');
  }
  return null;
}

/**
 * Posts a form to a Formspree endpoint. Returns false when no endpoint is
 * configured so the local demo flow still works. Throws on delivery failure.
 */
export async function sendEmail(
  endpoint: string | undefined,
  payload: EmailPayload,
): Promise<boolean> {
  if (!endpoint) return false;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('We could not reach the email service. Please try again.');
  }

  if (!response.ok) {
    let message: string | null;
    try {
      message = readErrorBody(await response.json());
    } catch {
      message = null;
    }
    throw new Error(message ?? `Email service returned ${response.status}. Please try again.`);
  }

  return true;
}
