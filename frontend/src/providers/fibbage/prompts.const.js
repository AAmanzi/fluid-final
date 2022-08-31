const prompts = [
  {
    title: 'faces',
    description:
      'According to a University of Jena study, the people who have the most memorable faces are ____ people.',
    answer: 'ugly',
  },
  {
    title: 'sixth-graders',
    description:
      'In October of 2013, eight sixth-graders from a New York college prep school were hospitalized after someone released ____ in a classroom.',
    answer: 'Axe body spray',
  },
  {
    title: 'office',
    description:
      'ROAD TRIP! When in Port Vila, Vanuatu be sure to check out their post office, which is unusual because it is ____.',
    answer: 'underwater',
  },
  {
    title: 'Punjab',
    description:
      'The Kila Raipur Sports Festival, held annually in Punjab, India, has many odd and dangerous events, including one where the participants lay on the ground and get ____.',
    answer: 'run over by a tractor',
  },
  {
    title: 'steroids',
    description:
      'After an allergic reaction to steroids used to treat asthma, a 28-year-old woman started growing ____ on her head instead of hair.',
    answer: 'fingernails',
  },
  {
    title: 'squirrels',
    description:
      'The city of Olney, Illinois organizes an annual event in order to ____ squirrels.',
    answer: 'count',
  },
  {
    title: 'auto repair',
    description:
      'ROAD TRIP! While in Florence, New Jersey be sure to check out the auto repair shop which, according to its owner, has an operational toilet once owned by ____.',
    answer: 'Hitler',
  },
  {
    title: 'Kickstarter',
    description:
      'A Kickstarter campaign met its $30,000 goal on April 7, 2012 for its shoes designed for ____.',
    answer: 'atheists',
  },
  {
    title: 'Kevin Spacey ',
    description: 'Kevin Spacey’s older brother is a ____ impersonator.',
    answer: 'Rod Stewart',
  },
  {
    title: 'Branson',
    description:
      'Andrew Wilson, a man from Branson, Missouri, legally changed his name to simply ____.',
    answer: 'They',
  },
  {
    title: 'Peter',
    description:
      'Under Peter the Great, noblemen had to pay 100 rubles a year for a ____ license.',
    answer: 'beard',
  },
  {
    title: 'gin',
    description:
      'In the 16th century, gin was referred to as the Mother’s ____.',
    answer: 'Ruin',
  },
  {
    title: 'America',
    description:
      'Amerigo Vespucci, the man for whom America was named, was a ____ dealer.',
    answer: 'pickle',
  },
  {
    title: 'speeding ticket ',
    description:
      'Walter Arnold received the world’s first speeding ticket in 1896 for going ____ miles per hour.',
    answer: '8',
  },
  {
    title: 'drug cartel',
    description:
      'Edgar Valdez Villarreal, a notorious Mexican drug cartel leader, had the not-so-scary nickname “La ____.”',
    answer: 'Barbie',
  },
  {
    title: 'jockey',
    description: 'Frank Hayes is the first jockey to win a race while ____.',
    answer: 'dead',
  },
  {
    title: 'Japan',
    description:
      'Tashirojima is an island off of Japan that is completely overrun by ____.',
    answer: 'cats',
  },
  {
    title: 'Isle of Man ',
    description:
      'The Isle of Man flag depicts three ____ interlinked together.',
    answer: 'legs',
  },
  {
    title: 'Eye Shadow',
    description:
      'Shiro Cosmetics sells an eye shadow called “____ Raking Leaves on a Brisk October Afternoon.”',
    answer: 'Nic Cage',
  },
  {
    title: 'Maryland ',
    description: 'Maryland’s official state sport is ____.',
    answer: 'jousting',
  },
  {
    title: 'Ecuador ',
    description:
      'In 1967, a small town in Ecuador elected an inanimate object mayor. The elected mayor was a ____.',
    answer: 'foot powder',
  },
  {
    title: 'New Hampshire ',
    description:
      'A group known as the “Robin Hooders” in Keene, New Hampshire pay for other people’s ____.',
    answer: 'parking meters',
  },
  {
    title: 'Swedish',
    description:
      'As a way to protest Belarus’ police state, a Swedish group dropped hundreds of ____ from an airplane.',
    answer: 'teddy bears',
  },
  {
    title: 'DUI',
    description:
      'A man in western Pennsylvania got a DUI for having an open can of beer while riding a ____.',
    answer: 'lawn mower',
  },
  {
    title: 'Fear',
    description:
      'Anatidaephobia is the fear that somewhere in the world a ____ is watching you.',
    answer: 'duck',
  },
  {
    title: 'Charles Bukowski ',
    description:
      'Famed American poet Charles Bukowski’s tombstone is engraved with the words “Don’t ____.”',
    answer: 'Try',
  },
  {
    title: 'Illinois ',
    description:
      'A spectator in an Illinois courtroom was sentenced to six months in jail for ____ during a trial.',
    answer: 'yawning',
  },
  {
    title: 'remote controls',
    description:
      'According to a Logitech study, 49% of lost remote controls are found in the couch, while 4% are found in the ____.',
    answer: 'fridge',
  },
  {
    title: 'Smuggle ',
    description:
      'In 2010, Customs officers on the Norway-Sweden border intercepted a truck trying to smuggle 28 tons of ____ from China.',
    answer: 'garlic',
  },
  {
    title: 'Alexander the Great ',
    description: 'Alexander the Great made his men ____ before a battle.',
    answer: 'shave',
  },
  {
    title: '107',
    description:
      'Monroe Isadore, a 107-year-old man from Arkansas, died during a ____.',
    answer: 'shootout',
  },
  {
    title: 'Beetlejuice',
    description:
      'A sequel to Beetlejuice titled Beetlejuice Goes ____ was written but never made.',
    answer: 'Hawaiian',
  },
  {
    title: 'Florida',
    description:
      'An eight-foot-tall ____ washed up ashore a Florida beach in 2011.',
    answer: 'Lego man',
  },
  {
    title: 'Mercury',
    description:
      'Freddie Mercury backed out of a duet with Michael Jackson because Jackson brought a ____ to the recording studio.',
    answer: 'llama',
  },
  {
    title: 'boats',
    description:
      'People in Damariscotta, Maine hold an annual race where they use ____ as boats.',
    answer: 'pumpkins',
  },
  {
    title: 'tombstone',
    description:
      'An Indiana woman sued a church cemetery because they refused to install her late husband’s tombstone shaped like a ____.',
    answer: 'couch',
  },
  {
    title: 'Cruises ',
    description:
      'Jacobite Cruises purchased unusual insurance to protect it from damage caused by ____.',
    answer: 'the Loch Ness Monster',
  },
  {
    title: 'Forest',
    description:
      'Forest Whitaker has three daughters (Sonnet, True and Autumn) and a son named ____.',
    answer: 'Ocean',
  },
  {
    title: 'Stonehenge',
    description:
      'ROAD TRIP! While in Alliance, Nebraska, you can visit the Stonehenge replica made out of ____.',
    answer: 'cars',
  },
  {
    title: 'callus',
    description:
      'A woman in Muncie, Indiana was hospitalized after trying to remove a callus on her foot with a ____.',
    answer: 'shotgun',
  },
  {
    title: 'cockroaches',
    description:
      'A Florida man choked to death on cockroaches he ate while trying to win a ____.',
    answer: 'python',
  },
  {
    title: 'Portugal ',
    description:
      'At the Sao Joao festival in Portugal, you hit people over the head with a ____.',
    answer: 'hammer',
  },
  {
    title: '$25,000',
    description:
      'William Shatner raised $25,000 for Habitat for Humanity by selling his ____.',
    answer: 'kidney stone',
  },
  {
    title: 'Topeka',
    description: 'For one day in 1998, Topeka, Kansas renamed itself ____.',
    answer: 'ToPikachu',
  },
  {
    title: 'Gang',
    description:
      'There was once a fourth member of Kellogg’s Rice Krispies mascot gang. Originally it was Snap, Crackle, Pop and ____.',
    answer: 'Pow',
  },
  {
    title: 'wax',
    description:
      'In 2006, the wax museum Madame Tussaud’s in New York City introduced its first wax ____.',
    answer: 'baby',
  },
  {
    title: 'magician',
    description:
      'On his own website, magician David Blaine once wrote, “The most courageous act a man can do is ____.”',
    answer: 'cry',
  },
  {
    title: 'Josh',
    description: 'The fans of musician Josh Groban are called ____.',
    answer: 'Grobanites',
  },
  {
    title: 'E.T.',
    description:
      'The sound of E.T. walking was made by someone squishing ____.',
    answer: 'Jell-o',
  },
  {
    title: 'Saddam',
    description:
      'In 1980, Saddam Hussein was named an honorary citizen of ____.',
    answer: 'Detroit',
  },
  {
    title: 'Iowa',
    description: 'Britt, Iowa annually crowns a King and Queen ____.',
    answer: 'Hobo',
  },
  {
    title: 'physical ',
    description:
      'The University of Victoria offers a physical education class called The Science of ____.',
    answer: 'Batman',
  },
  {
    title: 'prize',
    description:
      'A 2013 Pakistani game show caused a controversy when their grand prize was a ____.',
    answer: 'baby',
  },
  {
    title: 'voucher',
    description:
      'The Lehigh Valley IronPigs, a minor league baseball team, held a contest where the prize was a voucher for a ____.',
    answer: 'funeral',
  },
  {
    title: 'weapons',
    description:
      'Every year residents in Ivrea, Italy reenact a historical battle of their region, and instead of replica weapons, they use ____.',
    answer: 'oranges',
  },
  {
    title: 'Hash',
    description: 'The mayor of Rabbit Hash, KY is a ____.',
    answer: 'dog',
  },
  {
    title: 'Nigeria',
    description: 'Nigeria’s version of Cookie Monster can’t stop eating ____.',
    answer: 'yams',
  },
  {
    title: 'Tara',
    description:
      'Tara Reid once said, “I make Jessica Simpson look like a ____ scientist.”',
    answer: 'rock',
  },
  {
    title: 'Technology',
    description: 'Advanced Comfort Technology makes waterbeds for ____.',
    answer: 'cows',
  },
  {
    title: 'hanging',
    description:
      'Mexico’s Isla de las Munecas is an attraction known for having hundreds of ____ hanging  in its trees.',
    answer: 'dolls',
  },
  {
    title: 'devil',
    description:
      'El Colacho is a Spanish festival where people dress up like the devil and jump over ____.',
    answer: 'babies',
  },
  {
    title: 'citizenship ',
    description:
      'In 2013, a U.S. Customs and Border Protection Officer was found guilty of granting citizenship in exchange for 200 ____.',
    answer: 'egg rolls',
  },
  {
    title: 'arrested',
    description:
      'A man in L.A. was arrested at a police-sponsored gun buyback when, instead of a gun, he tried to sell the cops a ____.',
    answer: 'pipe bomb',
  },
  {
    title: 'yelling',
    description:
      'A British woman was arrested for hijacking a British ferry and yelling, “____!”',
    answer: 'I’m Jack Sparrow',
  },
  {
    title: 'beer',
    description:
      'In 2013, the Rethink ad agency placed red beer fridges throughout Europe that could only be opened by ____.',
    answer: 'Canadians',
  },
  {
    title: 'income',
    description:
      'According to Forbes, the average income for an “ice cream taster” is $____ a year.',
    answer: '56000',
  },
  {
    title: 'fire',
    description:
      'During a famous fire in 1567, a Norwegian man named Hans Steininger died after tripping over a ____.',
    answer: 'beard',
  },
  {
    title: 'inventor',
    description:
      'The inventor of the laxative Ex-Lax has the unusual name Max ____.',
    answer: 'Kiss',
  },
  {
    title: 'telemarketers',
    description:
      'To make it extremely difficult for telemarketers to pronounce, Tim Price changed his name in 2012 to Tim ____.',
    answer: 'Ppppppppppprice',
  },
  {
    title: 'Gang',
    description:
      'In 1976, boxing legend Muhammad Ali released an educational children’s album titled “Ali and His Gang Vs. Mr. ____.”',
    answer: 'Tooth Decay',
  },
  {
    title: 'Pacific',
    description:
      'The area in the Pacific Ocean where great white sharks congregate every spring is called the White Shark ____.',
    answer: 'Cafe',
  },
  {
    title: 'stress',
    description:
      'As a way to relieve stress for its students, Dalhousie University in 2012 introduced a ____ Room.',
    answer: 'Puppy',
  },
  {
    title: 'prom',
    description:
      'In 2013, two teens from Sequoyah High School near Atlanta, Georgia won $5,000 scholarships for wearing ____ to prom.',
    answer: 'duct tape',
  },
  {
    title: 'last',
    description:
      'Loyola University offers a scholarship to any Catholic students with the last name ____.',
    answer: 'Zolp',
  },
  {
    title: 'dresses',
    description:
      'Cheap Chic Weddings is an annual contest in which participants make wedding dresses out of ____.',
    answer: 'toilet paper',
  },
  {
    title: 'police',
    description:
      'At 2:45 a.m. one day in June 2013, a man in Orlando, Florida was arrested for walking up to a police officer and punching his ____.',
    answer: 'horse',
  },
  {
    title: 'village',
    description:
      'Located near the town of Stanley, there’s a small village in England called No ____.',
    answer: 'Place',
  },
  {
    title: 'Nebraska ',
    description:
      'In 2007, to make a point, Nebraska State Sen. Ernie Chambers filed a frivolous lawsuit against ____.',
    answer: 'God',
  },
  {
    title: 'wrote',
    description:
      'Edwin E. Holmes, a man with very specific interests, wrote the 254-page book “A History of ____.”',
    answer: 'Thimbles',
  },
  {
    title: 'Bone',
    description:
      'Barbara E. Mattick wrote the book, A Guide to Bone ____ of the 19th and Early 20th Centuries.',
    answer: 'Toothbrushes',
  },
  {
    title: 'hip',
    description:
      'Suffering from an extremely rare side effect after getting hip surgery in 2010, a Dutch man has alienated his family because he cannot stop ____.',
    answer: 'laughing',
  },
  {
    title: 'boxing',
    description:
      'Leo Granit Kraft is a world champion in an unusual sport that combines boxing and ____.',
    answer: 'chess',
  },
  {
    title: 'Blake',
    description:
      'CELEBRITY TWEET!   3:20 PM - 9 Nov 12  @blakeshelton, the country singer and judge on The Voice, tweeted, “Just fell down and gashed my hand open while running from ____... Don’t ask.”',
    answer: 'an ostrich',
  },
  {
    title: 'Pepsi',
    description:
      'During the summer of 2007, Pepsi sold a green-tinted cola in Japan called Pepsi Ice ____.',
    answer: 'Cucumber',
  },
  {
    title: 'San Francisco ',
    description:
      'Over the course of 35 years, artist Scott Weaver has built a replica of the city of San Francisco using over 100,000 ____.',
    answer: 'toothpicks',
  },
  {
    title: 'burning ',
    description:
      'On October 24th, 2013 a man in Columbus, Georgia ran into his burning home in order to save his ____.',
    answer: 'beer',
  },
  {
    title: 'vacations',
    description:
      'Unagi Travel is an unusual Japanese travel agency that sends your ____ on vacations.',
    answer: 'stuffed animals',
  },
  {
    title: 'Fighting ',
    description:
      'Scottsdale Community College’s sports teams are oddly named the Fighting ____.',
    answer: 'Artichokes',
  },
  {
    title: 'seizures ',
    description:
      'A neurology professor at Albany Medical College documented in a 1991 medical journal that one of his patients had seizures when she heard ____.',
    answer: 'Mary Hart’s voice',
  },
  {
    title: 'Queens',
    description:
      'Since 2000, a couple in Queens, New York has been living rent-free in a ____ in exchange for taking care of it.',
    answer: 'cemetery',
  },
  {
    title: 'beans',
    description:
      'A man in Wales, UK, is so obsessed with baked beans that in 1991 he legally changed his name to ____.',
    answer: 'Captain Beany',
  },
  {
    title: 'shampoo',
    description:
      'In 1979, Clairol introduced and then almost immediately discontinued the oddly named “Touch of ____” shampoo.',
    answer: 'Yogurt',
  },
  {
    title: 'Bolt',
    description:
      'Because he found Chinese food to be odd, during the 2008 Beijing Olympics, sprinter Usain Bolt said that he ended up eating 1,000 ____.',
    answer: 'McNuggets',
  },
  {
    title: 'Norway',
    description:
      'In an effort to push “slow TV,” Norway had a 12-hour block of programming in 2013 dedicated to ____.',
    answer: 'knitting',
  },
  {
    title: 'record',
    description:
      'With 88 catches, Canadian Aaron Gregg holds the Guinness World Record for ____ juggling.',
    answer: 'chainsaw',
  },
  {
    title: 'Calvary ',
    description:
      'Sponsored by the Calvary Lutheran Church, people in Fort Worth Texas can now attend the unconventional Church-in-a-____.',
    answer: 'Pub',
  },
  {
    title: 'Oh',
    description:
      'Belmont University in Nashville has offered a class called “Oh, Look, a ____.”',
    answer: 'Chicken',
  },
  {
    title: 'ice cream',
    description:
      'Ben and Jerry only started making ice cream because it was too expensive to make ____.',
    answer: 'bagels',
  },
  {
    title: '55,000',
    description:
      'Owning 55,000 of them, Ted Turner has the world’s largest private collection of ____.',
    answer: 'bison',
  },
  {
    title: 'eBay',
    description: 'The first item listed on eBay was a broken ____.',
    answer: 'laser pointer',
  },
  {
    title: 'Santa',
    description:
      'The Dutch version of Santa Claus has a helper named ____ Pete.',
    answer: 'Black',
  },
  {
    title: 'mustache ',
    description:
      'Patented in 1890, U.S. Patent US435748 is for a mustache ____.',
    answer: 'guard',
  },
  {
    title: 'iPod',
    description:
      'From the fine print for the original iPod Shuffle: “Do not ____ iPod Shuffle.”',
    answer: 'eat',
  },
  {
    title: 'hair',
    description:
      'Actual warning on Vidal Sassoon hair dryer: “Do not use while ____.”',
    answer: 'sleeping',
  },
  {
    title: 'Paris',
    description:
      'ROAD TRIP! When visiting Paris, Texas check out their replica of the Eiffel Tower with a giant red ____ on top.',
    answer: 'cowboy hat',
  },
  {
    title: 'Doo',
    description: 'Scooby-Doo’s sister, ____-Doo, is Scrappy-Doo’s mother.',
    answer: 'Ruby',
  },
  {
    title: 'lick ',
    description:
      'In 2012, a 26-year-old man from London went on a mission to lick every ____ in the United Kingdom.',
    answer: 'cathedral',
  },
  {
    title: 'reckoning',
    description:
      'Chosen, Shunned and Reckoning are all books in an unusual series about ____ vampires.',
    answer: 'Amish',
  },
  {
    title: 'food',
    description:
      'There’s a novelty museum in Arlington, Massachusetts that only collects food that has been ____.',
    answer: 'burnt',
  },
  {
    title: 'Buenos Aires',
    description:
      'As a young student in Buenos Aires, Pope Francis worked as a ____.',
    answer: 'bouncer',
  },
  {
    title: 'stabbed ',
    description:
      'In 2012, a teenager from Weslaco, Texas claimed the reason he stabbed his friend was because a ____ made him do it.',
    answer: 'Ouija board',
  },
  {
    title: 'sundial ',
    description:
      'ROAD TRIP! While visiting Roselawn, Indiana, check out the giant sundial made to resemble a ____.',
    answer: 'woman’s leg',
  },
  {
    title: 'founder',
    description:
      'Phil Shaw is the founder of the bizarre sport called Extreme ____.',
    answer: 'Ironing',
  },
  {
    title: 'ear',
    description:
      'On November 25, 2013, a 16-month-old Chinese girl underwent surgery to remove the unusual growth of a ____ in her ear canal.',
    answer: 'dandelion',
  },
  {
    title: 'bad',
    description:
      'CELEBRITY TWEET!    9:43 PM - 1 Oct 13   @MikeTyson tweeted, “I’m a bad ____.”',
    answer: 'bowler',
  },
  {
    title: 'ears',
    description:
      'CELEBRITY TWEET!    2:44 PM - 10 May 11   @THEGaryBusey tweeted, “I wish my ears were ____.”',
    answer: 'cameras',
  },
  {
    title: 'Afghanistan',
    description:
      'In 2002, Bruce Willis sent 12,000 boxes of ____ to U.S. soldiers in Afghanistan.',
    answer: 'Girl Scout cookies',
  },
  {
    title: 'text message',
    description:
      'The first text message ever sent was by Neil Papworth in 1992. He texted, “____.”',
    answer: 'Merry Christmas',
  },
  {
    title: 'release ',
    description:
      'In 2013, a 51-year-old Swedish inmate broke out of prison a day before his scheduled release so he could go see a ____.',
    answer: 'dentist',
  },
  {
    title: '8',
    description: '~~8-0 is the obscure emoticon that stands for ____.',
    answer: 'bad hair day',
  },
  {
    title: 'blowing ',
    description:
      'On November 12, 1970, George Thornton, a highway engineer in Oregon, had the unusual job of blowing up a ____.',
    answer: 'dead whale',
  },
  {
    title: 'hugging',
    description:
      'CELEBRITY TWEET!   1:07 AM - 2 Aug 13   @taylorswift13 Tweeted “Thank you for tonight, Des Moines. I found endless amounts of ____ on my arms from hugging lots of you tonight.”',
    answer: 'glitter',
  },
  {
    title: 'Oscar',
    description:
      'Because of a metal shortage during the war, the Oscar statuettes given out during World War II were made out of ____.',
    answer: 'plaster',
  },
  {
    title: 'petition ',
    description:
      'In 2000, Australia had its largest ever online petition, which called for an end to rising ____ prices.',
    answer: 'beer',
  },
  {
    title: 'pile ',
    description:
      'When Paul Nelson and Andrew Hunter climbed Britain’s highest mountain in 2006, they made an unusual discovery hidden behind a pile of stones. It was a ____.',
    answer: 'piano',
  },
  {
    title: 'warns ',
    description:
      'The App of Icelanders is a phone app that warns you if the person you’re romantically interested in is a ____.',
    answer: 'relative',
  },
  {
    title: 'Stallone',
    description:
      'In school, Sylvester Stallone was voted by his teachers as Most Likely to Go To ____.',
    answer: 'The Electric Chair',
  },
  {
    title: 'crying ',
    description:
      'In 1965, Hasbro made a sad-looking, crying doll dressed in tattered rags called Little Miss ____.',
    answer: 'No Name',
  },
  {
    title: 'Alfred',
    description:
      'The electric chair was invented by a professional ____ named Alfred Southwick.',
    answer: 'dentist',
  },
];

export default prompts;
