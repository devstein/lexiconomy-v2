import { ethers } from "hardhat";
import fetch from "node-fetch";

// Adapted from: https://github.com/chbrown/unidata

/**
Character is a raw representation of a character.
*/
export interface Character {
  /** numeric character code (a non-negative integer) */
  code: number;
  /** character name (ASCII only) */
  name: string;
  /** general category */
  cat: string;
  /** canonical combining class (missing if == 0 "not reordered") */
  comb?: number;
  /** bidirectional category (missing if == 'L' "Letter") */
  bidi?: string;
  /** decomposition type and mapping */
  decompType?: string;
  decomp?: number[];
  /** numeric value of character (may be a fraction, so it not unevaluated) */
  num?: string;
  /** true if character is mirrored in bidirectional text (missing otherwise) */
  bidiMirror?: boolean;
  /** Unicode 1.0 name, if it differs from the current name */
  oldName?: string;
  /** simple uppercase mapping */
  upper?: number;
  /** simple lowercase mapping */
  lower?: number;
  /** simple titlecase mapping */
  title?: number;
}

const HEXADECIMAL = 16;

/**
Snippet from `UnicodeData.txt`:
    00A0;NO-BREAK SPACE;Zs;0;CS;<noBreak> 0020;;;;N;NON-BREAKING SPACE;;;;
    00A1;INVERTED EXCLAMATION MARK;Po;0;ON;;;;;N;;;;;
    00A2;CENT SIGN;Sc;0;ET;;;;;N;;;;;
    00A3;POUND SIGN;Sc;0;ET;;;;;N;;;;;
    00A4;CURRENCY SIGN;Sc;0;ET;;;;;N;;;;;
    00A5;YEN SIGN;Sc;0;ET;;;;;N;;;;;
    00A6;BROKEN BAR;So;0;ON;;;;;N;BROKEN VERTICAL BAR;;;;
If there were a header of column names, it might look like this:
    Code;Name;Cat;Comb;BidiC;Decomp;Num1;Num2;Num3;BidiM;Unicode_1_Name;ISO_Comment;Upper;Lower;Title
There are 14 ;'s per line, and so there are 15 fields per UnicodeDatum:
0.  Code
1.  Name
2.  General_Category
3.  Canonical_Combining_Class
4.  Bidi_Class
5.  <Decomposition_Type> Decomposition_Mapping
6.  Numeric Value if decimal
7.  Numeric Value if only digit
8.  Numeric Value otherwise
9.  Bidi_Mirrored
10. Unicode_1_Name
11. ISO_Comment (always empty)
12. Simple_Uppercase_Mapping
13. Simple_Lowercase_Mapping
14. Simple_Titlecase_Mapping
*/
const parseUnicodeData = (data: string): Character[] =>
  data
    .split(/\n/)
    .filter((line) => line !== "")
    .map((line) => {
      // parse out the raw values
      // the ignored variables are:
      //   [6] => numDecimal
      //   [7] => numDigit
      //   [11] => isoComment
      const [
        code,
        name,
        cat,
        comb,
        bidi,
        decomp,
        ,
        ,
        num,
        bidiMirror,
        oldName,
        ,
        upper,
        lower,
        title,
      ] = line.split(";");
      // initialize the character with required fields
      const character: Character = {
        // code is hexadecimal
        code: parseInt(code, HEXADECIMAL),
        // name is a string
        name: name,
        // cat is a string
        cat: cat,
      };

      // skip comb if it is '0'
      if (comb !== "0") {
        character.comb = parseInt(comb, 10);
      }
      // skip bidi if it is 'L'
      if (bidi !== "L") {
        character.bidi = bidi;
      }
      // skip decomp if it is empty
      if (decomp !== "") {
        const match = decomp.match(/^(?:<(\w+)> )?([0-9A-F ]+)$/);

        if (match) {
          const [, decompType, decompMapping] = match;
          // decompMapping will be a string of hexadecimal character codes,
          // e.g., '0041 0301' for U+00C1 LATIN CAPITAL LETTER A ACUTE
          character.decomp = decompMapping
            .split(" ")
            .map((code) => parseInt(code, HEXADECIMAL));
          if (decompType) {
            character.decompType = decompType;
          }
        }
      }
      // we ignore numDecimal and numDigit (which are always empty if num is empty)
      // skip num if it is empty
      if (num !== "") {
        character.num = num;
      }
      // skip bidiMirror if it is N
      if (bidiMirror !== "N") {
        character.bidiMirror = true;
      }
      // skip oldName if it is empty
      if (oldName !== "") {
        character.oldName = oldName;
      }
      // isoComment is always empty
      // upper, lower, title are one character, if they are anything
      if (upper !== "") {
        character.upper = parseInt(upper, HEXADECIMAL);
      }
      if (lower !== "") {
        character.lower = parseInt(lower, HEXADECIMAL);
      }
      if (title !== "") {
        character.title = parseInt(title, HEXADECIMAL);
      }
      return character;
    });

export const getIllegalCharacterCodepoints = async (): Promise<number[]> => {
  const data = await fetch(
    "https://unicode.org/Public/UNIDATA/UnicodeData.txt"
  ).then((resp) => resp.text());

  const characters = parseUnicodeData(data);

  const whitespaces = characters.filter(({ cat }) => cat[0] === "Z");
  const controls = characters.filter(({ cat }) => cat[0] === "C");
  const uppercase = characters.filter(
    ({ cat }) => cat === "Lu" || cat === "Lt"
  );

  const illegal = [...whitespaces, ...controls, ...uppercase];

  return illegal.map(({ code }) => code);
};
