##Lunch Timer Application
 * Lunch Timer is a web application to coordinate your every day lunch group
   * Vote a restaurant by a configured lunch time
   * Show a vote result when users access to the group after a configured lunch time
 * Admin application for your groups is also provided
   * Manage restaurants for each group
   * Manage facebook users in your group

####Prereq
1. mongodb (see http://www.mongodb.org)
2. nodejs
3. gulp

####Development setup

1. git clone https://github.com/tejitak/lunchapp.git

2. To develop with Facebook auth, modify your hosts file because localhost is not allowed as callback host name. (Currently a domain tejitak.com is configured.)  
e.g. "/private/etc/hosts" for mac  
127.0.0.1       localhost dev.tejitak.com

3. Create a file "apikey.json" under lunchapp dir with the following content  
    {  
      "fb_client_id": "xxxxx",  
      "fb_client_secret": "xxxxx",  
      "gurunabi": "xxxxx",  
      "evernote_consumerKey": "xxxxx",  
      "evernote_consumerSecret": "xxxxx",  
      "evernote_sandbox": true,  
      "yelp_consumer_key" : "xxxxx",  
      "yelp_consumer_secret" : "xxxxx",  
      "yelp_token" : "xxxxx",  
      "yelp_token_secret" : "xxxxx"  
    }  

4. Run "dscacheutil -flushcache" for reloading host file settings.

5. Run "mongod" or "mongod -dbpath ~/db".

6. Run "npm install" (just for once to initialize dev environment)

    Note: If you get an EACCES warning, use sudo chown -R <username> ~/.npm
    See https://github.com/npm/npm/issues/3537 and https://github.com/npm/npm/pull/3506.

7. Run "gulp bower" ("bower install")

8. Run "gulp server" ("npm start") to start server

9. Access to http://dev.tejitak.com:3000/

10. Run "gulp" to run watch task
