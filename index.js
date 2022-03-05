document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 150
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let isJumping = false

    function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
        console.log('doodler added to grid')
    }

    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')
            
            // create visual for platform
            // NOTE FOR ATHLEAGUE: 
            // create a switch statement for the visual of each checkpoint. 
            // depending on its order in the array, its visual will either be default 
            // (if between first and last item in array), the 'start' checkpoint (1st item in array), 
            // or the 'finish' (last item in checkpoints array)
            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            
            // add platform with visual that was just created to the grid
            grid.appendChild(visual)
        }
    }

    function createPlatforms() {
        for (var i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount
            let newPlatBottom = 100 + i * platGap
            let newPlatform = new Platform(newPlatBottom)

            // each time the loop iterates, a new platform is pushed into the platforms array
            platforms.push(newPlatform)
            console.log(platforms)
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 200) {
            // for each platform in the platforms array
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'
            })
        }
    }

    function jump() {
        isJumping = true
        upTimerId = setInterval(function () {
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace > 350) {
                fall()
            }

       // every 30 ms
        },30)
    }

    function fall() {
        // cancel jump interval
        clearInterval(upTimerId)
        isJumping = false
        downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0) {
                gameOver()
            }

            // collision check - only if falling
            platforms.forEach(platform => {
            if (
                // if doodler is colliding with the 15px that make up a platform
                (doodlerBottomSpace >= platform.bottom) &&
                (doodlerBottomSpace <= platform.bottom + 15) &&
                // if anywhere to the left of the platform
                ((doodlerLeftSpace + 60) >= platform.left) &&
                // if anywhere to the right of the platform
                (doodlerLeftSpace <= (platform.left + 85)) &&
                !isJumping 
            ) {
                console.log('landed')
                jump()
            }
    })
            
        },30)
    }

    

    function gameOver() {
        console.log('game over')
        isGameOver = true
        clearInterval(upTimerId)
        clearInterval(downTimerId)
    }

    function control(e) {
        if (e.key === "ArrowLeft") {
            // move left
        } else if (e.key === "ArrowRight") {
            // move gith
        }  else if (e.key === "ArrowUp") {
            //moveStraight
        }
    }

    function start() {
        if (!isGameOver) {
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 30)
            jump()
        }
    }
    // attach to a button
    start()
    

})