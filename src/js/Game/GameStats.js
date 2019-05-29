import React from 'react';

export default (props) => {
    return (
        <div>
            <div>
                Level: {props.level}
            </div>
            <div>
                Ducks hunted: {props.score}
            </div>
            <div>
                Bonus points: {props.bonusPoints}
            </div>
            <div>
                {props.missedShotsLeft !== 0 &&
                    <span>Missed ducks left: {props.missedShotsLeft}</span>
                }
            </div>

        </div>
    );
}
