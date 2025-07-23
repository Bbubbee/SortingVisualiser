import { useState, useEffect } from "react";
import "./SortingVisualiser.css";
import { bubbleSort, insertSort, mergeSort } from "../sortingAlgorithms/sortingAlgorithms"
import Slider from '@mui/material/Slider';

import type { Highlight } from "../types";

const SortingVisualiser = () => {
    const [array, setArray] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("merge");
    const [arraySize, setArraySize] = useState<number>(20);
    const [speed, setSpeed] = useState<number>(50);

    const [highlightedIndices, setHighlightedIndices] = useState<Highlight[]>([]);

    const resetArray = (size: number) => {
        const newArray = [];
        for (let i = 0; i < size; i++) {
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
                await bubbleSort(array, setArray, setHighlightedIndices, speed);
                break;
            case "insert":
                await insertSort(array, setArray, setHighlightedIndices, speed);
                break;
            case "merge":
                // Merge sort logic here
                setArray(mergeSort(array));
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

    // Slider change handler
    const handleArraySizeChange = (_event: Event, value: number) => {
        setArraySize(value);
        resetArray(value);
    };

    const handleSpeedChange = (_event: Event, value: number) => {
        setSpeed(value);
    };

    useEffect(() => {
        resetArray(arraySize);
    }, []);



    return (
        <div className="visualiser_wrapper">
            <h1>Sorting Visualiser</h1>

            Size
            <Slider
                value={arraySize}
                aria-label="Array Size"
                valueLabelDisplay="auto"
                max={200}
                min={1}
                onChange={handleArraySizeChange}
            />

            Speed
            <Slider
                value={speed}
                aria-label="Speed"
                valueLabelDisplay="auto"
                max={100}
                min={1}
                onChange={handleSpeedChange}
            />

            <div className="controls">
                <button onClick={() => resetArray(arraySize)}>Reset Array</button>

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
                        >
                            <span className="bar_tooltip">{value}</span>
                        </div>
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
