/* Personal library — tri-state (want-to-try / tried / favorite) + private note pattern, the
   strongest version in the family (Ramen). Local-only, no account, no social features, per the
   master spec's explicit "learn from the Ramen simplification" instruction. */

export type MyNoodlesState = 'want-to-try' | 'tried' | 'favorite';

export interface MyNoodlesEntry {
  dishId: string;
  states: MyNoodlesState[];
  note?: string;
  savedAt: string; // ISO timestamp
}
