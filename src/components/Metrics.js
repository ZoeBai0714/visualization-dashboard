import React from "react";

const Metrcis = ({chosenMetrics}) =>{
    const colors = {1:'orange', 2:'#e320bf', 3:"blue", 4:"green", 5:"purple", 6:"black"}
    return(
        <div>
            {chosenMetrics.map((metric, index) => <span key = {index} style = {{color:colors[index+1]}}> ___{metric}</span>)}
        </div>
    ) 
}

export default Metrcis;