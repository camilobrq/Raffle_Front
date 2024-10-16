import {UserState} from "./user-state";

export interface UserData {
  userId: string;
  username: string;
  role: string;
  state: UserState;
}
