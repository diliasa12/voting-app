// test.js
import immutable from "immutable";
import { setEntries, next, vote } from "#core.js";
import { expect } from "chai";
import chai from "chai";
import chaiImmutable from "chai-immutable";
const { List, Map } = immutable;
chai.use(chaiImmutable);
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
  describe("vote", () => {
    it("crates a tally vor the voted entry", () => {
      const state = Map({
        vote: Map({ pair: List.of("Trainspotting", "28 Days Later") }),
        entries: List(),
      });
      const nextState = vote(state, "Trainspotting");
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Trainspotting", "28 Days Later"),
            tally: Map({
              Trainspotting: 1,
            }),
          }),
          entries: List(),
        }),
      );
    });
    it("adds to existing tally for the vote entry", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Trainspotting", "28 Days Later"),
          tally: Map({
            Trainspotting: 4,
            "28 Days Later": 1,
          }),
        }),
        entries: List(),
      });
      const nextState = vote(state, "28 Days Later");
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Trainspotting", "28 Days Later"),
            tally: Map({ Trainspotting: 4, "28 Days Later": 2 }),
          }),
          entries: List(),
        }),
      );
    });
  });
});
