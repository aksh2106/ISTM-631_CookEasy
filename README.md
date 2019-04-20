# ISTM-631_CookEasy
Course project for ISTM 631 focusing on UI fundamentals and creating a complete web/mobile application

### Make your changes in both 'app' and 'dist' folder to keep them in sync. Simple solution is changing files in 'app' folder and in the end, copying entire contents of 'app' in 'dist'.

## Backlogs:
1. ~~Sort the login/signup and integrating with the website flow, `login`/ `sign up` space must change to `Hi username` and `logout` buttons on all pages when user logs in(Alok) - cart depends on a user_id so you need to let me know when done.~~
2. ~~Rectify Homepage - active.js, hero slider (please make it all look back to normal) (Akshat) [TIP: /homepage without the #! in the url looks fine, this is some angular shit making it crazy, maybe or maybe not] - you'll have to search how to include external js files when using angular (since angular only considers its own js file, for example: homepage.html considers only homepage.js, no other js files are loaded)~~
3. ~~Check and fix mobile views for login/signup (Alok)~~
4. ~~Fix the missing footer for recipe page. Also, copy script from homepage to make search work with javascript(Varsha)~~
5. ~~Check and fix mobile views for recipe page (Akshat)~~
6. ~~Check and fix mobile views for cart/checkout (Akshat)~~
7. ~~Order confirmation page on clicking ‘Place Order’ on checkout page (Akshat)~~
8. ~~Update database json to have pricePerUnitTable values for all ingredients used in any recipes available on website (Akshat)~~
9. ~~After all the dev, make sure all header, footer and nav bar links point to the correct internal page/external urls (Nupur)~~
10. Enhance cart/checkout as much you could for mobile view (focusing mostly on media query for breadcrumbs at the top) (Varsha)
11. ~~Media query for lens icon to display properly in mobile besides search input box, right now its invisible. Should be a small fix to css. (Akshat)~~
12. ~~Validate and put alt attribute for all images across all pages (Nupur)~~
13. ~~Create a 404 html page (Nupur). Integrate with angular (Akshat)~~
14. ~~Persist searched recipe page till order is confirmed~~

Late priority (maybe after prototype):
1. ~~If a recipe does not exist or if blank search is made by user, the recipe search should return proper message to user. Right now the redirection happens irrespective to recipe page which doesn’t show any content. (Varsha)~~
2. Persist selection of ingredients made by user on recipe page (Varsha)

## About taking a pull
Please make sure to create a branch from the 'Master' branch, clone that branch to your local machine and do your development on that branch. **Do not do anything on Master branch directly to avoid any conflicts.**

## About pushing the code
After you complete your development on your created branch, stage and commit the code, and push it to origin. Then, on Github, create a pull request from your created branch to Master. Look for any conflicts,if not, you are good. Merge it. Otherwise take a pull again, update your branch you're working on (on your local machine) and push again. 

## Word of caution 
As a good practice, before you do any development on your created branch which has gone old by a day or two, please take a pull again so that you have the most updated version of code. Its possible in the meantime someone else would have pushed their code and the Master would have changed, and you would end up with stale code on your local causing conflicts while merging with Master later.

Lastly, Give meaningful names to the branches you create and the commit message you provide while pushing the code.

#### This page is open to anyone who wants to share anything. I felt sharing the above would be beneficial to all of us.



