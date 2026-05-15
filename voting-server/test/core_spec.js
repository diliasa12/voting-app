// test.js
import immutable from "immutable";
import { setEntries, next } from "#core.js";
import { expect } from "chai";
const { List, Map } = immutable;

describe("Application Logic", () => {
  describe("setEntries", () => {
    it("converts to immutable", () => {
      let state = Map();
      let movies = ["Transporting", "28 days later"];
      let nextState = setEntries(state, movies);

      expect(nextState).to.equal(
        Map({ entries: List.of("Transporting", "28 days later") }),
      );
    });
  });

  describe("next", () => {
    it("takes the next two entries under vote", () => {
      const state = Map({
        entries: List.of("Transporting", "28 days later", "Ghost in the cell"),
      });
      const nextState = next(state); // ✅ Typo diperbaiki (nextState huruf besar)

      expect(nextState).to.equal(
        Map({
          vote: Map({ pair: List.of("Transporting", "28 days later") }),
          entries: List.of("Ghost in the cell"),
        }),
      );
    });
  });
});
