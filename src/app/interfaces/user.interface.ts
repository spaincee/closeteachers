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
  cover?: string;
  active?: number;
  status?: number;
  relationship?: number;
  average?: number
}
