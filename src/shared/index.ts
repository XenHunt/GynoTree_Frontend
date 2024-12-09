export interface PersonForm {
  firstName: string;
  lastName: string;
  middleName: string | null;
  is_male: boolean;
}

export interface Person extends PersonForm {
  id: number;
  childrenId: Array<number>;
}

export interface Family {
  id: number;
  name: string;
}

export const apiUrl = "http://127.0.0.1:5000/";
