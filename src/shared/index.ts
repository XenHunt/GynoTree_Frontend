export interface Person {
  id: number;
  firstname: string;
  lastname: string;
  middlename: string | null;
  ismale: boolean;
  parentsId: Array<number>;
}

export const apiUrl = "api/";
