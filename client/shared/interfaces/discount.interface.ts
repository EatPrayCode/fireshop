export interface Discount {
  id: string;
  code: string;
  name: string;
  createdOn: number;
  description: string;
  fixed: boolean;
  startingDate: number;
  endingDate: number;
  type: string;
  active: boolean;
  limitedNumber: number;
  value: number;
}
