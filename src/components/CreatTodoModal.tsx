import React,{useState,useRef} from 'react';
import styled from "styled-components";

const ModalContainer=styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 100px;
    width: 200px;
    background-color: lightgray;
    border-radius: 20px;
    border: 1px solid gray;
    div{
        margin-top: 20px;
    }
    button{
        margin-right: 5px;
        margin-left: 5px;
    }
    span{
        margin-right: 5px;
    }
`
const ModalPosition=styled.div<{creatTodoModal:boolean}>`
    display: ${props => props.creatTodoModal? "flex":"none"};
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
 

`

const CreatTodoModal = ({creatTodoModal,SetCreatTodoModal,SetContents}:any) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [todosName,setTodoNmae] = useState("")
    const handleClcikAddTodoFatch = ()=>{
        setTodoNmae("")
        const body ={
            "title": todosName,
            "todos": []
            }
    
        fetch(`http://localhost:3001/data`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        .then(()=>"http://localhost:3001/data")
        .then((url)=>fetch(url))
        .then((res)=>res.json())
        .then((data)=>SetContents(data))

        SetCreatTodoModal(!creatTodoModal)
    }
    
    return (
        <ModalPosition creatTodoModal={creatTodoModal}>
            <ModalContainer >
                <div>
                    <span>제목</span>
                    <input ref={inputRef} value={todosName} onChange={(e)=>setTodoNmae(e.target.value)}></input>
                </div>
                <div className='button'>
                    <button onClick={handleClcikAddTodoFatch}>확인</button>
                    <button onClick={()=>SetCreatTodoModal(!creatTodoModal)}>취소</button>
                </div>
            </ModalContainer>
        </ModalPosition>
    );
};

export default CreatTodoModal;