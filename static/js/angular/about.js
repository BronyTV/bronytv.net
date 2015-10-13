var btvAboutApp = angular.module("btvAboutApp", []);

btvAboutApp.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

btvAboutApp.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

btvAboutApp.controller("AboutCtrl", function($scope) {
    /* Please don't hate me. It'll grab from a database at some point, I promise. */
    $scope.staff = {
        executive: {
            title: 'Our Executive Team',
            staff: [
                {
                    name: 'Ashfire',
                    title: 'Site Owner',
                    description: '<p>Hiya~ I\'m Ashfire, the owner and founder of BronyTV! I\'ve been in this fandom since around the beginning of season 2.\
                                  Besides my role here at Btv, I\'m a relatively quiet observer of much of the fandom. (In other words, besides our nice corner here, I lurk everywhere :P).\
                                  I play clarinet, and I\'m rather good at improv! If you\'d like to collab with me, feel free to contact me. I\'m rather shy, but I apparently make up for it by being adorable, or so I\'m told 6.9</p>\
                                  <p>I\'m kind of an otaku, and if you want to talk about currently airing anime, I\'m your girl~ you can see what I\'m watching at <a href="http://myanimelist.com/animelist/Ashfire">myanimelist.com/animelist/Ashfire</a>.\
                                  I love getting fan art! you can check out everything drawn for me, paid for or gifted, (it\'s a handy reference sheet) at <a href="http://imgur.com/a/lmNxS">imgur.com/a/lmNxS</a>.\
                                  My image over there was given to me by Danish Toenails~. It\'s been a while since I\'ve read pony fiction, but I have read a lot. You can check out what I\'ve read at <a href="http://derpy.me/AshieFicList">derpy.me/AshieFicList</a>.\
                                  </p>\
                                  <p>If you\'re looking for me, I\'m usually on our chat, but if I\'m away, you can contact me through Twitter @AshfirePVL. You can also find me on Skype as ashfire2407.\
                                  If email is more your thing, you can try <a href="http://scr.im/btvashfire">this link</a>, or just ask for my email in chat.</p>'
                },
                {
                    name: 'ama',
                    title: 'Web/IRC Admin',
                    description: '<p>Greetings, newfoals. I am ama, your tech guru and lord over all things mechanical. And let me tell you: being able to morph your forehoof into a hand is rather nice.\
                                  Anyway, I\'m the one to talk to / message about problems with the site layout, and with your chat connection.</p>\
                                  <p>Praise Smooze! Nothing can stop the Smooze!</p>'
                },
                {
                    name: 'Oatzmeal',
                    title: 'Head of Streaming',
                    description: '<p>Hello there, I am the wonderful griffin they call Oatzmeal, but just because I like you, you can call me Oatz. I am the head streamer for BronyTV, so if any of you watch the new episode here, you\'re watching it off of my computer.\
                                  The computer, which I built by the way, has an Intel i5-2500k CPU, an EVGA GeForce 970 SSC Graphics card, 8 GB of RAM, and a SSD with a few terabytes of hard drive storage.</p>\
                                  <p>I started watching MLP either at the end of S1 or between S1 and S2 (don\'t remember which) and I first found out about the fandom a few episodes into season 2, and joined BTV back when it was still a synchtube channel about a week after that.\
                                  Speaking of synchtube, that\'s how I got this name! When I first joined the chat on synchtube the first thing that played was "Oatmeal?! Are you crazy?!" so my name for a while was "OatzmealUCrazy"\
                                  and when we switched over to our own website I just changed it to Oatzmeal.</p>\
                                  <p>If you have any other questions for me or regarding the stream itself, just email me! (The wonderful picture was drawn by our very own BumbleSweet, give her all the praises.)</p>'
                },
                {
                    name: 'Dusk',
                    title: 'Queen of Butts',
                    description: '<p>Hello there, I\'m Dusk! You may have seen me around Ponyville Live doing various thing and helping people in general. I was a Nuclear Engineer for the U.S. Navy and I happen to know how to manage a server.</p>\
                                  <p>I try to be a kind person. If you have any problems I\'ll do my best to help you out in any way that I can! Please be patient with me, I\'m going through a tough time at the moment.</p>'
                }
            ]
        },
        stream: {
            title: 'Our Awesome Stream-Team',
            staff: [
                {
                    name: 'Lightning Ferron',
                    title: '',
                    description: 'How did you get into my lab!... Wait a minute, you\'re new here, aren\'t you? Well then; Hi there, my name is Lightning and you came at the perfect time; I was running out of test subj-I mean friends!\
                                  Yes, let\'s go with that. I\'m a mod around here who makes sure you all stay in line and behave yourself, and I seriously enjoy the brony community and love to play video games and have fun...\
                                  now if you follow me I\'ll show you to your ca-I mean chat room that isn\'t conveniently filled with hungry zombie ponies.'
                },
                {
                    name: 'Mirality',
                    title: '',
                    description: '<p>I live In The Future&trade; (aka New Zealand) so you\'ll usually only see me at weekends, but I try to make up for it by streaming ridiculous amounts of Random Pony, especially during the season (fortunately I don\'t have a Life&trade;).\
                                  I\'m a bit quiet and don\'t say much (which frequently astonishes me that I ended up hosting Social Night as well), but I try to keep the videos entertaining at least.</p>\
                                  <p>I\'ve hung around BronyTV since I became a brony in January 2012, but only became a mod and streamer (somewhat by accident) in December. I\'m a software developer by trade and gamer &amp; grammar nazi by avocation,\
                                  and probably older than everyone else here. :)</p>'
                },
                {
                    name: 'Jolly',
                    title: '',
                    description: 'Well greetings fillies and colts, I\'m JollyOldCinema but just call me Jolly or "that british guy who says words and expects people to believe them".\
                    To be perfectly honest, I am kinda crazy and that carries over to my stream where I give behind the scenes looks into upcoming videos in Source Filmmaker along with providing witty and comedic commentary accompanied by some of the weirdest and best games.\
                    You\'ll see me and my crew over on "Off-Scripted"'
                }
            ]
        },
        tech: {
            title: 'Our Tech Gurus',
            staff: [
                {
                    name: 'catnickfl',
                    title: '',
                    description: 'Hello, I\'m catnickfl, most call me cat. I\'ve been a brony since late July of 2012. I\'m training as an assistant tech by the all powerful ama. (I have a shrine dedicated to him in my closet. All hail the glorious tech god!)\
                                  I am a person who is generally open minded and I come on here to make friends, which means I tend to not want to fight with others. I am ALWAYS up for new friendships.\
                                  I\'m on most of the time in the afternoons and almost all day on the weekends. So if you need someone, I\'ll most likely be there for you~.\
                                  I hope that I\'ll be good friends with you all for the foreseeable future and that as long as bronies exist that we will brony on~.<'
                },
                {
                    name: 'Cuddles',
                    title: '',
                    description: 'I\'m the guy behind most of the old website design. Wanna sh*%ttalk me? Log into the IRC and I\'ll be there. Otherwise, if you wanna just throw out some suggestions, talk to me on the IRC as well.'
                },
                {
                    name: 'AppleDash',
                    title: '',
                    description: 'Hey there, I\'m AppleDash. For the record, I hate the ship; I picked this name years ago before I knew what shipping was, and I never bothered to change it because that\'s what everybody knows me by nowadays.\
                                  I\'m a hobbyist programmer and systems administrator. There\'s not too much to say about me other than that! If you want to know anything, just ask!'
                }
            ]
        },
        general: {
            title: 'General mods and other cool peeps',
            staff: [
                {
                    name: 'Delsin7Pony',
                    title: '',
                    description: 'Hey there everypony, I\'m Delsin7Pony, but you can call me Delly for short. I\'m the resident purveyor of oddities and strange humor. Aside from being a unicorn, I\'m a bit of an artist and make custom natural jewellery,\
                    a fiddler of GIMP and Irfanview image programs, and creative writer extraordinare. Rarity complex ho! That and I play vidya games... a lot. Also I\'m a mod here at BronyTV &mdash; not quite sure how that happened.\
                    You can find me haunting mane chat and badlands if you need me, but I tend to be online at odd times. Boops for everypony!'
                },
                {
                    name: 'Ditznata',
                    title: '',
                    description: '<p>Hi there, I\'m Ditznata (or Ditzy for short) and I\'m the resident Wet-mane. I also go by the names TheGreatAndPowerfulDitzy and WubsyTheChangeling. I’m currently in college trying to work my way to a Ph.D in Psychology, so I can become a professional counselor.</p>\
                                  <p>I tend to be fairly friendly... Except for on my bad days, which I\'m sorry for in advance, and... Oh yeah, I\'m usually mean to Aris, but we can get along if we REALLY have to.\
                                  My favorite Ponies are Derpy, Fluttershy, and Luna, and my favorite villains are all of them except for Sombra.</p>\
                                  <p>ANYWAY, my mane project that I help with is Twitch After Dark, which you should definitely check out (during the show season). Other than that, um... yeah... PONIES! :D</p>'
                },
                {
                    name: 'Envirotech',
                    title: '',
                    description: 'Greetings, Envirotech (Envy) here! Canadian, Brony, Rush fan, completely bonkers 6_9. I\'ve been hanging around BTV since I first discovered all things pony mid January 2012, became a mod just days before 2013.\
                    Queen Molestia and I have hung around Badlands long enough that I\'m sub-mod in there, and I guess being 28 never hurts as well. Always around for the mareathon, usually in chat as many nights as possible in between.\
                    Oh, and check out my <a href="http://www.youtube.com/user/Envirotech">videos</a>.',
                },
                {
                    name: 'Twitchy',
                    title: '',
                    description: '<p>Twitchy is an odd fellow. Quite often he can be found around BTV, trolling random people and just generally having fun. In this sense he is the resident Tara Strong.\
                                  He is also the resident Trixie Fanatic and one of his life goals is to meet with Sethisto and challenge him to a Trixie Off (No one knows what that means…)</p>\
                                  <p>Twitchy may not be the brightest Pegasus in the world but he seems to get by just fine. Though Twitchy almost always wears a pair of goggles, he has been spotted without them, showing off his blue eyes.\
                                  He also sports a bandana and a goofy grin most of the time. He also claims to be Half-Demon pony (since his ears curve like horns), but we\'re not sure how that works, so we just humor him.\
                                  He currently serves as host of Twitchy after Dark.</p>\
                                  <p>Twitchy is also somewhat the self-appointed Chief of "Keeping the Mane Chat Spoiler Free". He even opened up a side chat just for Spoilers, called the &#35;SpoilerCloudBTV.</p>'
                }
            ]
        }
    };

    $scope.imgName = function(name) {
        return name.replace(" ", "_") + ".png";
    };
});