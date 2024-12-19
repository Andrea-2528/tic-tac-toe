LIVE: https://andrea-2528.github.io/tic-tac-toe/

- Basic game of tic-tac-toe where a player can play against the AI (here used in the old fashioned meaning of the term).
- Player can customize it's name and choose whether the AI starts or not.
- Game is played on a 3x3 grid.
- The styling for this project is really minimal. I'd call it a work in progress, but at this point it hasn't seen neither work nor progress since its creation.
    Therefore, given the uselessness of this project looks, I'll leave it as is, so that one can more easily focus on the perfection of choice 
    guided by the minimax algorithm, that makes a SOLVED game like tic-tac-toe not boring AT ALL.
    Sure, you mathematically can't win, but sometimes a draw is so unreachable that the mere idea of its future existance is enough to make you smile, and try, and look:
    Seem you managed to draw instead of losing, good job! :) 

- As a future idea, one could try implementing ultimate tic-tac-toe (basically, there's a grid inside each cell of the grid and unique rules are therefore applied).
    - This would make the game more unpredictable and more interesting:
        - I'd be preventing the AI from searching the whole depth of the minimax tree (which is what it's doing now) for performance and percieved randomness.
        - For example right now, if the AI starts, I made sure its first move is a random cell. This is beacuse if I let the first minimax calculation happen,
            it would result in the most complex (and time consuming) of its calculations AND it would always return the same position (top-left), which also leaves the player
            with the choice of doing the only correct move (center) and try to tie, or do anything else and inevitably lose.

            This is not much fun.

            Mathematical perfection and good user experience are not mutually exclusive, but a solved game tends to kill the experience anyway.

