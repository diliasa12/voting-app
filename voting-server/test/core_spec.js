import { List } from "immutable";
import { setEntries } from "#src/core.js";
import { expect } from "chai";
describe("Immutability", () => {
  describe("Loading in", () => {
    let state = Map();
    let movies = ["Transporting", "28 days later"];
    let nexState = setEntries(state, movies);

    expect(nexState).to.equal(
      Map({ entries: List.of("Transporting", "28 days later") }),
    );
  });
});
