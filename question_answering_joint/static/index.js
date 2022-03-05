// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//
//   Organisation: Broad AI Lab, University of Auckland
//   Author: Ziqi Wang
//   Date: 2021-05-12
//
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

(function() {

    const EXAMPLES = [
        {
            question: "Were Scott Derrickson and Ed Wood of the same nationality?",
            context: "Ed Wood (film) \t Ed Wood is a 1994 American biographical period comedy-drama film directed and produced by Tim Burton, and starring Johnny Depp as cult filmmaker Ed Wood.  The film concerns the period in Wood's life when he made his best-known films as well as his relationship with actor Bela Lugosi, played by Martin Landau.  Sarah Jessica Parker, Patricia Arquette, Jeffrey Jones, Lisa Marie, and Bill Murray are among the supporting cast.\n\n" +
                     "Scott Derrickson \t Scott Derrickson (born July 16, 1966) is an American director, screenwriter and producer.  He lives in Los Angeles, California.  He is best known for directing horror films such as 'Sinister', 'The Exorcism of Emily Rose', and 'Deliver Us From Evil', as well as the 2016 Marvel Cinematic Universe installment, 'Doctor Strange'.\n\n" +
                     "Woodson, Arkansas \t Woodson is a census-designated place (CDP) in Pulaski County, Arkansas, in the United States.  Its population was 403 at the 2010 census.  It is part of the Little Rock–North Little Rock–Conway Metropolitan Statistical Area.  Woodson and its accompanying Woodson Lake and Wood Hollow are the namesake for Ed Wood Sr., a prominent plantation owner, trader, and businessman at the turn of the 20th century.  Woodson is adjacent to the Wood Plantation, the largest of the plantations own by Ed Wood Sr.\n\n" +
                     "Tyler Bates \t Tyler Bates (born June 5, 1965) is an American musician, music producer, and composer for films, television, and video games.  Much of his work is in the action and horror film genres, with films like \"Dawn of the Dead, 300, Sucker Punch,\" and \"John Wick.\"  He has collaborated with directors like Zack Snyder, Rob Zombie, Neil Marshall, William Friedkin, Scott Derrickson, and James Gunn.  With Gunn, he has scored every one of the director's films; including \"Guardians of the Galaxy\", which became one of the highest grossing domestic movies of 2014, and its 2017 sequel.  In addition, he is also the lead guitarist of the American rock band Marilyn Manson, and produced its albums \"The Pale Emperor\" and \"Heaven Upside Down\".\n\n" +
                     "Ed Wood \t Edward Davis Wood Jr. (October 10, 1924 – December 10, 1978) was an American filmmaker, actor, writer, producer, and director.\n\n" +
                     "Deliver Us from Evil (2014 film) \t Deliver Us from Evil is a 2014 American supernatural horror film directed by Scott Derrickson and produced by Jerry Bruckheimer.  The film is officially based on a 2001 non-fiction book entitled \"Beware the Night\" by Ralph Sarchie and Lisa Collier Cool, and its marketing campaign highlighted that it was \"inspired by actual accounts\".  The film stars Eric Bana, Édgar Ramírez, Sean Harris, Olivia Munn, and Joel McHale in the main roles and was released on July 2, 2014.\n\n" +
                     "Adam Collis \t Adam Collis is an American filmmaker and actor.  He attended the Duke University from 1986 to 1990 and the University of California, Los Angeles from 2007 to 2010.  He also studied cinema at the University of Southern California from 1991 to 1997.  Collis first work was the assistant director for the Scott Derrickson's short \"Love in the Ruins\" (1995).  In 1998, he played \"Crankshaft\" in Eric Koyanagi's \"Hundred Percent\".\n\n" +
                     "Sinister (film) \t Sinister is a 2012 supernatural horror film directed by Scott Derrickson and written by Derrickson and C. Robert Cargill.  It stars Ethan Hawke as fictional true-crime writer Ellison Oswalt who discovers a box of home movies in his attic that puts his family in danger.\n\n" +
                     "Conrad Brooks \t Conrad Brooks (born Conrad Biedrzycki on January 3, 1931 in Baltimore, Maryland) is an American actor.  He moved to Hollywood, California in 1948 to pursue a career in acting.  He got his start in movies appearing in Ed Wood films such as \"Plan 9 from Outer Space\", \"Glen or Glenda\", and \"Jail Bait.\"  He took a break from acting during the 1960s and 1970s but due to the ongoing interest in the films of Ed Wood, he reemerged in the 1980s and has become a prolific actor.  He also has since gone on to write, produce and direct several films.\n\n" +
                     "Doctor Strange (2016 film) \t Doctor Strange is a 2016 American superhero film based on the Marvel Comics character of the same name, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures.  It is the fourteenth film of the Marvel Cinematic Universe (MCU).  The film was directed by Scott Derrickson, who wrote it with Jon Spaihts and C. Robert Cargill, and stars Benedict Cumberbatch as Stephen Strange, along with Chiwetel Ejiofor, Rachel McAdams, Benedict Wong, Michael Stuhlbarg, Benjamin Bratt, Scott Adkins, Mads Mikkelsen, and Tilda Swinton.  In \"Doctor Strange\", surgeon Strange learns the mystic arts after a career-ending car accident.\n\n",
            answer: "yes",
            supports: ["Scott Derrickson (born July 16, 1966) is an American director, screenwriter and producer.",
                       "Edward Davis Wood Jr. (October 10, 1924 – December 10, 1978) was an American filmmaker, actor, writer, producer, and director."]
        },
        {
            question: 'Are the Laleli Mosque and Esma Sultan Mansion located in the same neighborhood?',
            context:"Esma Sultan (daughter of Abdülaziz) \t Esma Sultan (21 March 1873 – 7 May 1899) was an Ottoman princess, the daughter of Sultan Abdülaziz and his wife Gevheri Kadın, herself the daughter of Salih Bey Svatnba.  She was the half-sister of Abdülmecid II, the last Caliph of the Muslim world.\n\n" +
                    "Djamaâ el Kebir \t The Great Mosque of Algiers (Arabic: الجامع الكبير\u200e \u200e , \"Jemaa Kebir\") or \"Djama'a al-Kebir\" (meaning Great Mosque) is a mosque in Algiers, Algeria, located very close to Algiers Harbor.  An inscription on the minbar (منبر) or the pulpit testifies to fact that the mosque was built in 1097.  It is also known by several other names such as Grand Mosque d'Alger, Djamaa al-Kebir, El Kebir Mosque and Jami Masjid.  It is one of the few remaining examples of Almoravid architecture.  It is the oldest mosque in Algiers and is said to be the oldest mosque in Algeria after Sidi Okba Mosque.  It was built under sultan Ali ibn Yusuf.  Its minaret dates from 1332 (1324 in some sources) and was built by the Ziyyanid Sultan of Tlemcen.  The gallery at the outside of the mosque was built in 1840.  Its construction was a consequence of a complete reconstruction of the street by the French.\n\n" +
                    "Küçük Hüseyin Pasha \t Küçük Hüseyin Pasha (1757 – 7 December 1803), also known as Tayazade Damat Küçük Hüseyin Pasha, was an Ottoman statesman and admiral who was Kapudan Pasha (Grand Admiral of the Ottoman Navy) from 11 March 1792 to 7 December 1803.  He was a \"damat\" (\"bridegroom\") to the Ottoman dynasty after he married an Ottoman princess, Esma Sultan.\n\n" +
                    "Esma Sultan (daughter of Abdul Hamid I) \t Esma Sultan (17 July 1778 – 4 June 1848) was an Ottoman princess, daughter of Sultan Abdul Hamid I, sister of Sultan Mustafa IV and Sultan Mahmud II.  She was the adoptive mother of Bezmiâlem Sultan and Rahime Perestu Sultan.\n\n" +
                    "Sultan Ahmed Mosque \t The Sultan Ahmed Mosque or Sultan Ahmet Mosque (Turkish: \"Sultan Ahmet Camii\" ) is a historic mosque located in Istanbul, Turkey.  A popular tourist site, the Sultan Ahmed Mosque continues to function as a mosque today; men still kneel in prayer on the mosque's lush red carpet after the call to prayer.  The Blue Mosque, as it is popularly known, was constructed between 1609 and 1616 during the rule of Ahmed I.  Its Külliye contains Ahmed's tomb, a madrasah and a hospice.  Hand-painted blue tiles adorn the mosque’s interior walls, and at night the mosque is bathed in blue as lights frame the mosque’s five main domes, six minarets and eight secondary domes.  It sits next to the Hagia Sophia, another popular tourist site.\n\n" +
                    "Laleli Mosque \t The Laleli Mosque (Turkish: \"Laleli Camii, or Tulip Mosque\" ) is an 18th-century Ottoman imperial mosque located in Laleli, Fatih, Istanbul, Turkey.\n\n" +
                    "Esma Sultan Mansion \t The Esma Sultan Mansion (Turkish: \"Esma Sultan Yalısı\" ), a historical yalı (English: waterside mansion ) located at Bosphorus in Ortaköy neighborhood of Istanbul, Turkey and named after its original owner Esma Sultan, is used today as a cultural center after being redeveloped.\n\n" +
                    "Esma Sultan \t Esma Sultan is the name of three daughters of three Ottoman Sultans:\n\n" +
                    "Gevheri Kadın \t Gevheri Kadın (8 July 1856\xa0– 6 September 1884) was the fifth wife of 32nd Ottoman Sultan Abdülaziz.  She was the mother of Şehzade Mehmed Seyfeddin and Esma Sultan of the Ottoman Empire.\n\n" +
                    "Esma Sultan (daughter of Ahmed III) \t Esma Sultan (14 March 1726 – 13 August 1788) was an Ottoman princess, daughter of Sultan Ahmed III and his consort Zeynep Kadın.  She was the half-sister of Sultan Mustafa III and Abdul Hamid I.",
            answer: 'no',
            supports: ["The Laleli Mosque (Turkish: \"Laleli Camii, or Tulip Mosque\" ) is an 18th-century Ottoman imperial mosque located in Laleli, Fatih, Istanbul, Turkey.",
                       "The Esma Sultan Mansion (Turkish: \"Esma Sultan Yalısı\" ), a historical yalı (English: waterside mansion ) located at Bosphorus in Ortaköy neighborhood of Istanbul, Turkey and named after its original owner Esma Sultan, is used today as a cultural center after being redeveloped."]
        },
        {
            question: 'Who was known by his stage name Aladin and helped organizations improve their performance as a consultant?',
            context:"James P. Comer \t James P. Comer (born James Pierpont Comer, September 25, 1934 in East Chicago, Indiana) is currently the Maurice Falk Professor of Child Psychiatry at the Yale Child Study Center and has been since 1976.  He is also an associate dean at the Yale School of Medicine.  As one of the world's leading child psychiatrists, he is best known for his efforts to improve the scholastic performance of children from lower-income and minority backgrounds which led to the founding of the Comer School Development Program in 1968.  His program has been used in more than 600 schools in eighty-two school districts.  He is the author of ten books, including the autobiographical \"Maggie’s American Dream: The Life and Times of a Black Family\", 1988; \"Leave No Child Behind: Preparing Today's Youth for Tomorrow's World\", 2004; and his most recent book, \"What I Learned in School: Reflections on Race, Child Development, and School Reform\", 2009.  He has also written more than 150 articles for Parents (magazine) and more than 300 articles on children's health and development and race relations.  Dr. Comer has also served as a consultant to the Children's Television Workshop (Sesame Workshop) which produces Sesame Street and The Electric Company (1971 TV series).  He is a co-founder and past president of the Black Psychiatrists of America and has served on the board of several universities, foundations, and corporations.  He has also lectured and consulted widely not only across the United States at different universities, medical schools, and scientific associations, but also around the world in places such as London, Paris, Tokyo, Dakar, Senegal and Sydney, Australia.  For his work and scholarship, Dr. Comer has been awarded 47 honorary degrees and has been recognized by numerous organizations.\n\n" +
                    "Method Man \t Clifford Smith (born April 1, 1971), better known by his stage name Method Man, is an American rapper, record producer, and actor.  He is known as a member of the East Coast hip hop collective Wu-Tang Clan.  He is also one half of the hip hop duo Method Man & Redman.  He took his stage name from the 1979 film \"Method Man\".  In 1996, he won a Grammy Award for Best Rap Performance by a Duo or Group, for \"I'll Be There for You/You're All I Need to Get By\", with American R&B singer-songwriter Mary J. Blige.\n\n" +
                    "Indriati Iskak \t Indriati Gerald Bernardina (born 9 June 1942), also known by her stage name Indriati Iskak and after marriage as Indri Makki, is an Indonesian actress turned psychologist and marketer.  Born in Surabaya, she entered the Indonesian film industry and soared to popularity with Usmar Ismail's commercially successful \"Tiga Dara\" (1957).  She appeared in eight further films and established her own girl group before retiring from cinema in 1963.  She graduated from the University of Indonesia with a degree in psychology in 1968, and has taught the subject at the .  For twenty-six years she worked with Unilever, and since 1994 she has been a marketing consultant with Makki Makki.\n\n" +
                    "Eenasul Fateh \t Eenasul Fateh (Bengali: ঈনাসুল ফাতেহ ; born 3 April 1959), also known by his stage name Aladin, is a Bangladeshi-British cultural practitioner, magician, live artist and former international management consultant.\n\n" +
                    "Mick (DJ) \t Mick Batyske (known by his stage name Mick, sometimes styled as MICK, and formerly Mick Boogie) is an American DJ and entrepreneur.  He is an A-list DJ and spun private parties for celebrities including Kanye West, LeBron James, Jay-Z and Will Smith.  In addition to his mix tape releases, he has performed in venues internationally, including New York City, Dubai, Tokyo, Las Vegas, and Los Angeles.  As an entrepreneur, he has invested in various start-up companies including Localeur, in which he is also an advisor and consultant.\n\n" +
                    "Criss Angel \t Christopher Nicholas Sarantakos (born December 19, 1967), known by the stage name Criss Angel, is an American magician, illusionist and musician.  Angel began his career in New York City, before moving his base of operations to the Las Vegas Valley.  He is known for starring in the television and stage show \"Criss Angel Mindfreak\" and his previous live performance illusion show \"Criss Angel Believe\" in collaboration with \"Cirque du Soleil\" at the Luxor casino in Las Vegas.  The show generated $150 million in tourist revenue to Las Vegas in 2010, but has since been replaced by \"Mindfreak LIVE\" on 11 May 2016 (the show is partly produced by Cirque, however the directive rights are entirely with Criss Angel).  He also starred in the television series \"Criss Angel BeLIEve\" on Spike TV, the reality-competition television show \"Phenomenon\" on NBC, and the 2014 stage show \"Criss Angel Magicjam\".\n\n" +
                    "ELDee \t anre Dabiri (born May 23, 1977), better known by his stage name Eldee, stylized as eLDee, is a former Nigerian-American rapper, singer, and record producer but now an IT Consultant based in the United_States \"Lanre\" is a diminutive for the Yoruba name \"Olanrewaju\" (which translates to \"Wealth is moving forward\").  eLDee has a masters degree in Architecture from the University of Lagos, Nigeria.  He is an original member of the band Trybesmen, which was started in 1998 with rappers KB and Freestyle.  He hails from Lagos Island in Lagos State of Nigeria.\n\n" +
                    "Management consulting \t Management consulting is the practice of helping organizations to improve their performance, operating primarily through the analysis of existing organizational problems and the development of plans for improvement.  Organizations may draw upon the services of management consultants for a number of reasons, including gaining external (and presumably objective) advice and access to the consultants' specialized expertise.\n\n" +
                    "Lil Ru \t Sylvester Samuels better known by his stage name Lil Ru, is an American rapper from Ridgeway, South Carolina currently signed to Def Jam Recordings.  His debut album, 21 & Up was released on August 25, 2009.  The Ridgeway native was 16 when he made his professional foray into the music business.  Inspired by New Orleans’ innovative Cash Money Crew, Ru began making a name for himself on his local music scene, doing live shows and pressing up his own CDs.  His hard-hitting lyrics and entrepreneurial spirit caught the attention of fellow South Carolinian Angie Stone.  Shortly after the neo-soul songstress helped him secure a deal with Elektra Records, Ru found himself unsigned again, among the artists lost in the shuffle after the label merged with Atlantic Records.  Music fans first heard him on his 2001 debut single Will Destroy.  He then released his 2002 follow up, Shawty What You Doin’.  Both songs reached the Billboard R&B/Hip-Hop charts and helped land him at his next label home, Capitol Records.\n\n" +
                    "Amaruk Kayshapanta \t maruk Caizapanta Anchapacxi (Quito, January 30, 1970), whose stage name is Amaruk Kayshapanta.  Is an Ecuadorian multidisciplinary artist, known in Spain and Ecuador for his artistic and humanistic trajectory in favor of the Human Rights of Immigration in Spain.  Named as the \"Chasqui de Oro\" (In the VI Race and hike \"El Chasqui-NY\").  Received the award as \"Cultural Ambassador of the Andes-Mushuk Nina 2014 (Third Edition)\", for rescuing the traditions and culture of the Andes for the Indigenous Organizations of Peru, Bolivia based in Ecuador.  He obtained the prize \"100 Latinos Madrid\", by the Community of Madrid, in recognition of their non-profit altruistic and cultural work for the benefit of foreign immigrants in Spain.  Known for his role in the TV series \"Hospital Central\" in which he gave life to the character \"Edgar\".  His Philosophy \"Amawtica Amarukiana Desestructuration\" brings to the contemporary world the Philosophical study of the Andean Worldview, a spiritual legacy of transformation and balance for the awakening of a collective conscience.",
            answer: 'Eenasul Fateh',
            supports: ["Eenasul Fateh (Bengali: ঈনাসুল ফাতেহ ; born 3 April 1959), also known by his stage name Aladin, is a Bangladeshi-British cultural practitioner, magician, live artist and former international management consultant.",
                       "Management consulting is the practice of helping organizations to improve their performance, operating primarily through the analysis of existing organizational problems and the development of plans for improvement."]
        },
        {
            question: 'Who is older, Annie Morton or Terry Richardson?',
            context:"Annie Morton \t Annie Morton (born October 8, 1970) is an American model born in Pennsylvania.  She has appeared on the covers of \"British Vogue\", \"ID\", \"Marie Claire\", and other magazines.  She has been photographed by Helmut Newton; Peter Lindbergh; Annie Leibovitz; Richard Avedon; Juergen Teller; Paul Jasmin, Mary Ellen Mark and Terry Richardson, and modeled for Donna Karan, Givenchy, Guerlain, Chanel, \"Harper's Bazaar\", \"Sports Illustrated\" and Victoria's Secret.  A long time vegetarian, an advocate for organic lifestyle choices and natural healthcare.  She co-founded Tsi-La Organics, a \"Green Luxury\" company that creates and sells vegan, organic perfume and skin care products.\n\n" +
                    "Madonna (book) \t Madonna is a biography by English author Andrew Morton, chronicling the life of American recording artist Madonna.  The book was released in November 2001 by St. Martin's Press in the United States and in April 2002 by Michael O'Mara Books in the United Kingdom.  Morton decided to write a biography on Madonna in 2000.  The release was announced in April 2001 by St. Martin's Press.  President and publisher Sally Richardson described the biography to contain details about Madonna's ambitions, her relationships and her lifestyle.\n\n" +
                    "Terry Richardson \t Terrence \"Uncle Terry\" Richardson (born August 14, 1965) is an American fashion and portrait photographer who has shot advertising campaigns for Marc Jacobs, Aldo, Supreme, Sisley, Tom Ford, and Yves Saint Laurent among others.  He has also done work for magazines such as \"Rolling Stone\", \"GQ\", \"Vogue\", \"Vanity Fair\", \"Harper's Bazaar\", \"i-D\", and \"Vice\".\n\n" +
                    "Lady Gaga x Terry Richardson \t Lady Gaga x Terry Richardson is a photo-book by American singer Lady Gaga and American photographer Terry Richardson, released on November 22, 2011 by Grand Central Publishing.  The book features more than 350 pictures of Gaga as taken by Richardson during a ten-month period from Gaga's performance at The Monster Ball Tour till the 2011 Grammy Awards.  In addition to photographs, it includes a foreword written by the singer about her relationship with Richardson.  The duo had collaborated on other projects prior to the shooting of the book.\n\n" +
                    "Gumbo (PJ Morton album) \t Gumbo is the fourth and first self-released studio album by American singer-songwriter PJ Morton.  It was released on April 14, 2017, by Morton Records, as the follow-up to his third studio album \"New Orleans\" (2013).  The record incorporates R&B styles with elements of older soul music; its lyrics discuss themes of romance and explores political and personal themes.  The album is entirely produced by Morton himself and features guest appearances by Pell, BJ the Chicago Kid and R&B singer Anthony Hamilton's back-up group, The HamilTones.  The album features a cover of the Bee Gees' \"How Deep Is Your Love\".\n\n" +
                    "Amanda Lepore \t Amanda Lepore (born November 21, 1967) is an American transgender model, celebutante, singer, and performance artist.  The former Club Kid has appeared in advertising for numerous companies.  Lepore is also noted as a regular subject in photographer David LaChapelle's work, serving as his muse, as well as many other photographers, such as Terry Richardson and .  She participated in LaChapelle's \"Artists and Prostitutes 1985–2005\" exhibit in New York City, where she \"lived\" in a voyeuristic life-sized set.  Lepore has also released several singles, many written by and/or recorded with Cazwell.  In 2011, she released her debut studio album, \"I.. . Amanda Lepore\", on Peace Bisquit.\n\n" +
                    "Piano Girl \t Piano Girl (Turkish: \"Deli Deli Olma\" ) is a 2009 Turkish comedy-drama film, directed by Murat Saraçoğlu, starring Tarık Akan and Şerif Sezer as two elderly people forced to question their histories and reveal their big secrets.  The film, which went on nationwide general release across Turkey on \xa017,\xa02009\xa0(2009--) , was the opening film at the Sinema Burada Film Festival in İzmir, Turkey, and has since been screened in competition at a number of other film festivals, including the 46th Antalya Golden Orange Film Festival, where, according to Terry Richardson, writing for Today's Zaman, \"the rapt audience gave it a standing ovation.\"\n\n" +
                    "Index Magazine \t index Magazine was a prominent New York City based publication with in-depth interviews with prominent figures in art and culture.  It was created by Peter Halley and Bob Nickas in 1996, running until late 2005.  Covering the burgeoning Indie culture of the 1990s, index regularly employed such rising photographers as Juergen Teller, Terry Richardson, Wolfgang Tillmans, and Ryan McGinley, and featured interviews with figures including Björk, Brian Eno, Marc Jacobs, and Scarlett Johansson, mixing new talents and established names in music, film, architecture, fashion, art, and politics.  In addition to famous personalities, the publication also featured a mix of interviews with not so-famous New York personalities such as Queen Itchie or Ducky Doolittle.\n\n" +
                    "Snoecks \t Snoecks is a Belgian magazine.  The huge, 550-plus-page magazine appears once a year in October and focuses on the most interesting new international developments in the arts, photography and literature.  In recent editions the book had features on artists such as Anton Corbijn, Larry Sultan, Matthew Barney, Terry Richardson, Ron Mueck, Alberto Garcia-Alix, Peter Lindbergh, Albert Watson, Desiree Dolron, Bettina Rheims, Diana Scheunemann, Timothy Greenfield-Sanders and Andres Serrano.\n\n" +
                    "Kenton Richardson \t Kenton Terry Richardson (born 26 July 1999) is an English professional footballer who plays as a defender for League Two side Hartlepool United.",
            answer: 'Terry Richardson',
            supports: ["Annie Morton (born October 8, 1970) is an American model born in Pennsylvania.",
                       "She has been photographed by Helmut Newton; Peter Lindbergh; Annie Leibovitz; Richard Avedon; Juergen Teller; Paul Jasmin, Mary Ellen Mark and Terry Richardson, and modeled for Donna Karan, Givenchy, Guerlain, Chanel, \"Harper's Bazaar\", \"Sports Illustrated\" and Victoria's Secret.",
                       "Terrence \"Uncle Terry\" Richardson (born August 14, 1965) is an American fashion and portrait photographer who has shot advertising campaigns for Marc Jacobs, Aldo, Supreme, Sisley, Tom Ford, and Yves Saint Laurent among others."]
        }
    ];

    String.prototype.hashCode = function() {
        let hash = 0, i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
            chr   = this.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    window.socket = io({ autoConnect: false })

    $(window).init(function() {
        renderQuestionOptions();
        updateExampleContext();

        // register socket event
        window.socket.on('update_status', function(response) {
            console.log(response);

            updateProgressBarTo((response.cur_step / response.total_step * 100).toFixed(4))
            setPredictionProgressBarDescription('Prediction in progress ... [' + response.status + ']');

            if (response.cur_step === 0) {
                // console.log('current step: ' + response.cur_step);
            } else if (response.cur_step == 1) {
                // console.log('current step: ' + response.cur_step);
            } else if (response.cur_step == 2) {
                // console.log('current step: ' + response.cur_step);
            } else if (response.cur_step == 3) {
                // console.log('current step: ' + response.cur_step);
            } else if (response.cur_step == 4) {
                // console.log('current step: ' + response.cur_step);
            }

            if (response.completed == 1) {
                let endTime = Date.now();
                let timeTaken = (endTime - window.startTime) / 1000;
                let result = { answer: "Click 'Predict' button to generate answer.", supports: [] }
                let progressBarMsg = 'Server Error: please try again later.  Time taken: ' + timeTaken.toFixed(4) + 's';
                let progressBarStatus = 'ERROR';

                if (response.cur_step == response.total_step) {
                    progressBarMsg = 'Done!  Time taken: ' + timeTaken.toFixed(4) + 's';
                    progressBarStatus = 'SUCCESS';
                    result = { answer: response.result['answer'], supports: response.result['supports'] };
                }

                renderResult(result);
                updateProgressBarTo(100);
                predictionProgressAnimationStop(progressBarStatus);
                setPredictionProgressBarDescription(progressBarMsg);
                turnOffTab(false);
                window.socket.disconnect();
            }
        });
    });

    $('#my-input-btn').click(toggleMyInput);

    $('#example-btn').click(toggleExampleInput);

    $('#precomputed-btn').click(togglePrecomputed);

    $('#example-question-select').change(updateExampleContext);

    $('.predict-btn').click(predictAnswer);

    function togglePrecomputed() {
        $('#precomputed-btn').addClass('btn-primary').removeClass('btn-outline-secondary');
        $('#my-input-btn').addClass('btn-outline-secondary').removeClass('btn-primary');
        $('#example-btn').addClass('btn-outline-secondary').removeClass('btn-primary');
        $('#my-question').addClass('d-none');
        $('#example-question').removeClass('d-none');
        $('#context-textarea').attr('readonly','readonly');
        updateExampleContext();
        setPredictionProgressBarDescription("Ready to go");
    }

    function toggleMyInput() {
        $('#my-input-btn').addClass('btn-primary').removeClass('btn-outline-secondary');
        $('#example-btn').addClass('btn-outline-secondary').removeClass('btn-primary');
        $('#precomputed-btn').addClass('btn-outline-secondary').removeClass('btn-primary');
        $('#my-question').removeClass('d-none');
        $('#my-question-input').attr('placeholder', "Please type your question here...");
        $('#example-question').addClass('d-none');
        $('#context-textarea').removeAttr('readonly');
        $('#context-textarea').val('');
        $('#context-textarea').attr('placeholder', "Please paste your document here...");
        renderResult({ answer: "Click 'Predict' button to generate answer.", supports: [] });
        setPredictionProgressBarDescription("Ready to go");
    }

    function toggleExampleInput() {
        $('#my-input-btn').addClass('btn-outline-secondary').removeClass('btn-primary');
        $('#example-btn').addClass('btn-primary').removeClass('btn-outline-secondary');
        $('#precomputed-btn').addClass('btn-outline-secondary').removeClass('btn-primary');
        $('#my-question').addClass('d-none');
        $('#example-question').removeClass('d-none');
        $('#context-textarea').removeAttr('readonly');
        updateExampleContext();
        setPredictionProgressBarDescription("Ready to go");
    }

    function getInputType() {
        if ($('#my-input-btn').hasClass('btn-primary') && $('#example-btn').hasClass('btn-outline-secondary') && $('#precomputed-btn').hasClass('btn-outline-secondary')) {
            return 'MY_INPUT'
        } else if ($('#my-input-btn').hasClass('btn-outline-secondary') && $('#example-btn').hasClass('btn-primary') && $('#precomputed-btn').hasClass('btn-outline-secondary')) {
            return 'EXAMPLE'
        } else if ($('#my-input-btn').hasClass('btn-outline-secondary') && $('#example-btn').hasClass('btn-outline-secondary') && $('#precomputed-btn').hasClass('btn-primary')) {
            return 'PRECOMPUTED'
        } else {
            return 'ERROR'
        }
    }

    function getSelectedExampleId() {
        return $('#example-question-select').children('option:selected').val();
    }

    function updateExampleContext() {
        renderResult({ answer: "Click 'Predict' button to generate answer.", supports: [] });

        let selectedId = getSelectedExampleId();

        $('#context-textarea').val(EXAMPLES[selectedId].context);
    }

    function getQuestionOptionHtml(QuestionId, Question) {
        let questionOption = `<option value="${QuestionId}">${Question}</option>`;
        return questionOption;
    }

    function renderQuestionOptions() {
        let output = '';
        for (let i = 0; i < EXAMPLES.length; i++) {
            output += getQuestionOptionHtml(i, EXAMPLES[i].question)
        }
        $('#example-question-select').html(output);
    }

    function getCardHtml(card) {
        let cardTemplate = `
            <div class="card ${card.IsAnswer ? 'border-success' : ''} mb-4">
                <div class="card-header ${card.IsAnswer ? 'bg-success text-white' : ''}">${card.CardTitle}</div>
                <div class="card-body ${card.IsAnswer ? 'text-success' : ''}">
                    <p>${card.CardContent}</p>
                </div>
            </div>
        `;
        return cardTemplate
    }

    function renderResult(result) {
        $("#answer-section").empty();

        let output = '';

        // Answer card
        let answer = { CardTitle: 'Answer', CardContent: "No answer", IsAnswer: true};
        if (result.answer) {
            answer.CardContent = result.answer;
        }
        let answerCard = getCardHtml(answer);
        output += answerCard;

        // Supports card
        if (result.supports) {
            for (let i = 0; i < result.supports.length; i++) {
                let support = { CardTitle: 'Supporting Fact ' + (i+1), CardContent: result.supports[i], IsAnswer: false};
                let supportCard = getCardHtml(support);
                output += supportCard;
            }
        }
        
        $("#answer-section").html(output);
    }

    function predictionProgressAnimationStart() {
        $('#prediction-progress-bar').addClass('progress-bar-animated');
        $('#prediction-progress-bar').removeClass('bg-success');
        $('#prediction-progress-bar').removeClass('bg-danger');
    }

    function predictionProgressAnimationStop(status = 'SUCCESS') {
        $('#prediction-progress-bar').removeClass('progress-bar-animated');
        if (status == 'ERROR')
            $('#prediction-progress-bar').addClass('bg-danger');
        else
            $('#prediction-progress-bar').addClass('bg-success');
    }

    function setPredictionProgressBarDescription(description) {
        $('#prediction-progress-bar-description').text(description)
    }

    function updateProgressBarTo(value) {
        $('#prediction-progress-bar').attr('aria-valuenow', value).css('width', value + '%');
    }

    function turnOffTab(value) {
        $('#my-input-btn').prop('disabled', value);
        $('#example-btn').prop('disabled', value);
        $('#precomputed-btn').prop('disabled', value);
    }

    function dataVerfiy(value) {
        let context = $('#context-textarea').val();
        let question = $('#my-question-input').val();

        if (context == "" || question == "") {
            return false;
        }

        return true;
    }

    function predictAnswer() {
        // clean up previous prediction ??
        window.startTime = Date.now();
        
        // frontend data verification
        turnOffTab(true);
        if (!dataVerfiy()) {
            setPredictionProgressBarDescription('Question and Document can\'t be empty!');
            predictionProgressAnimationStop('ERROR');
            turnOffTab(false);
            return;
        }

        predictionProgressAnimationStart();
        setPredictionProgressBarDescription('Prediction in progress ...');

        // predict answer
        let inputType = getInputType();
        if (inputType == 'PRECOMPUTED') {
            // render example answer
            let selectedId = getSelectedExampleId();

            let result = { answer: EXAMPLES[selectedId].answer, supports: EXAMPLES[selectedId].supports };
            renderResult(result);

            let endTime = Date.now();
            let timeTaken = (endTime - window.startTime) / 1000;
            predictionProgressAnimationStop();
            setPredictionProgressBarDescription('Done!  Time taken: ' + timeTaken.toFixed(4) + 's');
            turnOffTab(false);
        } else if (inputType == 'MY_INPUT' || inputType == 'EXAMPLE') {
            // let selectedId = getSelectedExampleId();
            // let id = 'example';
            // let context = EXAMPLES[selectedId].context;
            // let question = EXAMPLES[selectedId].question;

            let id = 'my_input';
            let context = $('#context-textarea').val();
            let question = $('#my-question-input').val();

            // validate data??

            let data = {
                "id": id,
                "question": question,
                "context": context
            }

            // Socket.IO
            window.socket.open();
            window.socket.emit('predict', {data: JSON.stringify(data)});
            updateProgressBarTo(0)

        } else {
            let endTime = Date.now();
            let timeTaken = (endTime - window.startTime) / 1000;
            turnOffTab(false);
            predictionProgressAnimationStop('ERROR');
            setPredictionProgressBarDescription('Client Error: please refresh page and try again.  Time taken: ' + timeTaken.toFixed(4) + 's');
        }
    }
})()