import { describe, expect, it } from "vitest";
import { STRINGS } from "./i18n";

describe("STRINGS dictionaries", () => {
  it("en and ja expose exactly the same keys", () => {
    // Arrange + Act + Assert (small): a UI string added to one locale must
    // exist in the other, or the app silently renders undefined
    expect(Object.keys(STRINGS.ja).sort()).toEqual(
      Object.keys(STRINGS.en).sort(),
    );
  });

  it("templated strings embed their arguments", () => {
    // Arrange + Act + Assert (small): count/progress templates must surface
    // the numbers they are given in both locales
    expect(STRINGS.en.herd(28)).toContain("28");
    expect(STRINGS.ja.herd(9)).toContain("9");
    expect(STRINGS.en.favZipBusy(3, 9)).toContain("3/9");
    expect(STRINGS.ja.favZipBusy(3, 9)).toContain("3/9");
  });
});
