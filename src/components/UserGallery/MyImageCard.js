import React from 'react';
import { useHistory } from "react-router-dom";
import ColoredInImage from '../Images/ColoredInImage';


export default function MyImageCard(props) {

    let image = props.userImage.image
    const history = useHistory();

    const showFeatured = () => {
        history.push(`/featuredimage/${props.userImage.id}`)   
    }

   
    return(
        <div className="image-card">
            <h4>{image.national_park} National Park</h4>
            <div className="image-container">
                <ColoredInImage component={image.component} onFill={()=>{}} fillColors={props.userImage.fill_colors}/>
            </div>  
            <button onClick={showFeatured}>View Image</button>
        </div>
    )

}

