// import { DragEvent } from "react";

import { useState, useEffect } from "react";
import { useAppDispatch } from "../../actions/redux";

interface DragItemProps {
    stageId: number
    taskId: number
    children: any
}


const DragItem = ({ stageId, taskId, children }: DragItemProps) => {
    const [currentStage, setCurrentStage] = useState<number | null>(null);
    const [currentTask, setCurrentTask] = useState<number | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => { 
        // console.log(currentStage, currentTask)
        // console.log(stageId, taskId)

    }, [currentStage, currentTask])

    function changeIndex(taskId: number, stageId: number) { // , index: number
        console.log(taskId, stageId, currentTask, currentStage);
    }

    function dragOverHandler(e: any): void { // : DragEvent<HTMLDivElement>
        e.preventDefault();
        console.log(e.target.className)

        if (e.target.className.includes('task')) {
            e.target.style.boxShadow = '0 2px 3px gray';
        }
    }

    function dragLeaveHandler(e: any): void {
        e.target.style.boxShadow = 'none'

    }

    function dragStartHandler(e: any, stageId: number, taskId: number): void {
        setCurrentStage(stageId);
        setCurrentTask(taskId);
    }

    function dragEndHandler(e: any): void {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler(e: any, stageId: number, taskId: number): void {
        e.preventDefault();
        // const currentIndex = task.index;
        // changeIndex(taskId, stageId);
        console.log(e.target) //.parentElement.target.id
    }

    return (
        <div
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, stageId, taskId)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, stageId, taskId)}
            draggable={true}
            style={{ cursor: "grab" }}
        >
            {children}
        </div>
    );
}

export default DragItem;