# Challenge
Build a microblog. Users should be able to create an account, sign in, sign up, sign out.

## Technical Requirements
* PostgreSQL
* Prisma
* ExpressJS
* Typescript
* Jest
* Prettier
* ESlint

## Resources
1. `/accounts`
2. `/posts`
3. `/comments`

> You may decide to make these endpoints to have at most two levels.
> Example: `/accounts/{accountId}/posts`

## Mandatory Features

1. A user can create, update, delete or read posts.
   * Users can only update or delete posts that belong to them.
   * Users need to be authenticated to create a post.
   * Users do not need to be authenticated to read a post.
   * Users can create a post as a draft.

2. A user can create, update, delete or read comments.
   * Users can only update or delete comments that belong to them.
   * Users need to be authenticated to create a comment.
   * Users do not need to be authenticated to read a comment.
   * Users can create a comment as a draft.

3. An authenticated user can like/dislike a post.

4. An authenticated user can like/dislike a comment.

5. An authenticated user can update their profile and only their profile.

6. An authenticated user can decide if they want their email to be public.

7. An authenticated user can decide if they want their real name to be public.

8. On creating an account, the user's email needs to be verified by sending an email.

9. Swagger/postman documentation

10. Tests, at least a coverage of 80% 

## Extra Points

1. Add forgot password functionality.
2. Deploy on a platform such as Heroku.
3. Add a role for a moderator.
   * The moderator may delete any post or comment.
   * users may report a comment or post. Moderators should be notified when this happens.