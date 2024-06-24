export interface UserDto {
  _id: string;
  email: string;
  passowrd: string;
  roles?: string[];
}
