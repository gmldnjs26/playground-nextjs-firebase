import { IDate } from "./common";

export type IUserProfile = {
  name: string;
  email: string;
  profileIconUrl: string;
  gender: string;
  birthday: IDate;
  isAgreed: boolean;
};

export type IUser = {
  uid: string;
} & IUserProfile;
