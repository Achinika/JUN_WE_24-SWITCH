import React from 'react';
import "./Content.css";

export default function Content(){
    return(
        <div  className="content">
            <div className='content-main'>
                <div className='post-box'> 
                </div>
                <div className='feed-box'>
                    <div className='feed-tabs'>
                        <div className='tab active'>Followings</div>
                        <div className='tab'>Trends</div>
                    </div>
                    <div className="feed-content">
                    </div>   
                </div>
            </div>

            <div className='suggestions'>

            </div>

            <div className='chatBox'>

            </div>
        </div>
    )
}