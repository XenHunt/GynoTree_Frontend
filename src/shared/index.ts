export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  is_male: boolean;
  childrenId: Array<number>;
}

export interface Family {
  id: number;
  name: string;
}

export const apiUrl = "http://127.0.0.1:5000/";
