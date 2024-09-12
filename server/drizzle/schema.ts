import {
  pgTable,
  serial,
  uuid,
  varchar,
  text,
  integer,
  pgEnum,
  index,
  uniqueIndex,
  boolean,
  real,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 40 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  passwordHash: varchar("passwordHash").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  senderId: uuid("senderId")
    .references(() => users.id)
    .notNull(),
  recieverId: uuid("recieverId")
    .references(() => users.id)
    .notNull(),
  messageText: text("messageText").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const groupChats = pgTable("groupChats", {
  id: uuid("id").primaryKey().defaultRandom(),
  groupName: varchar("groupName", { length: 100 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const groupMembers = pgTable("groupMembers", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  groupId: uuid("groupId")
    .references(() => groupChats.id)
    .notNull(),
  joinedAt: timestamp("joinedAt").defaultNow(),
});

export const groupMessages = pgTable("group_messages", {
  id: serial("id").primaryKey(),
  groupId: uuid("groupId")
    .references(() => groupChats.id)
    .notNull(),
  senderId: uuid("senderId")
    .references(() => users.id)
    .notNull(),
  messageText: text("messageText").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

/*
export const PostTable = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  userId: uuid("userId")
    .references(() => UserTable.id)
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  published: boolean("published").notNull().default(false),
});

export const CommentTable = pgTable("comment", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  userId: uuid("userId")
    .references(() => UserTable.id)
    .notNull(),
  postId: uuid("postId")
    .references(() => PostTable.id)
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});


export const UserRole = pgEnum("userRole", ["ADMIN", "BASIC"]);

export const UserTable = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(), //random uuid
    // id2: serial("id2").primaryKey() auto incrementing id
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    role: UserRole("userRole").default("BASIC").notNull(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(table.email),
    };
  }
);

export const UserPreferencesTable = pgTable("userPreferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  emailUpdates: boolean("emailUpdates").notNull().default(false),
  userId: uuid("userId")
    .references(() => UserTable.id)
    .notNull(), //points to userid table foreign key
});

export const PostTable = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  averageRating: real("averageRating").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  authorId: uuid("authorId")
    .references(() => UserTable.id)
    .notNull(),
});

export const CategoryTable = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const PostCategoryTable = pgTable(
  "postCategory",
  {
    postId: uuid("postId")
      .references(() => PostTable.id)
      .notNull(),
    categoryId: uuid("categoryId")
      .references(() => CategoryTable.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    };
  }
);
*/
