import env from "@/app/env";

import { Avatars, Client, Databases, Storage, Users } from "node-appwrite";

const client = new Client();

client
  .setEndpoint(env.appewrite.endpoint) // Your API Endpoint
  .setProject(env.appewrite.projectId) // Your project ID
    .setKey(env.appewrite.apikey); // Your secret API key
  
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client)

export { client, databases, avatars, storage, users };

