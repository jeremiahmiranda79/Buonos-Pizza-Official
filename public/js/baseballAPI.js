const startPoint = 'https://api-baseball.p.rapidapi.com';
const yankeesImage = './assets/Images/yankeesLogo.png';
const athleticsImage = './assets/Images/athleticsLogo.png';
const bluejaysImage = '';
const season = 2023;
const yankeesID = 25;
const redsoxID = 5;
//tigers id = 12;

let dropDownFavorites = document.getElementById('favorite-teams-list');
let chosenTeams = [];
let favoriteTeams = [];
let dayIndex = 0;

document.querySelector('#choose-team-button').addEventListener('click', chooseTeam);

const options = {
    method: 'GET',
    headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': 'b321e401e5msh1daad72711c493dp1e4557jsn35e8c3bfc80a',
        'X-RapidAPI-Host': 'api-baseball.p.rapidapi.com'
    }
};

const dayObject = { 
    today : dayjs().format('YYYY-MM-DD'),
    dayAfter1 : dayjs().add(1, 'day').format('YYYY-MM-DD'),
    dayAfter2 : dayjs().add(2, 'day').format('YYYY-MM-DD'),
    dayAfter3 : dayjs().add(3, 'day').format('YYYY-MM-DD'),
    dayAfter4 : dayjs().add(4, 'day').format('YYYY-MM-DD'),
    dayAfter5 : dayjs().add(5, 'day').format('YYYY-MM-DD'),
    dayAfter6 : dayjs().add(6, 'day').format('YYYY-MM-DD'),
    dayAfter7 : dayjs().add(7, 'day').format('YYYY-MM-DD'),
    dayAfter8 : dayjs().add(8, 'day').format('YYYY-MM-DD'),
    dayAfter9 : dayjs().add(9, 'day').format('YYYY-MM-DD'),
    dayAfter10 : dayjs().add(10, 'day').format('YYYY-MM-DD'),
    dayAfter11 : dayjs().add(11, 'day').format('YYYY-MM-DD'),
    dayAfter12 : dayjs().add(12, 'day').format('YYYY-MM-DD')
};

let dayArray = [
    dayObject.today, 
    dayObject.dayAfter1, 
    dayObject.dayAfter2, 
    dayObject.dayAfter3, 
    dayObject.dayAfter4, 
    dayObject.dayAfter5, 
    dayObject.dayAfter6, 
    dayObject.dayAfter7,
    dayObject.dayAfter8,
    dayObject.dayAfter9,
    dayObject.dayAfter10,
    dayObject.dayAfter11,
    dayObject.dayAfter12
];

let statsObject = {
    name: '',
    logo: '',
    group: '',
    position: '',
    loses: '',
    wins: '',
    id: ''
};

let gameTodayObject = {
    date: '',
    time: '',
    gameStatus: '',
    awayLogo: '',
    awayName: '',
    awayTotal: '',
    awayInnings: [],
    awayHits: '',
    awayErrors: '',
    homeLogo: '',
    homeName: '',
    homeTotal: '',
    homeInnings: [],
    homeHits: '',
    homeErrors: '',
};

let gameOneObject = {
    date: '',
    time: '',
    awayLogo: '',
    awayName: '',
    homeLogo: '',
    homeName: ''
};

let gameTwoObject = {
    date: '',
    time: '',
    awayLogo: '',
    awayName: '',
    homeLogo: '',
    homeName: ''
};

let gameThreeObject = {
    date: '',
    time: '',
    awayLogo: '',
    awayName: '',
    homeLogo: '',
    homeName: ''
};

start(yankeesID, season);
displayFavorites();

