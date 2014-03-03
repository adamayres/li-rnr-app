## li-rnr-app

Lithium RnR Application

### Install

1. Install [NodeJs v0.11.10](http://blog.nodejs.org/2013/12/31/node-v0-11-10-unstable/). Scroll down to installer for your OS and click the link.
2. Install git and setup github using these [instructions](https://help.github.com/articles/set-up-git)
3. Add the following to your `~/.bash_profile` or equivalent shell profile:
```bash
alias node='node --harmony'
alias gulp='node --harmony `which gulp`'
ulimit -n 10000
```
4.) After change the `.bash_profile` start a new terminal and run the following commands:

```bash
# Install gulp and yeoman globally
npm install -g gulp yeoman

# Create and go into folder where you want to store the Lithium code
mkdir lia; cd lia

# Clone the LDKn branch
git clone https://github.com/lithiumtech/LDKn.git

# Install npm dependencies in LDKn
cd ldkn; npm install

# Go back to lia folder
cd ..

# Clone the li-rnr-app branch
git clone https://github.com/lithiumtech/li-rnr-app.git

# Install the npm and bower dependencies in li-rnr-app
cd li-rnr-app; npm install; bower install

# Run the app using the default command of gulp
gulp
```