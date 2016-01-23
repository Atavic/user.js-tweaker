# user.js-tweaker for Android/Fiefox Browsers

This will be the official [user.js](https://github.com/pyllyukko/user.js) by [pyllyukko](https://github.com/pyllyukko) and is maintained by [CHEF-KOCH](https://github.com/CHEF-KOCH) and community. 

The project is under [Apache License 2.0](https://github.com/CHEF-KOCH/user.js-tweaker/blob/master/LICENSE).

# Project Goals

* Merge all user.js settings into an addon + automatically sync it in case user.js has changed 
* Sync settings via mozilla sync (low-prio)
* Create profiles for different security levels (strong, medium, low)
* Add per-site (whitelist) support
* Check/remove internal Firefox certificates which aren't needed in 99% of all time to lower attacks
* Add Adroid support
* Harden Firefox in general to not let the dark side win ! :+1:
* ....


# What it can't fix

* Chrome support (I will not add)
* Firefox security related issue which needs to be fixed within the source code
* Already infected installations which are faked or bundled/manipulated with OpenCandy or Trojans 
* Is not an alternative to Tor Firefox Bundle
* Since the addon only loads with Firefox this can not close the hole between new installation of FF and automatically use the hardened settings from the beginning 


# ToDo

- [ ] Write an GUI (currently the changes are only visible within the add-ons options menu) (low-prio)
- [ ] Get an method to restrict the integrated certificates by maniulating the cert8.db file (high-prio)
- [ ] Add translations (low-prio)
- [ ] Add add-on signing, please read [here](https://wiki.mozilla.org/Addons/Extension_Signing) (high-prio)
- [ ] Add an account for addons.mozilla.org (high-prio)
- [ ] Implement profile support (high-prio)
- [ ] Add donate option (if needed) (low-prio)
- [ ] Add _tracking_ option (default opt-out) to grab latest about:config settings e.g. if someone uses Firefox Nighly's and want submit the current changes (low-prio)
- [ ] Add Android support (seperate Android profile because Android needs other security related option which e.g. affects battery/wlan) (high-prio)
- [ ] Fix all reported issue (Issue tracker closed right now because massive ToDo list - sorry!)