function chooseTeam() {  
    let team = document.getElementById('team-input').value;
    const url = `${startPoint}/teams?search=${team}`;
    document.getElementById('team-input').value = '';

    try {
        fetch(url, options).then(function (response) {
            response.json().then(function (data) {     
                if (data.response.length !== 0) {
                    for (i = 0; i < data.response.length; i++) {
                        let newTeam = document.createElement('button');
                        newTeam.textContent = data.response[i].name;
                        newTeam.id = `btn-${data.response[i].id}`;
                        document.getElementById('add-buttons').appendChild(newTeam);
                        document.querySelector('#' + newTeam.id).addEventListener('click', selectTeam);
                    }

                    function selectTeam() {
                        newID = this.id.split('-');
                        finalID = newID[1];
                        parent = document.getElementById('add-buttons');
                        parent.innerHTML = '';          
                        start(finalID, season);
                    }
                }
                else {
                    alert('Please enter a valid team name!!!');
                }
            })
        })
    } 
    catch (error) {
        console.error(error);
    }
}

function start(_teamID, _season) {
    dayIndex = 0;
    getStats(_teamID, _season);
    getGameToday(_teamID, _season, dayArray[dayIndex]);
}

function getAwayLogo(_game, _logo) {
    if (_game.awayName === 'New York Yankees') {                 
        return _game.awayLogo = yankeesImage;
    }
    else if (gameTodayObject.awayName === 'Oakland Athletics') {
        return _game.awayLogo = athleticsImage;
    }
    else {
        return _game.awayLogo = _logo;
    }
}

function getHomeLogo(_game, _logo) {
    if (_game.homeName === 'New York Yankees') {
        return _game.homeLogo = yankeesImage;
    }
    else if (_game.homeName === 'Oakland Athletics') {
        return _game.homeLogo = athleticsImage;
    }
    else {
        return _game.homeLogo = _logo;
    }
}

function getStats(_teamID, _season) { 
    const url = `${startPoint}/standings?league=1&season=${_season}&team=${_teamID}`;
        
    try {   
        fetch(url, options).then(function (response) {
            response.json().then(function (data) {
                statsObject.id = data.response[0][1].team.id;
                statsObject.name = data.response[0][1].team.name;
                statsObject.logo = data.response[0][1].team.logo;
                statsObject.group = data.response[0][1].group.name;
                statsObject.position = data.response[0][1].position;
                statsObject.loses = data.response[0][1].games.lose.total;
                statsObject.wins = data.response[0][1].games.win.total;
                currentTeam = statsObject.name;
                displayStats();
                storeLocalFavorites(statsObject.id,2023, statsObject.name);
            })
        })
    } 
    catch (error) {
    }
}

function displayStats() {
    let teamName = document.querySelector('#team-name');
    let teamGroupAndPosition = document.querySelector('#team-group-position');
    let homeWinsLoses = document.querySelector('#home-wins-loses');
    teamName.textContent = statsObject.name;

    if (statsObject.position === 1) {
        teamGroupAndPosition.textContent = `${statsObject.position}st in ${statsObject.group}`;
    }
    else if (statsObject.position === 2){
        teamGroupAndPosition.textContent = `${statsObject.position}nd in ${statsObject.group}`;
    }
    else if (statsObject.position === 3) {
        teamGroupAndPosition.textContent = `${statsObject.position}rd in ${statsObject.group}`;
    }
    else {
        teamGroupAndPosition.textContent = `${statsObject.position}th in ${statsObject.group}`;
    }

    homeWinsLoses.textContent = `(${statsObject.wins}-${statsObject.loses})`;
}

