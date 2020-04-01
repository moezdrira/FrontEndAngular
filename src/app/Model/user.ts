export class User {
  private _id:number;
  private _username:string;
  private _email:string;
  private _roles:string[];
  private _token:string;

  constructor(id: number, username: string, email: string, roles: string[], token: string) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._roles = roles;
    this._token = token;
  }

  get id(): number {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get roles(): string[] {
    return this._roles;
  }

  set roles(value: string[]) {
    this._roles = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

}
