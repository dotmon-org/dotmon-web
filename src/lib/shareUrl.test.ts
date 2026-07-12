import { beforeEach, describe, expect, it } from "vitest";
import type { Tweaks } from "../components/Sidebar";
import {
  buildShareUrl,
  buildShareUrlFromOpts,
  clearShareParams,
  readShareFromUrl,
  tweaksFor,
} from "./shareUrl";

const setUrl = (pathAndQuery: string) =>
  window.history.replaceState(null, "", pathAndQuery);

const params = (url: string) => {
  const p = new URL(url).searchParams;
  return Object.fromEntries(p.entries());
};

beforeEach(() => setUrl("/"));

describe("buildShareUrl", () => {
  it("writes seed, style and every controllable option for the style", () => {
    // Arrange: mochi exposes outline / face / legs (gapFill is not controllable)
    const tweaks: Tweaks = {
      outline: false,
      face: true,
      legs: "many",
      gapFill: true,
    };

    // Act
    const url = buildShareUrl("Poko", "mochi", tweaks);

    // Assert: booleans become 1/0, legs stays literal, gapfill is omitted
    expect(params(url)).toEqual({
      seed: "Poko",
      style: "mochi",
      outline: "0",
      face: "1",
      legs: "many",
    });
  });

  it("emits only the options each style can control", () => {
    // Arrange
    const tweaks: Tweaks = {
      outline: true,
      face: false,
      legs: "auto",
      gapFill: true,
    };

    // Act
    const retro = params(buildShareUrl("Poko", "retro", tweaks));
    const chaos = params(buildShareUrl("Poko", "chaos", tweaks));

    // Assert: retro → outline/face/gapfill (no legs); chaos → gapfill only
    expect(Object.keys(retro).sort()).toEqual([
      "face",
      "gapfill",
      "outline",
      "seed",
      "style",
    ]);
    expect(Object.keys(chaos).sort()).toEqual(["gapfill", "seed", "style"]);
  });
});

describe("buildShareUrlFromOpts", () => {
  it("falls back to a seed-only link for custom (no-preset) options", () => {
    // Arrange: chaos options with outline flipped off match no preset
    const custom = {
      connected: true,
      symmetric: false,
      outline: false,
      face: false,
      legs: "auto",
      gapFill: false,
    } as Parameters<typeof buildShareUrlFromOpts>[1];

    // Act
    const url = buildShareUrlFromOpts("Poko", custom);

    // Assert: custom looks cannot be expressed as share params
    expect(params(url)).toEqual({ seed: "Poko" });
  });
});

describe("readShareFromUrl", () => {
  it("round-trips what buildShareUrl produced", () => {
    // Arrange: non-default retro tweaks encoded into a share URL
    const tweaks: Tweaks = {
      outline: false,
      face: true,
      legs: "auto",
      gapFill: false,
    };
    const url = buildShareUrl("ポコ", "retro", tweaks);
    setUrl(url.slice(new URL(url).origin.length));

    // Act
    const read = readShareFromUrl();

    // Assert: style and every controllable option survive the trip
    expect(read).toEqual({ preset: "retro", tweaks });
  });

  it("falls back to mochi defaults when params are missing or invalid", () => {
    // Arrange: unknown style, out-of-range boolean, unknown legs value
    setUrl("/?style=neon&outline=2&legs=three");

    // Act
    const read = readShareFromUrl();

    // Assert: everything degrades to the default style and its tweaks
    expect(read).toEqual({ preset: "mochi", tweaks: tweaksFor("mochi") });
  });

  it("ignores invalid values but keeps the valid ones", () => {
    // Arrange: face is valid, outline is garbage
    setUrl("/?style=retro&outline=x&face=0");

    // Act
    const { preset, tweaks } = readShareFromUrl();

    // Assert: outline keeps retro's default (true), face applies
    expect(preset).toBe("retro");
    expect(tweaks.outline).toBe(true);
    expect(tweaks.face).toBe(false);
  });
});

describe("clearShareParams", () => {
  it("strips share keys and leaves unrelated params untouched", () => {
    // Arrange: a full share link plus a foreign query param
    setUrl("/?seed=Poko&style=retro&outline=1&face=0&gapfill=1&utm_source=x");

    // Act
    clearShareParams();

    // Assert: address bar is clean again except for the foreign param
    expect(location.search).toBe("?utm_source=x");
  });
});
