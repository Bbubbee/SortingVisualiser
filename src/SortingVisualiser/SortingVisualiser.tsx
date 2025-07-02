import { useState, useEffect } from "react";
import "./SortingVisualiser.css";

const SortingVisualiser = () => {
    const [array, setArray] = useState<number[]>([]);

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < 150; i++) { // feel free to increase/decrease
            newArray.push(randomIntFromInterval(5, 400)); // lower max height for screen fit
        }
        setArray(newArray);
    };

    useEffect(() => {
        resetArray();
    }, []);

    return (
        <div className="visualiser_wrapper">
            <h1>Sorting Visualiser</h1>
            <button onClick={resetArray}>Reset Array</button>

            <div className="array_container">
                {array.map((value, i) => (
                    <div
                        className="array_bar"
                        key={i}
                        style={{ height: `${value}px` }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualiser;
