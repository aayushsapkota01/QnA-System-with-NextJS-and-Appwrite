import { Permission } from "node-appwrite";
import { commentCollection, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
  try {
    // Create Collection with Permissions
    await databases.createCollection(db, commentCollection, commentCollection, [
      Permission.create("users"),
      Permission.read("any"), 
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]);
    console.log("Comment Collection Created");

    // Create Attributes for the Collection
    await Promise.all([
      databases.createStringAttribute(
        db,
        commentCollection,
        "content",
        10000,
        true
      ),
      databases.createEnumAttribute(
        db,
        commentCollection,
        "type",
        ["answer", "question"],
        true
      ),
      databases.createStringAttribute(
        db,
        commentCollection,
        "typeId",
        50,
        true
      ),
      databases.createStringAttribute(
        db,
        commentCollection,
        "authorId",
        50,
        true
      ),
    ]);
    console.log("Comment Attributes Created");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in creating comment collection:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}
