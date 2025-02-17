export interface User {
  provider: string;
  email: string;
  user_image?: string;
  nickname: string;
  user_memo?: string;
  access_token: string;
  refresh_token: string;
  created_at: Date;
}
