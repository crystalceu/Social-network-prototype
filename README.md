# Social-network-prototype

- [ Description. ](#desc)
- [ All Posts. ](#allposts)
- [ Following. ](#following)
- [ Account. ](#account)
- [ Settings. ](#settings)
- [ Register. ](#register)
- [ Log In. ](#login)

<a name="desc"></a>
## Description

The proposed pet project is a Twitter-like platform. Users can log in using existing accounts, log out, or create new ones. Once logged in, they have the ability to create, edit and delete their own posts, as well as leave a like. The platform also includes a feature to follow and unfollow other users, allowing users to customize their feed.

In addition to these features, users can personalize their profiles by changing their profile picture, password, username, email, bio, and location. The platform consists of three main pages: "All Posts" for a comprehensive view of all users' content, "Following" for a feed of preferred content from followed users, and "Authorized User Page" to view the user's posts, account information, and access account settings. These functionalities aim to deliver an engaging and customizable experience, akin to Twitter.


<a name="allposts"></a>
## All Posts

The page displays a comprehensive collection of posts contributed by all users. The implementation utilizes Django Paginator, the Waypoints library, and the Infinity shortcut script from it to enable infinite scrolling. Within the post div, usernames and user profile pictures are hyperlinked to their respective user pages. If a post belongs to the currently logged-in user, a kebab menu will be presented, offering options to edit or delete the post.

![screencapture-social1network1prototype-pythonanywhere-2023-06-28-22_01_43](https://github.com/crystalceu/social-network-prototype/assets/74397218/dad0e5d8-de57-4f01-be75-2386d74e56fc)


<a name="following"></a>
## Following

The "Following" page displays all the posts belonging to the users that the authorized user is currently following.

![screencapture-social1network1prototype-pythonanywhere-2023-06-27-22_18_40](https://github.com/crystalceu/social-network-prototype/assets/74397218/67ea7a1e-a38a-4259-9718-29c6532e71dc)


<a name="account"></a>
## Account

sometext

![screencapture-social1network1prototype-pythonanywhere-account-crystalceu-2023-06-27-22_36_18](https://github.com/crystalceu/social-network-prototype/assets/74397218/612fba48-6acf-45dc-9916-768e1f41ae6f)

sometext

![screencapture-social1network1prototype-pythonanywhere-account-punctualhedgehog-2023-06-27-22_39_00](https://github.com/crystalceu/social-network-prototype/assets/74397218/ca499652-811a-4a41-b62d-0d7cdf2af250)


<a name="settings"></a>
## Settings

The account settings provide logged-in users with the ability to update their user profile picture, modify their username, edit their biography, specify their location, manage their email address, and change their password.

![screencapture-social1network1prototype-pythonanywhere-settings-2023-06-27-23_06_48](https://github.com/crystalceu/social-network-prototype/assets/74397218/a7831821-3787-44ae-8a5c-244c25dcdea7)


<a name="register"></a>
## Register

A registration form is provided for users to create a new account by entering their desired username, email address, and password.

![screencapture-social1network1prototype-pythonanywhere-register-2023-06-28-21_07_04](https://github.com/crystalceu/social-network-prototype/assets/74397218/5c251a3d-5f59-464b-a323-f29861f21d14)


<a name="login"></a>
## Log In

A login form is available for users to authenticate themselves using their username and password.

![screencapture-social1network1prototype-pythonanywhere-login-2023-06-28-21_07_15](https://github.com/crystalceu/social-network-prototype/assets/74397218/f6a5d0fb-9814-49a5-b53d-4fd4c79128e8)
