import React ,{useState,useEffect} from 'react';
import FolderVeiw from '../components/FolderVeiw';
import CreatTodoModal from '../components/CreatTodoModal';
import styled from "styled-components";

const TodoListContainer=styled.div`
    display: grid;
    margin-top: 50px;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: 100px;
`

const Main = () => {
    const [contents,SetContents]=useState<any[]>([])
    const [creatTodoModal,SetCreatTodoModal]=useState<boolean>(false)
    const [selectCheck,setSelectCheck]=useState<any[]>([])
    useEffect(()=>{
        fetch("http://localhost:3001/data")
        .then((res)=>res.json())
        .then((data)=>SetContents(data))
    },[])
    const handleClickAddTodoFile = ()=>{
          SetCreatTodoModal(!creatTodoModal)
    }
    const handleClickDeleteTodoFile = ()=>{
        for(let i = 0; i<selectCheck.length; i++){
            fetch(`http://localhost:3001/data/${selectCheck[i]}`,{
            method:"DELETE"})
            .then(()=>"http://localhost:3001/data")
            .then((url)=>fetch(url))
            .then((res)=>res.json())
            .then((data)=>SetContents(data))
        }
        setSelectCheck([])
        console.log(selectCheck)
    }

    return (
        <> 
            <h1>Todo List</h1>
            <CreatTodoModal creatTodoModal={creatTodoModal} SetCreatTodoModal={SetCreatTodoModal} SetContents={SetContents} ></CreatTodoModal>
            <button onClick={handleClickAddTodoFile}>목록 추가</button>
            <button onClick={handleClickDeleteTodoFile}>선택 목록 삭제</button>
            <TodoListContainer>
                {contents.map((content)=><FolderVeiw key={content.id} content={content} selectCheck={selectCheck} setSelectCheck={setSelectCheck}></FolderVeiw>)}
            </TodoListContainer>
        </>
    );
};

export default Main;