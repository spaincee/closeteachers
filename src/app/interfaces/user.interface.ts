export interface User {
  id_user?: number;
  username: string;
  fullname: string;
  email: string;
  password: string;
  rol: string;
  image?: string;
  phone?: string;
  location?: string;
  subjects?: string;
  description?: string;
  brief_description?: string;
  price?: number;
  experience?: number;
  active?: number;
  status?: number;
}
