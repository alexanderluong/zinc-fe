interface Serializable<T> {
  deserialize(input: Object): T;
}

export type ICategory = string;

export class User implements Serializable<User> {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  subscriptions!: Array<ICategory>;
  role!: UserRole;
  createdAt!: Date;
  updatedAt!: Date;

  deserialize(input: any) {
    this.id = input.id;
    this.email = input.email;
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.subscriptions = input.subscriptions;
    this.role = input.role;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    return this;
  }
}

export enum UserRole {
  SUPERUSER = "superuser",
  ADMIN = "admin",
  GEN = "gen"
}

export type PostType = "blog" | "article";

interface Serializable<T> {
  deserialize(input: Object): T;
}

export class Post implements Serializable<Post> {
  id!: string;
  type!: PostType;
  title!: string;
  uri!: string;
  company!: string;
  categories!: Array<ICategory>;
  //approvals: Array<{ id: string }>; don't need this on the frontend
  approvedAt!: string | null;
  //createdAt: string;

  deserialize(input: any) {
    this.id = input.id;
    this.type = input.type;
    this.title = input.title;
    this.uri = input.uri;
    this.company = input.company;
    this.categories = input.categories;
    this.approvedAt = input.approvedAt;
    return this;
  }
}
