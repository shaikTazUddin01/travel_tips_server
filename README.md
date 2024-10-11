# <center>Assignment - 06</center>
 **Project Name : Travel Tips & Destination Guides** <br>
 **Live Link : [https://travel-tips-server.vercel.app](https://travel-tips-server.vercel.app)** 

## Features

1. **User Sign up system**
2. **User log in system**
3. **User can create a post**
4. **User can show all post**
5. **User can filter post base on category type**
6. **User can search specific post base on content**
7. **Use can upvote ans downvote any post**
8. **User can comment any post**
9. **User can change his password**
10. **User can forgot his password**
11. **User can verify his account**
11. **Admin can manage user,content and payment history**


## Technology Used

1. **Node.js**
2. **Express.js**
3. **Mongoose**
4. **TypeScript**
5. **Dotenv**
6. **Zod Validation**
7. **Jsonwebtoken**
8. **http-status**




## Instructions on how to run the application locally

1. **Clone or download the repository:**
   - First you clone the repository .
    
   - Or download the repository .

2. **Open the project:**
   - Open the project directory.

3. **Install packages:**
   - Open a command terminal or Git Bash to run the following command to install all necessary packages:
     ```
     npm install
     ```

4. **Set up environment variables:**
   - Create a `.env` file in the root of the project.
   - Add the following environment variables in the `.env` file:
     ```
     DATABASE_URL=mongodb+srv://yourName:userPassword@cluster0.25fgudl.mongodb.net/travel_tips?retryWrites=true&w=majority&appName=Cluster0
     SALTROUND=12
     ACCESS_TOKEN_SECRET=510be8ab9f85a869fe052d77731e37ee9f07d8fc478eaf4d3fa7cf6d9ae64064849ab
     ACCESS_TOKEN_EXPIRESIN=30d
     REFRESH_TOKEN_SECRET=8677d366619496ca62574771c321254bed2703ce46b2255c57d1bfd1dd5e5c0dba04e56de74980e437a1cc02d
     REFRESH_TOKEN_EXPIRESIN=180d
     CLOUDINARY_NAME=yourcloudinaryname
     CLOUDINARY_API_KEY=yourcloudinaryapi
     CLOUDINARY_API_SECRET=yourcloudinarySceret
     STORE_ID=aamarpaytest
     SIGNETURE_KEY=yourSecretKey
     PAYMENT_URL=yourPaymentMethod
     VERIFY_PAYMENT_URL= yourVerifyPaymentUrl

     
     ```
     Replace `username` and `password` with your MongoDB `username` and `password`. <br>
    **`It's Just example create this veriable with your own imformation`**
5. **Run the application:**
   - Open a terminal in the project directory and run the following command to start the project:
     ```
     npm run start
     ```
   - Your project should now be running.