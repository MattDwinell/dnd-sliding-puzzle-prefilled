$(function () {
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    let gameNineWon = false;
    let goalNine = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let currentNine = [];
    let goalFive = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    let currentFive = [];
    let currTiles = [];
    let goalTiles = [];
    let currFiveTiles = [];



    let input = document.getElementById('input');
    let image = document.getElementById('testimg');
    input.addEventListener('change', function () {


        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(input.files[0]);
            reader.onload = function () {
                //    console.log(reader.result);
                image.src = reader.result;
                image.onload = function () {
                    let tileSize = $('input[name="size"]:checked').val();
                    if(tileSize == '3') makeNine(image.src);
                    else if(tileSize == '5') makeTwentyFive(image.src);

                    input.style.visibility = 'hidden';
                   
                    
                }
            }
        }
    })

    function makeTwentyFive(src) {
        console.log('making 25');
        let j = 0;
        for (let i = 0; i < 25; i++) {
            let xShift = (750 - (150 * (i % 5))).toString();
            let yShift = (750 - (150 * j)).toString();
            if (i === 4 || i === 9 || i === 14 || i === 19) { j++ };
            let tile = $("<div class='tile5'>").css("background-image", "url(" + src + ") ").css("background-position", xShift + 'px' + ' ' + yShift + 'px').html('&nbsp').css('color', 'white').attr('id', 'tile' + i);
            if (i === 20) { tile.css("background-image", "none").attr("class", "tile5 empty"); }
            $("#tile-frame").append(tile);
        }

        let inversionCount = 1;
        while (inversionCount % 2 != 0) {
            console.log(inversionCount);
            inversionCount = 0;
            currentFive = [];
            shuffle(goalFive).map((item) => currentFive.push(item));
            console.log(currentFive);
            goalFive.sort((a, b) => a - b);
            for (let i = 0; i < currentFive.length; i++) {
                for (let j = i + 1; j < currentFive.length; j++) {
                    if (currentFive[i] > currentFive[j] && currentFive[i] != 20 && currentFive[j] != 20) {
                        inversionCount++;
                    }
                }
            }

        }
        console.log(inversionCount);
        $("#img-frame").empty();
        for (let i = 0; i < currentFive.length; i++) {
            let idStr = '#tile' + currentFive[i];
            let tile = $(idStr);
            // console.log(tile);
            currFiveTiles.push(tile);
        }
        currFiveTiles.map((item) => {
            $("#img-frame").append(item);
        })

        $(".tile5").on('click', tileFiveClickHandler);


    }
    function makeNine(src) {
        // console.log('in makenine function');
        let j = 0;
        for (let i = 0; i < 9; i++) {

            let xShift = (750 - (250 * (i % 3))).toString();
            let yShift = (750 - (250 * j)).toString();
            // console.log(xShift, yShift);
            if (i === 2 || i === 5) { j++ };
            let tile = $("<div class='tile9'>").css("background-image", "url(" + src + ") ").css("background-position", xShift + 'px' + ' ' + yShift + 'px').html('&nbsp').css('color', 'white').attr('id', 'tile' + i);
            if (i == 6 && j === 2) {
                tile.css("background-image", "none").attr("class", "tile9 empty");
            }
            goalTiles.push(tile);
            $("#tile-frame").append(tile);

        }


        let inversionCount = 1;
        while (inversionCount % 2 != 0) {
            console.log(inversionCount);
            inversionCount = 0;
            currentNine = [];
            shuffle(goalNine).map((item) => currentNine.push(item));
            goalNine = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            console.log(goalNine);
            console.log(currentNine);

            goalNine.sort((a, b) => a - b);
            console.log(goalNine);
            for (let i = 0; i < currentNine.length - 1; i++) {
                for (let j = i + 1; j < currentNine.length; j++) {
                    if (currentNine[i] > currentNine[j] && currentNine[i] != 6 && currentNine[j] != 6) {
                        console.log('inversion: ' + currentNine[i] + ':' + currentNine[j]);
                        inversionCount++;
                    }
                }
            }

        }
        console.log(inversionCount);
        // console.log( goalNine);
        $("#img-frame").empty();
        for (let i = 0; i < currentNine.length; i++) {
            let idStr = '#tile' + currentNine[i];
            let tile = $(idStr);
            // console.log(tile);
            currTiles.push(tile);
        }
        currTiles.map((item) => {
            $("#img-frame").append(item);
        })

        $(".tile9").on('click', tileClickHandler);
    }

    function adjacentCheck(numstr) {
        numstr.replace('tile', '');
        let num = parseInt(numstr[numstr.length - 1]);
        // console.log(num);
        // console.log(currentNine);
        let numIndex = currentNine.indexOf(num);
        // console.log(numIndex);
        let emptyDiv = $(".empty").attr("id");
        //    console.log(emptyDiv);
        let emptyIndex = currentNine.indexOf((parseInt(emptyDiv[emptyDiv.length - 1])));
        //    console.log(emptyIndex);
        if (numIndex === emptyIndex) {
            return false;
        }
        let adjacent = isAdjacent(emptyIndex, numIndex, currentNine.length);
        // console.log(adjacent);
        return adjacent;

    }
    function adjacentCheckFive(numstr) {
        numstr.replace('tile', '');
        let num = parseInt(numstr.split("e")[1]);
        console.log(num);
        // console.log(currentNine);
        let numIndex = currentFive.indexOf(num);
        console.log(numIndex);
        let emptyDiv = $(".empty").attr("id");
        console.log(emptyDiv);
        let emptyIndex = currentFive.indexOf((parseInt(emptyDiv.split('e')[1])));
        console.log(emptyIndex);
        if (numIndex === emptyIndex) {
            return false;
        }
        let adjacent = isAdjacent(emptyIndex, numIndex, currentFive.length);
        // console.log(adjacent);
        return adjacent;
    }
    function isAdjacent(emptyIndex, clickedIndex, arrLen) {
        // console.log(emptyIndex, clickedIndex, arrLen);
        let rowLen = Math.sqrt(arrLen);
        // console.log(rowLen);
        let emptyRowNumber = Math.floor(emptyIndex / rowLen);
        let clickedRowNumber = Math.floor(clickedIndex / rowLen);
        // console.log(emptyRowNumber);
        if (emptyRowNumber === clickedRowNumber && Math.abs(emptyIndex - clickedIndex) <= 1) {

            return true;
        }
        if (emptyRowNumber != clickedRowNumber && Math.abs(emptyRowNumber - clickedRowNumber) == 1) {
            let emptyRowIndex = emptyIndex % rowLen;
            let clickedRowIndex = clickedIndex % rowLen;
            if (emptyRowIndex === clickedRowIndex) {
                return true;
            }
        }
        return false;
    }

    function tileFiveClickHandler() {
        console.log($(this));
        let id = $(this).attr("id");
        let isAdjacent = adjacentCheckFive(id);
        console.log(isAdjacent);
        if (isAdjacent) {
            let emptyDiv = $(".empty");
            let emptyDivId = $(".empty").attr("id");
            let currentDiv = $(this);
            let currentDivId = $(this).attr("id");
            let currIdStr = $(this).attr("id");
            let currentDivIndex = currentFive.indexOf(parseInt(currIdStr.split('e')[1]));
            let emptyDivIndex = currentFive.indexOf(parseInt(emptyDivId.split('e')[1]));
            let currentDivNum = parseInt(currIdStr.split('e')[1]);
            let emptyDivNum = parseInt(emptyDivId.split('e')[1]);
            console.log(emptyDivIndex, currentDivIndex, currentDivNum, emptyDivNum);

            //instead of replacewith, just change the offset of the background image to match.
            let backgroundURL = currentDiv.css("background-image");
            let backgroundOffset = currentDiv.css("background-position");
            emptyDiv.css("background-image", backgroundURL).removeClass("empty").css("background-position", backgroundOffset).attr("id", currentDivId);
            currentDiv.css("background-image", "none").addClass("empty").attr("id", emptyDivId);
            console.log('about to splice again on index');
            console.log('current div index: ' + currentDivIndex);
            console.log('empty div index' + emptyDivIndex);
            console.log('w/ values:');
            console.log('current div value: ' + currentDivNum);
            console.log('empty div value' + emptyDivNum);
            currentFive[emptyDivIndex] = currentDivNum;
            currentFive[currentDivIndex] = emptyDivNum;
            console.log(currentFive);
            let wonGame = gameCheckFive();
            if(wonGame){
                console.log('game won');
            }

        }

    }
    function tileClickHandler() {
        console.log($(this));
        console.log('in tile click handler')
        let id = $(this).attr("id");
        console.log(id);
        let isAdjacent = adjacentCheck(id);
        console.log(currentNine);
        console.log(isAdjacent);
        if (isAdjacent) {
            let emptyDiv = $(".empty");
            let emptyDivId = $(".empty").attr("id");
            let currentDiv = $(this);
            let currentDivId = $(this).attr("id");
            let currIdStr = $(this).attr("id");
            let currentDivIndex = currentNine.indexOf(parseInt(currIdStr[currIdStr.length - 1]));
            let emptyDivIndex = currentNine.indexOf((parseInt(emptyDivId[emptyDivId.length - 1])));
            let currentDivNum = parseInt(currIdStr[currIdStr.length - 1]);
            let emptyDivNum = parseInt(emptyDivId[emptyDivId.length - 1]);
            console.log(emptyDivIndex, currentDivIndex);

            //instead of replacewith, just change the offset of the background image to match.
            let backgroundURL = currentDiv.css("background-image");
            let backgroundOffset = currentDiv.css("background-position");
            emptyDiv.css("background-image", backgroundURL).removeClass("empty").css("background-position", backgroundOffset).attr("id", currentDivId);
            currentDiv.css("background-image", "none").addClass("empty").attr("id", emptyDivId);
            console.log('about to splice again on index');
            console.log('current div index: ' + currentDivIndex);
            console.log('empty div index' + emptyDivIndex);
            console.log('w/ values:');
            console.log('current div value: ' + currentDivNum);
            console.log('empty div value' + emptyDivNum);
            currentNine[emptyDivIndex] = currentDivNum;
            currentNine[currentDivIndex] = emptyDivNum;
            console.log(currentNine);
            let wonGame = gameCheck();
            if (wonGame) {
                gameReset();
            }
        } else {
            console.log($("not adjacent"));
        }
    }
    function gameCheck() {
        console.log(currentNine, goalNine);
        // gameNineWon = true;
        for (let i = 0; i < currentNine.length; i++) {
            if (currentNine[i] != goalNine[i]) {
                //change back to return false when done checking second game
                return false;
            }
        }
        //uncomment gameninewin here and remove earlier change to gamenine in function
        gameNineWon = true;
        return true;
    }
    function gameCheckFive(){
        for( let i=0;i<currentFive.length; i++){
            if(currentFive[i] != goalFive[i]){
                return false
            }
        }
        return true;
    }
    function gameReset() {
        $("#img-frame").empty();
        currentNine = [];
        goalNine = [];
        $('#game-win').css('display', 'inline-block');
        $('.close-btn').on('click', ()=>{
            document.location = document.location;
        })

    }

})

