##Lunch Timer Application
 * Lunch Timer is a web application to coordinate your every day lunch group
   * Vote a restaurant by a configured lunch time
   * Show a vote result when users access to the group after a configured lunch time
 * Admin application for your groups is also provided
   * Manage restaurants for each group
   * Manage facebook users in your group


####Development setup

1. git clone https://github.com/tejitak/lunchapp.git

2. To develop with Facebook auth, modify your hosts file because localhost is not allowed as callback host name. (Currently a domain tejitak.com is configured.)  
e.g. "/private/etc//hosts" for mac  
127.0.0.1       localhost dev.tejitak.com

3. Run "dscacheutil -flushcache" for reloading host file settings.

4. Run "npm install" (just for once to initialize dev environment)
  
    Note: If you get an EACCES warning, use sudo chown -R <username> ~/.npm
    See https://github.com/npm/npm/issues/3537 and https://github.com/npm/npm/pull/3506.

5. Run "grunt server"

6. Access to http://dev.tejitak.com:3000/

7. Run "grunt" to run watch task
