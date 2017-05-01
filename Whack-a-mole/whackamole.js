  const holes = document.querySelectorAll('.hole');
        const scoreBoard = document.querySelector('.score');
        const moles = document.querySelectorAll('.mole');
        let lastHole;
        let timeUp = false;
        let score =0;
        
        //generate random time for game length
        function randTime(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
        
        //sets up random holes 
        function randHoles(holes) {
            const idx = Math.floor(Math.random() * holes.length);
            const hole = holes[idx];
            if (hole === lastHole) {
                return randHoles(holes);
            }
            
            lastHole = hole;
            return hole;
        }
        
        //pops up moles w/ randomw time and random hole
        function peep() {
            const time = randTime(200, 1000);
            const hole = randHoles(holes);
            hole.classList.add('up');
            setTimeout(() => {
                hole.classList.remove('up')
                if (!timeUp) peep();
            }, time);
        }
        
        //starts the game
        function startGame() {
            scoreBoard.textContent = 0;
            timeUp = false;
            peep();
            setTimeout(() => timeUp = true, 2000);
        }
        
        //controls the hit on the moles
        function bonk(e) {
            console.log(e);
            if (!e.isTrusted) return;
            score++;
            console.log(score);
            this.classList.remove('up');
            scoreBoard.textContent = score;
            
        }
        
        moles.forEach(mole => mole.addEventListener('click', bonk));