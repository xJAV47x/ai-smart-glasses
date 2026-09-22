/**
 * Runtime contract for the 90-day MVP.
 * Deliberately excludes biometrics, public-data identity, and autonomous targeting.
 */

const MAX_COORDINATE = 1000;

function validateCoordinate(value) {
  return Number.isFinite(value) && value >= 0 && value <= MAX_COORDINATE;
}

function validateParticipant(input) {
  if (!input || typeof input.name !== 'string' || input.name.trim().length < 1 || input.name.trim().length > 40) {
    return { ok: false, error: 'name must be 1-40 characters' };
  }
  if (!['red', 'blue', 'facilitator'].includes(input.team)) {
    return { ok: false, error: 'team must be red, blue, or facilitator' };
  }
  if (input.consent !== true) {
    return { ok: false, error: 'explicit session consent is required' };
  }
  return { ok: true };
}

function validateMove(input) {
  if (!input || !validateCoordinate(input.x) || !validateCoordinate(input.y)) {
    return { ok: false, error: 'x and y must be between 0 and 1000' };
  }
  return { ok: true };
}

module.exports = { MAX_COORDINATE, validateParticipant, validateMove };
