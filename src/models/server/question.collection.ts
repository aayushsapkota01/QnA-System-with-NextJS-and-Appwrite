import { IndexType, Permission } from "node-appwrite";
import { db, questionCollection } from "../name";
import { databases } from "./config";

// Function to create the Question Collection and its schema
export default async function createQuestionCollection() {
  // Create the Question Collection with defined permissions
  await databases.createCollection(db, questionCollection, questionCollection, [
    Permission.read("any"), // Public read access
    Permission.read("users"), // Authenticated user read access
    Permission.create("users"), // Authenticated user create access
    Permission.update("users"), // Authenticated user update access
    Permission.delete("users"), // Authenticated user delete access
  ]);
  console.log("Question Collection created successfully.");

  // Define attributes for the collection
  await Promise.all([
    databases.createStringAttribute(db, questionCollection, "title", 100, true), // Title (required, max 100 characters)
    databases.createStringAttribute(
      db,
      questionCollection,
      "content",
      10000,
      true
    ), // Content (required, max 10,000 characters)
    databases.createStringAttribute(
      db,
      questionCollection,
      "authorId",
      50,
      true
    ), // Author ID (required, max 50 characters)
    databases.createStringAttribute(
      db,
      questionCollection,
      "tags",
      50,
      true,
      undefined,
      true
    ), // Tags (optional, max 50 characters, multiple values)
    databases.createStringAttribute(
      db,
      questionCollection,
      "attachmentId",
      50,
      false
    ), // Attachment ID (optional, max 50 characters)
  ]);
  console.log("Attributes added to the Question Collection.");

  // Create indexes for efficient querying
  await Promise.all([
    databases.createIndex(db, questionCollection, "title", IndexType.Fulltext, [
      "title",
    ]), // Full-text search on title
    databases.createIndex(
      db,
      questionCollection,
      "content",
      IndexType.Fulltext,
      ["content"]
    ), // Full-text search on content
    databases.createIndex(db, questionCollection, "authorId", IndexType.Key, [
      "authorId",
    ]), // Key-based index for author ID
    databases.createIndex(db, questionCollection, "tags", IndexType.Fulltext, [
      "tags",
    ]), // Full-text search on tags
    databases.createIndex(
      db,
      questionCollection,
      "attachmentId",
      IndexType.Key,
      ["attachmentId"]
    ), // Key-based index for attachment ID
  ]);
  console.log("Indexes created for the Question Collection.");
}
