import { IStyle } from './IStyle';

export interface IItemBasic {
  id: string;
  type: string;
  icon: string;
  text?: string;
  style: IStyle;
  pos?: string;
  subItem: IItemBasic[];
}
