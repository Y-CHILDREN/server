export interface UserDto {
  id: string;
  provider: string;
  email: string;
  user_image?: string;
  nickname: string;
  user_memo?: string;
  created_at: Date;
}
