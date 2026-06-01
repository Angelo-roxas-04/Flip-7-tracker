/**
 * Pure geometry: distribute N seats evenly around the rim of the felt oval.
 * Returns absolute left/top offsets for each seat's top-left corner.
 */

export type SeatPos = { left: number; top: number };

export function seatPositions(
  count: number,
  width: number,
  height: number,
  seatSize: number,
): SeatPos[] {
  if (count === 0 || width === 0) return [];
  const cx = width / 2;
  const cy = height / 2;
  // Inset the ring so seats straddle the rim without clipping at the edges.
  const rx = width / 2 - seatSize / 2;
  const ry = height / 2 - seatSize / 2;

  return Array.from({ length: count }, (_, i) => {
    // Start at the bottom (the "near" seat) and go clockwise.
    const angle = Math.PI / 2 + (i * 2 * Math.PI) / count;
    return {
      left: cx + rx * Math.cos(angle) - seatSize / 2,
      top: cy + ry * Math.sin(angle) - seatSize / 2,
    };
  });
}