function getGameToday(_teamID, _season, _date) {
    const url = `${startPoint}/games?team=${_teamID}&season=${_season}&date=${_date}`;

    try {
        fetch(url, options).then(function (response) {
            response.json().then(function (data) {
                if (data.response.length === 0) {
                    dayIndex++;
                    getGameToday(_teamID, _season, dayArray[dayIndex]);
                }
                else {
                    gameTodayObject.date = data.response[0].date;
                    gameTodayObject.gameStatus = data.response[0].status.short;
                    gameTodayObject.awayName = data.response[0].teams.away.name;
                    gameTodayObject.homeName = data.response[0].teams.home.name;
                    let awayLogo = data.response[0].teams.away.logo;
                    let homeLogo = data.response[0].teams.home.logo;
                    getAwayLogo(gameTodayObject, awayLogo);
                    getHomeLogo(gameTodayObject, homeLogo);
                    gameTodayObject.awayTotal = data.response[0].scores.away.total;
                    gameTodayObject.awayInnings = data.response[0].scores.away.innings;
                    gameTodayObject.awayHits = data.response[0].scores.away.hits;
                    gameTodayObject.awayErrors = data.response[0].scores.away.errors;
                    gameTodayObject.homeTotal = data.response[0].scores.home.total;   
                    gameTodayObject.homeInnings = data.response[0].scores.home.innings;
                    gameTodayObject.homeHits = data.response[0].scores.home.hits;
                    gameTodayObject.homeErrors = data.response[0].scores.home.errors;
                    getDateAndTime(data, gameTodayObject);
                    displayGameToday();
                    dayIndex++;
                    getGameOne(_teamID, _season, dayArray[dayIndex]);
                } 
            })
        })
    } 
    catch (error) {
        console.error(error);
    }
}

function getDateAndTime(_data, _gameObject){
    let date = _data.response[0].date;
    let splitDate = date.split('T');
    _gameObject.date = splitDate[0];
    let time  = _data.response[0].time;
    let splitTime = time.split(':');
    let hour = splitTime[0];
    let minute = splitTime[1];
    hour = hour - 7;
    let suffix = hour <= 12 ? 'AM':'PM';
    hour = (hour % 12) || 12;
    _gameObject.time = `${hour}:${minute} ${suffix}`;
}

function getGameStatus() {
    let currentGameStatus = document.querySelector('#current-game-status');

    switch(gameTodayObject.gameStatus) {
        case 'NS':
            currentGameStatus.textContent = 'Not started'; break;
        case 'IN1':
            currentGameStatus.textContent = '1st'; break;
        case 'IN2':
            currentGameStatus.textContent = '2nd'; break;
        case 'IN3':
            currentGameStatus.textContent = '3rd'; break;
        case 'IN4':
            currentGameStatus.textContent = '4th'; break;
        case 'IN5':
            currentGameStatus.textContent = '5th'; break;
        case 'IN6':
            currentGameStatus.textContent = '6th'; break;
        case 'IN7':
            currentGameStatus.textContent = '7th'; break;
        case 'IN8':
            currentGameStatus.textContent = '8th'; break;
        case 'IN9':
            currentGameStatus.textContent = '9th'; break;
        case 'POST':
            currentGameStatus.textContent = 'Postponed'; break;
        case 'CANC':
            currentGameStatus.textContent = 'Cancelled'; break;
        case 'INTR':
            currentGameStatus.textContent = 'Interrupted'; break;
        case 'ABD':
            currentGameStatus.textContent = 'Abandoned'; break;
        case 'FT':
            currentGameStatus.textContent = 'Final'; break;
        default:
            console.log('error!!!!'); break;
    }
}

