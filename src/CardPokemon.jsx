import React from 'react'

const CardPokemon = ({id, image, name }) => {
    
    return (
        <div className="thumb-container">
            <br />
            <br />
            <div className="number"><small>{id<=9 && "#0"+id}{id>=10 && "#"+id}</small></div>
            <img src={image} alt={name} />
            <div className="detail-wrapper">
                <h3>{name.toUpperCase()}</h3>
            </div>
        </div>
    )
}

export default CardPokemon