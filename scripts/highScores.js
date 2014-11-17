function HighScores() {

    var storage = localStorage,
        highScoreListEl = document.getElementById("lstHighScores"),
        isHighScore = false;

    var scores = this.fillList;

    this.fillList = function () {
        if (storage.length != 0) {
            scores = JSON.parse(storage.getItem('gameScores'));
            this.updateList(highScoreListEl, scores);
        } else {
            scores = [];
        }
    };

    this.checkScore = function (score) {

        if (scores.length == 0) {
            scores.push(score);
            isHighScore = false;
        } else {
            for (var i = 0; i < scores.length; i++) {
                if (scores[i] < score) {

                    var remaining = [];

                    if (scores.length == 10) {
                        scores.pop();
                    }

                    remaining = scores.splice(i, scores.length);
                    remaining.unshift(score);

                    for (var j = 0; j < remaining.length; j++) {
                        scores.push(remaining[j]);
                    }

                    isHighScore = true;
                    break;

                } else if (scores[scores.length - 1] > score && scores.length < 10) {
                    scores.push(score);
                    isHighScore = true;
                    break;

                } else if (scores[scores.length - 1] > score && score.length == 10) {
                    isHighScore = false;
                    break;
                }
            }
        }

        localStorage.setItem('gameScores', JSON.stringify(scores));
        this.updateList(highScoreListEl, scores);
        return isHighScore;
    };

    this.updateList = function (list, arr) {
        while (highScoreListEl.firstChild) {
            highScoreListEl.firstChild.remove();
        }
        for (var i = 0; i < arr.length; i++) {
            var newLi = document.createElement("LI");
            var txt = document.createTextNode(arr[i]);
            newLi.appendChild(txt);
            highScoreListEl.appendChild(newLi);
        }
    }

}


