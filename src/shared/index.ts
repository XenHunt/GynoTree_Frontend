export interface Person {
  id: number;
  firstname: string;
  lastname: string;
  middlename: string | null;
  ismale: boolean;
  childrenid: Array<number>;
}

export interface Family {
  id: number;
  name: string;
}

export const apiUrl = "http://127.0.0.1:5000/";
