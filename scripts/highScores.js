function HighScores() {

    console.log(document.cookie);

    var scores = document.cookie.split(/[a-z=;\s]/i).filter(function (n) {
            return n != undefined && n != ''
        }),
        highScore = parseInt(scores[scores.length - 1]),
        scoreList = document.getElementById("lstHighScores"),
        index = 1;

    this.getIndex = function () {
        if (scores != '') {
            index = parseInt(scores[scores.length - 2]) + 1;
        }
        return index;
    };

    this.setScore = function (score) {
        if (document.cookie == '' || score > highScore) {
            var scoreName = "score" + this.getIndex(scores) + "=" + score + "; ";
            document.cookie = scoreName;
            this.addToScoreList(score);
            return true;
        }
        return false;
    };

    this.addToScoreList = function (score) {
        var newLi = document.createElement("li");
        var txt = document.createTextNode(score);
        newLi.appendChild(txt);
        scoreList.insertBefore(newLi, scoreList.firstChild);
    };

    this.update = function () {
        while (scoreList.firstChild) {
            scoreList.removeChild(scoreList.firstChild);
        }
        for (var i = 1; i < scores.length; i += 2) {
            this.addToScoreList(scores[i]);
        }
    };
}


