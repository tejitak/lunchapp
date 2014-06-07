Lunch Timer Application

Setup

1. git clone https://github.com/tejitak/lunchapp.git

2. To develop with Facebook auth, modify your hosts file because localhost is not allowed as callback host name. (Currently a domain tejitak.com is configured.)
e.g. for mac
 /etc/private/hosts
 127.0.0.1       localhost dev.tejitak.com

3. Run "npm install" (just for once to initialize dev environment)

4. Run "grunt"

5. Access to http://dev.tejitak.com:3000/