function displayByHomeInning() {
    let inningHome = document.getElementById('innings-home');
    let iningHomeChildren = inningHome.children;

    if (gameTodayObject.homeInnings[1] === null) {
        iningHomeChildren[0].textContent = "-";
    }
    else {
        iningHomeChildren[0].textContent = gameTodayObject.homeInnings[1];
    }
    
    if (gameTodayObject.homeInnings[2] === null) {
        iningHomeChildren[1].textContent = "-";
    }
    else {
        iningHomeChildren[1].textContent = gameTodayObject.homeInnings[2];
    }

    if (gameTodayObject.homeInnings[3] === null) {
        iningHomeChildren[2].textContent = "-";
    }
    else {
        iningHomeChildren[2].textContent = gameTodayObject.homeInnings[3];
    }

    if (gameTodayObject.homeInnings[4] === null) {
        iningHomeChildren[3].textContent = "-";
    }
    else {
        iningHomeChildren[3].textContent = gameTodayObject.homeInnings[4];
    }

    if (gameTodayObject.homeInnings[5] === null) {
        iningHomeChildren[4].textContent = "-";
    }
    else {
        iningHomeChildren[4].textContent = gameTodayObject.homeInnings[5];
    }
    
    if (gameTodayObject.homeInnings[6] === null) {
        iningHomeChildren[5].textContent = "-";
    }
    else {
        iningHomeChildren[5].textContent = gameTodayObject.homeInnings[6];
    }

    if (gameTodayObject.homeInnings[7] === null) {
        iningHomeChildren[6].textContent = "-";
    }
    else {
        iningHomeChildren[6].textContent = gameTodayObject.homeInnings[7];
    }
    
    if (gameTodayObject.homeInnings[8] === null) {
        iningHomeChildren[7].textContent = "-";
    }
    else {
        iningHomeChildren[7].textContent = gameTodayObject.homeInnings[8];
    }

    if (gameTodayObject.homeInnings[9] === null) {
        iningHomeChildren[8].textContent = "-";
    }
    else {
        iningHomeChildren[8].textContent = gameTodayObject.homeInnings[9];
    }

    if (gameTodayObject.homeTotal === null) {
        iningHomeChildren[9].textContent = "-";
    }
    else {
        iningHomeChildren[9].textContent = gameTodayObject.homeTotal;
    }

    if (gameTodayObject.homeHits === null) {
        iningHomeChildren[10].textContent = "-";
    }
    else {
        iningHomeChildren[10].textContent = gameTodayObject.homeTotal;
    }
    
    if (gameTodayObject.homeHits === null) {
        iningHomeChildren[11].textContent = "-";
    }
    else {
        iningHomeChildren[11].textContent = gameTodayObject.homeErrors;
    }
}

function displayByAwayInning() {
    let inningAway = document.getElementById('innings-away');
    let iningAwayChildren = inningAway.children;
    
    if (gameTodayObject.awayInnings[1] === null) {
        iningAwayChildren[0].textContent = "-";
    }
    else {
        iningAwayChildren[0].textContent = gameTodayObject.awayInnings[1];
    }
    
    if (gameTodayObject.awayInnings[2] === null) {
        iningAwayChildren[1].textContent = "-";
    }
    else {
        iningAwayChildren[1].textContent = gameTodayObject.awayInnings[2];
    }

    if (gameTodayObject.awayInnings[3] === null) {
        iningAwayChildren[2].textContent = "-";
    }
    else {
        iningAwayChildren[2].textContent = gameTodayObject.awayInnings[3];
    }

    if (gameTodayObject.awayInnings[4] === null) {
        iningAwayChildren[3].textContent = "-";
    }
    else {
        iningAwayChildren[3].textContent = gameTodayObject.awayInnings[4];
    }
    
    if (gameTodayObject.awayInnings[5] === null) {
        iningAwayChildren[4].textContent = "-";
    }
    else {
        iningAwayChildren[4].textContent = gameTodayObject.awayInnings[5];
    }

    if (gameTodayObject.awayInnings[6] === null) {
        iningAwayChildren[5].textContent = "-";
    }
    else {
        iningAwayChildren[5].textContent = gameTodayObject.awayInnings[6];
    }
    
    if (gameTodayObject.awayInnings[7] === null) {
        iningAwayChildren[6].textContent = "-";
    }
    else {
        iningAwayChildren[6].textContent = gameTodayObject.awayInnings[7];
    }

    if (gameTodayObject.awayInnings[8] === null) {
        iningAwayChildren[7].textContent = "-";
    }
    else {
        iningAwayChildren[7].textContent = gameTodayObject.awayInnings[8];
    }

    if (gameTodayObject.awayInnings[9] === null) {
        iningAwayChildren[8].textContent = "-";
    }
    else {
        iningAwayChildren[8].textContent = gameTodayObject.awayInnings[9];
    }

    if (gameTodayObject.awayTotal === null) {
        iningAwayChildren[9].textContent = "-";
    }
    else {
        iningAwayChildren[9].textContent = gameTodayObject.awayTotal;
    }

    if (gameTodayObject.awayHits === null) {
        iningAwayChildren[10].textContent = "-";
    }
    else {
        iningAwayChildren[10].textContent = gameTodayObject.awayHits;
    }

    if (gameTodayObject.awayErrors === null) {
        iningAwayChildren[11].textContent = "-";
    }
    else {
        iningAwayChildren[11].textContent = gameTodayObject.awayErrors;
    }
}

