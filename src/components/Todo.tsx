/* eslint-disable @typescript-eslint/no-unused-expressions */
import React ,{useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import styled from "styled-components";
const TodoContaniner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f9ff8e;
    border-radius: 5px;
    width: 200px;
    margin: 20px;
    height: 200px;

    .todoHeader{
        display: flex;
        border-radius: 5px 5px 0 0;
        justify-content: flex-end;
        align-items: center;
        background-color: #e5ed4e;
        width: 100%;
        height: 30px;
        button{
            font-size: small;
            width: 35px;
            height: 20px;
            border: 0;
            border-radius: 5px;

        }
        input{
            margin-right: 80px;
        }
    }
    .delete{
        background-color: #f39508;
        margin-right: 10px;
        }
    .update{
        background-color:yellow;
        margin-right: 10px;
    }

`

const TodoDiv = styled.div<{changeBtn:boolean|undefined}>`
    display: ${props => props.changeBtn? "none":"block"};
    width: 170px;
    height: 147px;
    padding: 15px;
    overflow: scroll;
`
const TodoInput = styled.textarea<{changeBtn:boolean|undefined}>`
    display: ${props => props.changeBtn? "block":"none"};
    font-size: large;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    color:gray;
    background-color: rgba(0,0,0,0);
    border: 0;
    margin: 15px;
    width: 170px;
    height: 147px;
    :focus{
        outline: none;
    }
`

const Todo = ({todo,idx,deleteTodoHandleClick,content,selectCheck,setSelectCheck}:any) => {

    const todoContent = useRef<HTMLInputElement>(null);

    const [text,setText] = useState<string|undefined>(todo.content)
    const [checkBoxOnOff,SetCheckBoxOnOff]=useState<boolean>(false)
    const [hidden,setHidden] = useState<boolean|undefined>(false)
    const [upDataTodo,SetUpDataTodo] = useState(content.todos)
    const { id } = useParams();
    const updateHandleClick = (event:any,idx:number)=>{
        if(hidden&&(event.target.nodeName==="INPUT"||event.target.nodeName==="BUTTON")){
            upDataTodo[idx].content=text
            fetch(`http://localhost:3001/data/${id}`,{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"id":id,title:content.title,todos:[...upDataTodo]}),
            })
            setHidden(!hidden);
        }else if(event.target.nodeName==="DIV"||event.target.nodeName==="BUTTON"){
            upDataTodo[idx].content=text
            fetch(`http://localhost:3001/data/${id}`,{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"id":id,title:content.title,todos:[...upDataTodo]}),
            })
            setHidden(!hidden);
        }
    }
    const handleUpdataEnter = (e: any) =>{
        if(e.key === 'Enter'){
            setHidden(!hidden);
            updateHandleClick(e,idx);
        }
    }
    const handelClickCheckBox = ()=>{
        console.log("chackbox Clcik");
        console.log(checkBoxOnOff);
        if(!checkBoxOnOff){
            setSelectCheck([...selectCheck,idx]);
            SetCheckBoxOnOff(!checkBoxOnOff);
            console.log(selectCheck);
        }else{
            setSelectCheck(selectCheck.filter((id:number)=> id !== idx));
            SetCheckBoxOnOff(!checkBoxOnOff);
            console.log(selectCheck);
        }

    }
    return (
        <TodoContaniner>
            <div className='todoHeader'>
                <input onClick={()=>handelClickCheckBox()} type={"checkbox"}></input>
                <button className='update' onClick={(event)=>updateHandleClick(event,idx)}>{hidden?"확인":"수정"}</button>
                <button className='delete' onClick={()=>deleteTodoHandleClick(idx)}>삭제</button>
            </div>
            <TodoDiv changeBtn={hidden} ref={todoContent}>{text}</TodoDiv>
            <TodoInput 
                onKeyDown={handleUpdataEnter} 
                value={text}
                changeBtn={hidden} 
                onChange={(e)=>setText(e.target.value)}>
            </TodoInput>
        </TodoContaniner>
    );
};

export default Todo;