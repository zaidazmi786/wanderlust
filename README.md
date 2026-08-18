# 🌍 Wanderlust

Wanderlust is a full-stack web application inspired by modern travel and property-listing platforms. It allows users to explore accommodation listings, create and manage their own listings, and share reviews and ratings.

## 🚀 Features

* 🔐 User Authentication & Authorization
* 🏠 Create, Read, Update & Delete Listings
* 🖼️ Image Upload & Cloud Storage
* ⭐ Reviews & Ratings
* 👤 User-specific listing management
* ✅ Joi-based form validation
* ⚠️ Error handling with custom Express middleware
* 📱 Responsive UI using Bootstrap
* 🔔 Flash messages for user feedback
* 🗺️ Location-based listing information
* 🔄 RESTful routing
* 🛡️ Protected routes for authenticated users

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* EJS
* Bootstrap 5

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Validation

* Passport.js
* Passport Local Mongoose
* Joi
* Express Session
* Connect Mongo

### Image Storage

* Cloudinary
* Multer
* Multer Storage Cloudinary

### Other Tools

* EJS Mate
* Method Override
* Connect Flash

## 📂 Project Structure

```text
Wanderlust/
│
├── controllers/
│   ├── listings.js
│   └── reviews.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── public/
│   ├── css/
│   └── js/
│
├── utility/
│   ├── ExpressError.js
│   └── wrapasync.js
│
├── schema.js
├── app.js
├── package.json
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/zaidazmi786/wanderlust.git
```

### 2. Navigate to the project

```bash
cd wanderlust
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 5. Start the application

For development:

```bash
node app.js
```

Or, if you have a development script configured:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:8080
```

## 🔑 Authentication

Wanderlust uses Passport.js with Passport Local Mongoose for authentication.

Users can:

* Sign up
* Log in
* Log out
* Create listings
* Edit their own listings
* Delete their own listings
* Add reviews to listings

Protected routes ensure that users can only perform authorized actions.

## 🏡 Listings

Each listing can contain:

* Title
* Description
* Price
* Location
* Country
* Image
* Owner
* Reviews

Users can create new listings and manage listings that belong to them.

## ⭐ Reviews & Ratings

Users can leave reviews and ratings on listings.

Ratings are restricted to:

```text
1 - 5 stars
```

Review data is validated before being stored in MongoDB.

## ☁️ Image Upload

Images are uploaded using **Multer** and stored using **Cloudinary**.

This keeps image storage separate from the application server and makes images easier to manage and serve.

## 🧪 Validation

The application uses **Joi** for server-side validation.

Validation is applied to:

* Listing data
* Review data
* User-related input

Invalid data is rejected before it is saved to the database.

## 🛡️ Error Handling

Wanderlust includes custom error handling using:

* Custom `ExpressError` class
* Async wrapper middleware
* Express error-handling middleware
* Flash messages for user-friendly feedback

## 🔄 CRUD Operations

The project implements complete CRUD functionality:

| Operation | Description          |
| --------- | -------------------- |
| Create    | Add a new listing    |
| Read      | View listings        |
| Update    | Edit listing details |
| Delete    | Remove a listing     |

## 📸 Screenshots

You can add screenshots of your project here:

```markdown
![Home Page](screenshots/home.png)

![Listing Page](screenshots/listing.png)

![Create Listing](screenshots/create-listing.png)

![Reviews](screenshots/reviews.png)
```

## 🌐 Deployment

The application can be deployed using platforms such as Render or similar Node.js hosting services.

Before deployment, make sure all required environment variables are configured on the hosting platform.

## 📚 What I Learned

While building Wanderlust, I gained practical experience with:

* Node.js and Express.js
* MongoDB and Mongoose
* MVC architecture
* RESTful APIs
* Authentication and authorization
* CRUD operations
* Middleware
* Joi validation
* Cloudinary image storage
* EJS templating
* Bootstrap
* Error handling
* Git and GitHub
* Deployment

## 🔮 Future Improvements

Some features that can be added in the future:

* 🔎 Advanced search and filtering
* 🗺️ Interactive maps
* ❤️ Wishlist functionality
* 💳 Online booking and payment
* 📧 Email notifications
* 📊 Admin dashboard
* 📱 Improved mobile experience
* 💬 User messaging system

## 👨‍💻 Author

**Zaid Azmi**

Full-Stack / MERN Stack Developer

### GitHub

```text
https://github.com/zaidazmi786
```

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

**Made with ❤️ using Node.js, Express.js, MongoDB and EJS.**
