
TEST UPDATE OF CHATROOM
Fix Sign In / Sign Up to include BCRYPT and reference to mongo database

Authorization

Data Models

    Users
        userName
        fName
        lName
        email address

    ChatRoom
        activeParticipants --> [User, User]
        chatMessages --> [Message, Message, ...]

    Message
        Author --> User
        body
        timestamp

Routes
    Users
        User Sign Up
        User Log In
        User Log Out?
        Get All Users
        Get Individual User
        Update User

    Chats
        Get Chat
        Add Message to Chat
        Delete Message to Chat

Controllers
    User Routes Logic
    Chat Routes Logic

C R U D

Create
    Create a New User on Signup
    Create a New Chat Room
    Create a New Message

Read
    Get All Users
    Get Individual User Data
    Get Chat (including messages)

Update
    Sign User In
    Sign User Out
    Add Message to Chat
    Edit User Data

Delete
    Delete User
    Delete Message
    Delete/End Chat