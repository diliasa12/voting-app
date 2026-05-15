import { expect } from "chai";
import immutable from "immutable";
const { List, Map } = immutable;
describe("immutability", () => {
  describe("a number", () => {
    function getState(currentState) {
      return currentState + 1;
    }

    it("is immutable", () => {
      let state = 42;
      let nextstate = getState(state);

      expect(nextstate).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe("A list", () => {
    function addMovies(currentState, movie) {
      return currentState.update("movies", (movies) => movies.push(movie));
    }
    it("is immutable", () => {
      let currentState = Map({
        movies: List.of("Transporting", "28 days later"),
      });
      let movie = "Ghost in the Cell";
      const nextstate = addMovies(currentState, movie);

      expect(nextstate).to.equal(
        Map({
          movies: List.of("Transporting", "28 days later", "Ghost in the Cell"),
        }),
      );
      expect(currentState).to.equal(
        Map({
          movies: List.of("Transporting", "28 days later"),
        }),
      );
    });
  });
});
