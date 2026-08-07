/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Extracts the 11-character YouTube video ID from a raw ID or any common
 * YouTube URL form (watch?v=, youtu.be/, /embed/, /shorts/, /live/, /v/).
 * Returns null when no valid ID can be detected.
 */
export function extractYoutubeId(input?: string | null): string | null {
  if (!input) return null;
  const value = input.trim();
  if (!value) return null;

  // Already a bare 11-character video ID
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return value;

  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{11})/, // youtu.be/<id>
    /[?&]v=([A-Za-z0-9_-]{11})/, // watch?v=<id> or ?v=<id>
    /\/embed\/([A-Za-z0-9_-]{11})/, // /embed/<id>
    /\/shorts\/([A-Za-z0-9_-]{11})/, // /shorts/<id>
    /\/live\/([A-Za-z0-9_-]{11})/, // /live/<id>
    /\/v\/([A-Za-z0-9_-]{11})/, // /v/<id>
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match && match[1]) return match[1];
  }

  return null;
}
