import { describe, expect, it } from "vitest";
import { bgStyle } from "./checker";

describe("bgStyle", () => {
  it("returns the checkerboard for transparent and passes colors through", () => {
    // Arrange + Act + Assert (small): "transparent" becomes a repeating
    // checker sized by px; any other value is used verbatim as a CSS color
    expect(bgStyle("transparent", 12)).toContain("repeating-conic-gradient");
    expect(bgStyle("transparent", 12)).toContain("12px 12px");
    expect(bgStyle("#a5bdd2", 12)).toBe("#a5bdd2");
  });
});
