import React from 'react'

function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return ( 
        <div className='die-face' style={styles} onClick={props.holdDice}>
            <h2 className='die-font'>{props.values}</h2>
        </div>
    )
}

export default Die
