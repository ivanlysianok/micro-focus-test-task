# Angular 14 - Post management application
![Alt text](/frontend/src/assets/images/cover.png?raw=true "Home page")

### Demo

Checkout demo video to see how the application works: https://www.youtube.com/watch?v=FwYA321cbVw&ab_channel=IvanLysianok

### Overview

The main task was to create the web application for managing user posts which would have following features:
- [X] Authentication
- [X] Grid with pagination that displays the users and posts
- [X] Operations with posts - Create, Read, Update, Delete
- [X] Notifications and Modal dialogs for better UX
- [X] Error handling

This application is devided in to 3 main parts (Modules)
1. Login page - Providing user authentication here
2. Home page - Grid with all avalible user posts. 
3. Post page - Page where user can find out some existing post and update or delete them. 
Also user can create the new post there.

Data for this app are provided by JSON placeholder

1. Users - https://jsonplaceholder.typicode.com/users
2. Posts - https://jsonplaceholder.typicode.com/posts

### How to run locally

```
1. Clone repository
$ git clone https://github.com/ivanlysianok/post-management.git

2. Go into front-end folder
$ cd frontend

3. Instal npm packages
$ npm install

4. Run application
$ ng serve
```

### Technologies

- [X] Angular 14.2.10
- [X] Angular material 12.2.13
- [X] Bootstrap 5.2.2
- [X] Node 16.13.1
