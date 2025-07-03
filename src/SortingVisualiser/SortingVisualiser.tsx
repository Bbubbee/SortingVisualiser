import { useState, useEffect } from "react";
import "./SortingVisualiser.css";

const SortingVisualiser = () => {
    const [array, setArray] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("bubble");

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < 150; i++) {
            newArray.push(randomIntFromInterval(5, 400));
        }
        setArray(newArray);
    };

    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAlgorithm(event.target.value);
    };

    useEffect(() => {
        resetArray();
    }, []);

    return (
        <div className="visualiser_wrapper">
            <h1>Sorting Visualiser</h1>

            <div className="controls">
                <button onClick={resetArray}>Reset Array</button>

                <select
                    id="algorithm-select"
                    value={selectedAlgorithm}
                    onChange={handleAlgorithmChange}
                >
                    <option value="bubble">Bubble</option>
                    <option value="merge">Merge</option>
                    <option value="quick">Quick</option>
                    <option value="heap">Heap</option>
                </select>

                <button >Sort</button>

            </div>

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