function displayGameToday() {
    let currentGameDay = document.querySelector('#current-game-day');
    currentGameDay.textContent = `MLB * ${gameTodayObject.date}, ${gameTodayObject.time}`;
    getGameStatus();
    document.getElementById('team-logo-home').src= gameTodayObject.homeLogo;
    document.getElementById('team-logo-away').src= gameTodayObject.awayLogo;
    let homeTeamName = document.querySelector('#home-team-name');
    let awayTeamName = document.querySelector('#away-team-name');
    homeTeamName.textContent = gameTodayObject.homeName;
    awayTeamName.textContent = gameTodayObject.awayName;
    let homeCurrentScore = document.querySelector('#home-current-score');
    let awayCurrentScore = document.querySelector('#away-current-score');
    homeCurrentScore.textContent = gameTodayObject.homeTotal;
    awayCurrentScore.textContent = gameTodayObject.awayTotal;
    let inningsHomeTeamName = document.querySelector('#innings-home-team-name');
    let inningsAwayTeamName = document.querySelector('#innings-away-team-name');
    inningsHomeTeamName.textContent = gameTodayObject.homeName;
    inningsAwayTeamName.textContent = gameTodayObject.awayName;
    displayByHomeInning();
    displayByAwayInning();
}

function getGameOne(_teamID, _season, _date) {
    const url = `${startPoint}/games?team=${_teamID}&season=${_season}&date=${_date}`;

    try {
        fetch(url, options).then(function (response) {
            response.json().then(function (data) {
                if (data.response.length === 0) {
                    dayIndex++;
                    getGameOne(yankeesID, season, dayArray[dayIndex])
                }
                else {
                    gameOneObject.awayName = data.response[0].teams.away.name;
                    gameOneObject.homeName = data.response[0].teams.home.name;
                    let awayLogo = data.response[0].teams.away.logo;
                    let homeLogo = data.response[0].teams.home.logo;
                    getAwayLogo(gameOneObject, awayLogo);
                    getHomeLogo(gameOneObject, homeLogo);
                    getDateAndTime(data, gameOneObject);
                    displayGameOne();
                    dayIndex++;
                    getGameTwo(_teamID, _season, dayArray[dayIndex]);
                }
            })
        })
    } 
    catch (error) {
        console.error(error);
    }
}

function displayGameOne() {
    let date = document.querySelector('#game-1-date');
    date.textContent = `(${gameOneObject.date})`;
    let time = document.querySelector('#game-1-time');
    time.textContent = gameOneObject.time;
    document.getElementById('game-1-away-logo').src= gameOneObject.awayLogo;
    let awayTeam = document.querySelector('#game-1-away-team');
    awayTeam.textContent = gameOneObject.awayName;
    document.getElementById('game-1-home-logo').src= gameOneObject.homeLogo;
    let homeTeam = document.querySelector('#game-1-home-team');
    homeTeam.textContent = gameOneObject.homeName;
}

function getGameTwo(_teamID, _season, _date) {
    const url =  `${startPoint}/games?team=${_teamID}&season=${_season}&date=${_date}`;

    try {
        fetch(url, options).then(function (response) {
            response.json().then(function (data) {
                if (data.response.length === 0) {
                    dayIndex++;
                    getGameTwo(25, season, dayArray[dayIndex]);
                }
                else {
                    gameTwoObject.awayName = data.response[0].teams.away.name;
                    gameTwoObject.homeName = data.response[0].teams.home.name;
                    let awayLogo = data.response[0].teams.away.logo;
                    let homeLogo = data.response[0].teams.home.logo;
                    getAwayLogo(gameTwoObject, awayLogo);
                    getHomeLogo(gameTwoObject, homeLogo);
                    getDateAndTime(data, gameTwoObject);
                    displayGameTwo();
                    dayIndex++;
                    getGameThree(_teamID, _season, dayArray[dayIndex]);
                }
            })
        })
    } 
    catch (error) {
        console.error(error);
    }
}

