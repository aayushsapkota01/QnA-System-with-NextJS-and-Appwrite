 import { db } from "../name";
 import createAnswerCollection from "./answer.collection";
 import createCommentCollection from "./comment.collection";
 import createQuestionCollection from "./question.collection";
 import createVoteCollection from "./vote.collection";

 import { databases } from "./config";

 export default async function getOrCreateDB() {
   try {
     // Check if the database exists
     await databases.get(db);
     console.log("Database connected");
   } catch (error) {
     // If database doesn't exist, create it
     try {
       await databases.create(db, db);
       console.log("Database created");

       // Create collections only once after the database is created
       await Promise.all([
         createQuestionCollection(),
         createAnswerCollection(),
         createCommentCollection(),
         createVoteCollection(),
       ]);
       console.log("Collections created");
     } catch (error) {
       console.error("Error creating database or collections", error);
     }
   }

   return databases; // Return the database connection (this should be the same instance)
 }
