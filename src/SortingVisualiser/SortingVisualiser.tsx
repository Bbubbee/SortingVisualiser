import { useState, useEffect } from "react";
import "./SortingVisualiser.css";
import { bubbleSort, insertSort } from "../sortingAlgorithms/sortingAlgorithms"

import type { Highlight } from "../types";

const SortingVisualiser = () => {
    const [array, setArray] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("insert");

    const [highlightedIndices, setHighlightedIndices] = useState<Highlight[]>([]);


    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < 100; i++) {
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
            case "insert":
                await insertSort(array, setArray, setHighlightedIndices);
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
        setHighlightedIndices([]);
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
                    <option value="insert">Insert</option>
                    <option value="heap">Heap</option>
                </select>

                <button onClick={sort}>Sort</button>

            </div>

            <div className="array_container">
                {array.map((value, i) => {
                    const highlight = highlightedIndices.find(h => h.index === i);
                    return (
                        <div
                            className="array_bar"
                            key={i}
                            style={{
                                height: `${value}px`,
                                backgroundColor: highlight ? highlight.color : "pink"
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualiser;
