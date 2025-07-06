import { useState, useEffect } from "react";
import "./SortingVisualiser.css";
import { bubbleSort } from "../sortingAlgorithms/sortingAlgorithms"

const SortingVisualiser = () => {
    const [array, setArray] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("bubble");
    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < 50; i++) {
            newArray.push(randomIntFromInterval(5, 400));
        }
        setArray(newArray);
        setHighlightedIndices([]);
    };

    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAlgorithm(event.target.value);
    };

    const sort = async () => {
        switch (selectedAlgorithm) {
            case "bubble":
                await bubbleSort(array, setArray, setHighlightedIndices);
                break;
            case "merge":
                // Merge sort logic here
                break;
            case "quick":
                // Quick sort logic here
                break;
            case "heap":
                // Heap sort logic here
                break;
            default:
                // Optional: handle unknown algorithm
                break;
        }
    }

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

                <button onClick={sort}>Sort</button>

            </div>

            <div className="array_container">
                {array.map((value, i) => (
                    <div
                        className="array_bar"
                        key={i}
                        style={{ height: `${value}px`, backgroundColor: highlightedIndices.includes(i) ? "red" : "pink" }}
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
