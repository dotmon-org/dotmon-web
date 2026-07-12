import { beforeEach, describe, expect, it } from "vitest";
import { readSeedFromUrl } from "./useSeedUrl";

const setSeedParam = (seed: string) => {
  const q = new URLSearchParams({ seed });
  window.history.replaceState(null, "", `/?${q}`);
};

beforeEach(() => window.history.replaceState(null, "", "/"));

describe("readSeedFromUrl", () => {
  it("returns the seed as-is, including non-ASCII", () => {
    // Arrange + Act + Assert (small): plain seeds pass through untouched
    setSeedParam("ポコ-3");
    expect(readSeedFromUrl()).toBe("ポコ-3");
  });

  it("returns null when the param is absent", () => {
    // Arrange + Act + Assert (small): a clean URL yields no seed
    expect(readSeedFromUrl()).toBeNull();
  });

  it("strips control characters and trims whitespace", () => {
    // Arrange: seed padded with C0 controls, DEL and spaces
    setSeedParam("\u0000\u001f  Poko  \u007f");

    // Act
    const seed = readSeedFromUrl();

    // Assert: only the printable core remains
    expect(seed).toBe("Poko");
  });

  it("returns null when nothing printable is left", () => {
    // Arrange: the value is control characters and whitespace only
    setSeedParam("\u0001\u0002   ");

    // Act + Assert
    expect(readSeedFromUrl()).toBeNull();
  });

  it("caps the seed at 100 characters", () => {
    // Arrange
    setSeedParam("a".repeat(150));

    // Act
    const seed = readSeedFromUrl();

    // Assert
    expect(seed).toBe("a".repeat(100));
  });
});
