var btvRulesApp = btvApp("btvRulesApp");

btvRulesApp.controller("RulesCtrl", function($scope) {
    $scope.rules = [
        {
            rule: "Keep it PG rated",
            description: "Sexual themes are allowed, but no going into much detail. If you wish to go into further detail, please join our \"Adults only\" chat room #btvBadlands, which is an 18+ room. YOU MUST BE 18 OR OLDER TO JOIN."
        },
        {
            rule: "No racism, sexism, or any other form of discrimination",
            description: "BronyTV follows US Title-VII discrimination policy. This includes any form of discrimination or harassment, at any time. Repeated offenders will be banned, no exceptions. This includes incidences of sexual harassment."
        },
        {
            rule: "No spoilers in Mane Chat",
            description: "We try and keep our chat room spoiler-free as much as possible. So if a clip or episode is released/leaked before its premiere (usually on Saturdays), we would prefer if you take all spoiler discussion to #SpoilerWagonBTV until one day AFTER the new episode/movie originally airs on Discovery Family."
        },
        {
            rule: "Be nice to the streamer",
            description: "We do not have to be here, nor do we have to do any of this. If the streamer (or any mod for that matter) tells you to stop doing something, then STOP. This can earn you a ban if you don't comply."
        },
        {
            rule: "English discussion only in Mane Chat",
            description: "While we do encourage bronies from all over the world to join us, and we do have members of our staff from all over the globe, we don't want to exclude anyone from conversations. So if you must discuss something with another user in a non-English language, please either use Private Messages or create a separate chat room for your discussion."
        },
        {
            rule: "Don't tell someone they are breaking the rules",
            description: "If you find someone breaking the rules, do not yell at them to stop. First wait for a mod to handle the situation. If it doesn't look like a mod has noticed, then inform them that someone is breaking the rules via Private Message. If no mods are on, save the logs (and the hostmask/nick of the user), post them to pastebin.com, and then use this command to let us know about it: /msg memoserv send Oatzmeal [put your link or message here] "
        }
    ];
});
