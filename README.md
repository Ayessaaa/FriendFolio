![sadasd](https://github.com/user-attachments/assets/fc88b134-41f6-4443-b2b3-93e666103b02)
# FriendFolio

### never forget a birthday again
**FriendFolio** is a web application to store profiles for your friends and store polariods (memories) with them. It's like a digital scrapbook where you could create profiles and add their personal details that makes them unique.

You will never forget a thing about them anymore! **Especially birthdayss 😉**

### Demo Video
https://www.youtube.com/watch?v=ZF_nH2YcO6Y

### 🔧 Built Using

**FriendFolio** is built using these technologies:

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="30" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="30" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="30" alt="css3 logo"  />
  <img width="12" />
  <img src="https://www.svgrepo.com/show/374118/tailwind.svg" height="30" alt="tailwind logo"  />
  <img width="12" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png" height="30" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.prod.website-files.com/6320125ace536b6ad148eca3/66502d746f57d299fe0e0c31_Image%201-Express.js.webp" height="30" alt="express logo"  />
  <img width="12" />
  <img src="https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Emblem.jpg" height="30" alt="mongodb logo"  />
  <img width="12" />
  <img src="https://yt3.googleusercontent.com/AC0Ia-7Akfvhnkwy9s4kx2Qt3XFXFYe95SfmEba4pK46t22K0tAnS40R8AAa7_YPkSeu6t5TxA=s900-c-k-c0x00ffffff-no-rj" height="30" alt="cloudinary logo"  />
  <img width="12" />
  <img src="https://raw.githubusercontent.com/pulumi/pulumi-aws-apigateway/main/assets/logo.png" height="30" alt="api gateway logo"  />
  <img width="12" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Lambda_architecture_logo.svg/1200px-Amazon_Lambda_architecture_logo.svg.png" height="30" alt="lambda logo"  />
  <img width="12" />
  <img src="https://boyney123.gallerycdn.vsassets.io/extensions/boyney123/eventbridgelens/0.0.6/1727626671746/Microsoft.VisualStudio.Services.Icons.Default" height="30" alt="eventbridge logo"  />
</div>

## ⚙️ Installation

1. Clone the repository

```
git clone https://github.com/Ayessaaa/FriendFolio
```

2. Go to the directory

```
cd FriendFolio
```

3. Install dependecies

```
npm install
```

5. Create your own cluster on MongoDB Atlas

```
FriendFolio Project -> FriendFolioCluster
```

6. Create a database on that cluster

```
FriendFolio Project -> FriendFolioCluster -> FriendFolioNoDB
```

7. Create your .env file and paste you DBURI, secret, and cloudinary credentials

```
DB_URI=
secret=
CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

8. Start the Nodemon

```
nodemon app
```

## ❕ Features
### Responsive Design
FriendFolio is built to be compatible on both mobile and desktop devices.

### 📧 Friend's Birthday Notification Email
![sdfsdfsdfsd](https://github.com/user-attachments/assets/9ada1cf7-1eb6-424e-8742-96f1d2086ca0)

This email is sent to the users email address

- Sent at around **12am on their local timezone** to remind them about their friends special day. 
- This also the ability to **unsubscribe** to upcoming emails from this friend.

- Intergrated using AWS Lambda, AWS API Gateway, AWS Eventbridge


### 👤 Sign Up and Log In
![asfdsfs](https://github.com/user-attachments/assets/ee713f97-8372-4967-87c1-1709a1f11a1a)

This enables users to create and open their own accounts.

**Session** - This makes the user stay logged in for a while.

**Password hashing** - This makes the password get hashed when going to the database and when comparing it. Makes the authentication process more secure

### 🏠 Home
![grgsd](https://github.com/user-attachments/assets/b4c9889c-be3e-416b-98ec-402b3e525eef)

**Navbar** - This shows menu and pages to explore from.

**View Friends** - This shows a page that lists the friends the user have.

**Add Friends** - This gives the user ability to create a profile for their friends. It prompts user to enter different fields to create the friends profile

**Upcoming Birthdays** - This displays 2 friends birthdays that are coming next, so you won't forget them!

**Polariod Feed** - This shows a feed of you polariods with your friends. This is sorted from the most recent to last.

### 👫 Friends 
![yuisdghf](https://github.com/user-attachments/assets/9ee9f3cb-e581-4f32-a215-11d82b38b4cf)

**Friends** - This shows all of your friends and when clicked, you will be redirected to their profiles. Their zodiac and birthday is also displayed.

**Add Friends** - This will redirect the user to a form that can be filled up to create a new friend profile.

### ➕👫 Add Friend
![huashduas](https://github.com/user-attachments/assets/127beb6b-0da1-46be-9297-318065402b34)

**Choose Profile** - This makes it able to upload a profile picture for you friend

**Fields** - Only name and nickname is required, the rest can be empty.

### 👤 Friend Profile
![yuagsdhbga](https://github.com/user-attachments/assets/e5729cf3-10ea-4e0b-bdf3-56208ecc1421)

**Profile Card** - Shows their picture, nickname, and name. Also shows their birthday and their zodiac sign.

**Personal Details**

**Contact Info** 

**Notes** - Shows custom notes that the user made.

### ➕🖼️ Add Polariod
![usdgf](https://github.com/user-attachments/assets/d7859abc-2b94-4e5b-b155-fe09d85e725c)

**Image** - This image will be displayed on your polariod.

**Date, Title & Body** - Date, title, & body message of your polariod. These fields aren't required and is editable later on.

### 🖼️ Polariod
![ajsgdj](https://github.com/user-attachments/assets/78dc276a-2cb9-4a35-99ed-02bf3721a271)

### 🖼️🖼️ Polariods
![uahd](https://github.com/user-attachments/assets/994d4b7d-6072-4ac5-89f6-55a772ad2013)

### 🔗 Create a Gift Link
![uagsdh](https://github.com/user-attachments/assets/f9b9d9ce-a01b-4f75-8818-48435208ba88)

**Create a Gift Link** - Makes it possible to share your polariods and message to your friends. This will compile all the polariods you too have with your custom message/ greetings and create a custom link that you can share to them and could give as a gift.

### 🎁 Gift Polariods
![hasgd](https://github.com/user-attachments/assets/669c3219-a49e-4a99-87a9-adfd533a46cb)

This link is accessible for everyone, no need for signing up!


## 📚 Resources
I have used ChatGPT to help me from some code and debugging some parts of the project. Additionally, here are some resources that helped me create FriendFolio:
- [Log In, Sign Up](https://blog.logrocket.com/building-simple-login-form-node-js/)
- [Hashing Passwords](https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/)
- [Session Managment](https://dev.to/saint_vandora/how-to-implement-session-management-in-nodejs-applications-5emm)
- [Cloudinary Image Upload](https://dev.to/evansitworld/upload-images-with-nodejs-and-express-to-the-cloud-using-cloudinary-26e4)
- [Image Preview](https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded)
- [Birthday Sort](https://www.peterfisher.me.uk/blog/javascript-sort-by-soonest-date-object/)

Images that are used on the snapshots of the website are from pinterest

## 📝 Contributing

This repo is open for contributions! Just fork the repository, create a new branch and open a pull request.

## ⚖️ License

This project is licensed under the MIT License.
