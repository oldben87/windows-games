import {expect} from "chai"
import {unhideSquares} from "../unhideSquares"

describe("unhideSquares", () => {
  context("when given a square with all value 0", () => {
    it("should change all surrounding array values", () => {
      const square = {
        isMine: false,
        hasFlag: false,
        value: 0,
        isHidden: true,
      }
      const gameState = [
        [
          {...square, xCoOrd: 0, yCoOrd: 0},
          {...square, xCoOrd: 1, yCoOrd: 0},
        ],
        [
          {...square, xCoOrd: 0, yCoOrd: 1},
          {...square, xCoOrd: 1, yCoOrd: 1},
        ],
      ]
      expect(unhideSquares(gameState, 0, 0)).to.deep.equal([
        [
          {...square, xCoOrd: 0, yCoOrd: 0, isHidden: false},
          {...square, xCoOrd: 1, yCoOrd: 0, isHidden: false},
        ],
        [
          {...square, xCoOrd: 0, yCoOrd: 1, isHidden: false},
          {...square, xCoOrd: 1, yCoOrd: 1, isHidden: false},
        ],
      ])
    })
  })
  context("when given a square with value 0", () => {
    it("should change all surrounding array with value of 0", () => {
      const square = {
        isMine: false,
        hasFlag: false,
        value: 0,
        isHidden: true,
      }
      const gameState = [
        [
          {...square, xCoOrd: 0, yCoOrd: 0},
          {...square, xCoOrd: 1, yCoOrd: 0},
          {...square, xCoOrd: 2, yCoOrd: 0},
        ],
        [
          {...square, xCoOrd: 0, yCoOrd: 1},
          {...square, xCoOrd: 1, yCoOrd: 1, value: 1},
          {...square, xCoOrd: 2, yCoOrd: 1, value: 1},
        ],
        [
          {...square, xCoOrd: 0, yCoOrd: 2},
          {...square, xCoOrd: 1, yCoOrd: 2, value: 1},
          {...square, xCoOrd: 2, yCoOrd: 2, value: null, isMine: true},
        ],
      ]
      expect(unhideSquares(gameState, 0, 0)).to.deep.equal([
        [
          {...square, xCoOrd: 0, yCoOrd: 0, isHidden: false},
          {...square, xCoOrd: 1, yCoOrd: 0, isHidden: false},
          {...square, xCoOrd: 2, yCoOrd: 0, isHidden: false},
        ],
        [
          {...square, xCoOrd: 0, yCoOrd: 1, isHidden: false},
          {...square, xCoOrd: 1, yCoOrd: 1, value: 1, isHidden: false},
          {...square, xCoOrd: 2, yCoOrd: 1, value: 1, isHidden: false},
        ],
        [
          {...square, xCoOrd: 0, yCoOrd: 2, isHidden: false},
          {...square, xCoOrd: 1, yCoOrd: 2, value: 1, isHidden: false},
          {...square, xCoOrd: 2, yCoOrd: 2, value: null, isMine: true},
        ],
      ])
    })
  })
  context("when given a square with value 1", () => {
    it("should change only the square provided", () => {
      const square = {
        isMine: false,
        hasFlag: false,
        value: 0,
        isHidden: true,
      }
      const gameState = [
        [
          {...square, xCoOrd: 0, yCoOrd: 0},
          {...square, xCoOrd: 1, yCoOrd: 0},
          {...square, xCoOrd: 2, yCoOrd: 0},
        ],
        [
          {...square, xCoOrd: 0, yCoOrd: 1},
          {...square, xCoOrd: 1, yCoOrd: 1, value: 1},
          {...square, xCoOrd: 2, yCoOrd: 1, value: 1},
        ],
        [
          {...square, xCoOrd: 0, yCoOrd: 2},
          {...square, xCoOrd: 1, yCoOrd: 2, value: 1},
          {...square, xCoOrd: 2, yCoOrd: 2, value: null, isMine: true},
        ],
      ]
      expect(unhideSquares(gameState, 1, 1)).to.deep.equal([
        [
          {...square, xCoOrd: 0, yCoOrd: 0},
          {...square, xCoOrd: 1, yCoOrd: 0},
          {...square, xCoOrd: 2, yCoOrd: 0},
        ],
        [
          {...square, xCoOrd: 0, yCoOrd: 1},
          {...square, xCoOrd: 1, yCoOrd: 1, value: 1, isHidden: false},
          {...square, xCoOrd: 2, yCoOrd: 1, value: 1},
        ],
        [
          {...square, xCoOrd: 0, yCoOrd: 2},
          {...square, xCoOrd: 1, yCoOrd: 2, value: 1},
          {...square, xCoOrd: 2, yCoOrd: 2, value: null, isMine: true},
        ],
      ])
    })
  })
})
