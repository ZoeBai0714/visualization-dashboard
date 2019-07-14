import React from "react";

const Metrcis = ({chosenMetrics}) =>{
    console.log(chosenMetrics)
    const colors = {1:'orange', 2:'#e320bf', 3:"blue", 4:"green", 5:"purple", 6:"black"}
    return(
        <div>
            {chosenMetrics.map((metric, index) => <span style = {{color:colors[index+1]}}> ---{metric}</span>)}
        </div>
    ) 
}

export default Metrcis;