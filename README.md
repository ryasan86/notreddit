# notreddit

# dev commands

> npm i
> npm run server-dev
> npm run react-dev

# Git Work Flow

Git Workflow:

IMPORTANT - anytime you want to push/pull/rebase/whatever, make sure all the branches you are working with are committed properly beforehand

To push up your changes:

* While on [FEATURE_BRANCH]
* git push origin [FEATURE_BRANCH]
* Make a pull request from [FEATURE_BRANCH] to master
* Whoever accepts pull request should delete the [FEATURE_BRANCH] from github.

Then everyone (after pull request is merged):

* Make sure you are on your master branch
* git pull origin master
* Owner only (OPTIONAL): git branch -d [FEATURE_BRANCH]

Then for non-owner

* git checkout [FEATURE_BRANCH]
* git add and git commit all changes on your feature branch
* git rebase master
* (If there are merge conficts) Fix merge conflicts, then git add . (no need to commit), then git rebase --continue

Want to revert back to a previous commit?

* git reset --hard <6 digit commit hash>