function displayGameTwo() {
    let date = document.querySelector('#game-2-date');
    date.textContent = `(${gameTwoObject.date})`;
    let time = document.querySelector('#game-2-time');
    time.textContent = gameTwoObject.time;
    document.getElementById('game-2-away-logo').src= gameTwoObject.awayLogo;
    let awayTeam = document.querySelector('#game-2-away-team');
    awayTeam.textContent = gameTwoObject.awayName;
    document.getElementById('game-2-home-logo').src= gameTwoObject.homeLogo;
    let homeTeam = document.querySelector('#game-2-home-team');
    homeTeam.textContent = gameTwoObject.homeName;
}

function getGameThree(_teamID, _season, _date) {
    const url = `${startPoint}/games?team=${_teamID}&season=${_season}&date=${_date}`;

    try {
        fetch(url, options).then(function (response) {
            response.json().then(function (data) {
                if (data.response.length === 0) {
                    dayIndex++;
                    getGameThree(_teamID, _season, dayArray[dayIndex]);
                }
                else {
                    gameThreeObject.awayName = data.response[0].teams.away.name;
                    gameThreeObject.homeName = data.response[0].teams.home.name;
                    let awayLogo = data.response[0].teams.away.logo;
                    let homeLogo = data.response[0].teams.home.logo;
                    getAwayLogo(gameThreeObject, awayLogo);
                    getHomeLogo(gameThreeObject, homeLogo);
                    getDateAndTime(data, gameThreeObject);
                    displayGameThree();
                }
            })
        })
    } 
    catch (error) {
        console.error(error);
    }
}

function displayGameThree() {
    let date = document.querySelector('#game-3-date');
    date.textContent = `(${gameThreeObject.date})`
    let time = document.querySelector('#game-3-time');
    time.textContent = gameThreeObject.time;
    document.getElementById('game-3-away-logo').src= gameThreeObject.awayLogo;
    let awayTeam = document.querySelector('#game-3-away-team');
    awayTeam.textContent = gameThreeObject.awayName;
    document.getElementById('game-3-home-logo').src= gameThreeObject.homeLogo;
    let homeTeam = document.querySelector('#game-3-home-team');
    homeTeam.textContent = gameThreeObject.homeName;
}

function storeLocalFavorites(_teamID, _season, _teamName) {
    let favoriteTeam = {
        teamID : _teamID,
        season : _season,
        teamName: _teamName,
    }

    let favoriteTeamStored = JSON.parse(localStorage.getItem('favorite-stored'));

    if (favoriteTeamStored === null) {
        let FavoriteTeamsArray = [];
        FavoriteTeamsArray.push(favoriteTeam);
        localStorage.setItem('favorite-stored', JSON.stringify(FavoriteTeamsArray));
    }
    else {
        for (let i = 0; i < favoriteTeamStored.length; i++) {
            if (favoriteTeamStored[i].teamName === favoriteTeam.teamName) {
                return;
            } 
        }

        let currentFavoriteStored = JSON.parse(localStorage.getItem('favorite-stored'));
        currentFavoriteStored.push(favoriteTeam);
        localStorage.setItem('favorite-stored', JSON.stringify(currentFavoriteStored));
    }

    displayFavorites();
}

function displayFavorites(){
    let favoriteStored = JSON.parse(localStorage.getItem('favorite-stored'));
    dropDownFavorites.options.length = 0;

    for (let i = favoriteStored.length -1 ; i >= 0; i--) {
        let optionFavorite = document.createElement("option");
        optionFavorite.text=favoriteStored[i].teamName;
        dropDownFavorites.add(optionFavorite);
    }

    dropDownFavorites.addEventListener("change", function(){
        for (let i = 0; i < favoriteStored.length; i++) {
            if(favoriteStored[i].teamName === this.value) {
                start(favoriteStored[i].teamID, favoriteStored[i].season);
            }   
        }   
    })
}