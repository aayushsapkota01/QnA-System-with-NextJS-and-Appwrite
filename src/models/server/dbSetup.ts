import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log("database connected");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log("database created");

      // Create Collections
      await Promise.all([
        createAnswerCollection,
        createCommentCollection,
        createQuestionCollection,
        createVoteCollection,
      ]);
      console.log("Collection created successfully");
      console.log("Database Connected!");
    } catch (error) {
      console.log("Error while creating databases and collection", error);
    }
  }

  return databases;
}
