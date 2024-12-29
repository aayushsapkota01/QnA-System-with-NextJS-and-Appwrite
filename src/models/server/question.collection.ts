import { IndexType, Permission } from "node-appwrite";
import { db, questionCollection } from "../name";
import { databases } from "./config";

export default async function createQuestionCollection() {
  try {
    await databases.createCollection(
      db,
      questionCollection,
      questionCollection,
      [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );
    console.log("Question Collection created successfully.");
  } catch (error: any) {
    console.error("Error creating collection:", error.message);
    return; // Exit if collection creation fails
  }

  try {
    await Promise.all([
      databases.createStringAttribute(
        db,
        questionCollection,
        "title",
        100,
        true
      ),
      databases.createStringAttribute(
        db,
        questionCollection,
        "content",
        10000,
        true
      ),
      databases.createStringAttribute(
        db,
        questionCollection,
        "authorId",
        50,
        true
      ),
      databases.createStringAttribute(
        db,
        questionCollection,
        "tags",
        50,
        true,
        undefined,
        true
      ),
      databases.createStringAttribute(
        db,
        questionCollection,
        "attachmentId",
        50,
        false
      ),
    ]);
    console.log("Attributes added to the Question Collection.");
  } catch (error: any) {
    console.error("Error adding attributes:", error.message);
  }

  try {
    await Promise.all([
      databases.createIndex(
        db,
        questionCollection,
        "title",
        IndexType.Fulltext,
        ["title"]
      ),
      databases.createIndex(
        db,
        questionCollection,
        "content",
        IndexType.Fulltext,
        ["content"]
      ),
      databases.createIndex(db, questionCollection, "authorId", IndexType.Key, [
        "authorId",
      ]),
      databases.createIndex(
        db,
        questionCollection,
        "tags",
        IndexType.Fulltext,
        ["tags"]
      ),
      databases.createIndex(
        db,
        questionCollection,
        "attachmentId",
        IndexType.Key,
        ["attachmentId"]
      ),
    ]);
    console.log("Indexes created for the Question Collection.");
  } catch (error: any) {
    console.error("Error creating indexes:", error.message);
  }
}

