/* eslint-disable no-restricted-globals */
import React ,{useEffect,useState,useRef}from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Todo from '../components/Todo';
import styled from "styled-components";
const ContentsContaniner = styled.div`
    display: grid;
    margin-top: 50px;
    margin-left: 80px;
    grid-template-columns:300px 300px 300px 300px 300px 300px;
    grid-template-rows: 300px;
    width: 100vh;
    height: 100vh;  
`
const Main = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: #dad4af;
    justify-content :flex-start;
    .notTodo{
        margin: 50px;
        color: #fc7106;
        font-size: xx-large;
    }
`

const Header = styled.header`
    display: flex;
    flex-direction: column;
    height: 130px;
    background-color: #dddddd;
    border-bottom:1px solid black;
    .title{
        display: grid;
        grid-template-columns: 33% 33% 33%;
        justify-content: center;
        align-items: center;
        text-align: center;
        button{
        font-size: small;
        width: 100px;
        height: 20px;
        border: 0;
        border-radius: 5px;
        margin-right: 400px;
        background-color: #f4b643;
        }
    }
    .form{
        display: flex;
        align-items: center;
        justify-content: center;
        button{
        font-size: small;
        width: 100px;
        height: 20px;
        border: 0;
        border-radius: 5px;
        background-color: #fff59f;
        margin: 5px;
        }
        input{
            width: 200px;
            margin-right: 40px;
        }
    }

`
const Content = () => {
    const initilalState = {
        "title":"title",
        "todos":[]
    }
    const [selectCheck,setSelectCheck]=useState<any[]>([])
    const [content,setContent] = useState<contentType>(initilalState)
    const [todo,setTodo] = useState("")
    let { id } = useParams();
    interface contentType{
        title:string;
        todos:any
    }
    const inputRef = useRef<HTMLInputElement>(null);
    const addTodoHandleClick = ()=>{
        if(todo.length===0) {return alert("할 일을 입력해주세요")}
        fetch(`http://localhost:3001/data/${id}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"id":id,title:content.title,todos:[...content.todos,{"content":todo}]}),
        })
        .then((res)=>res.json())
        .then((data)=>{
            setContent(data)
            setTodo("")
        })
        inputRef.current?.focus()
    }
    const deleteTodoHandleClick=(idx:number)=>{
        setContent(Object.assign(content,{
            "todos":content.todos.filter((data:number,id:number)=> id !== idx)
        }))
        fetch(`http://localhost:3001/data/${id}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"id":id,title:content.title,todos:[...content.todos]}),
        })
        .then(()=>location.reload())
    }
    const handleInputEnter = (e: { key: string; }) =>{
        if(e.key === 'Enter'){
            addTodoHandleClick()
        }
    }
    const handleAllDelete = ()=>{
        if(confirm("전체 삭제 하시겠습니까?")){
            fetch(`http://localhost:3001/data/${id}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"id":id,title:content.title,todos:[]}),
            })
            .then((res)=>res.json())
            .then((data)=>{
                setContent(data)
                setTodo("")
             })
        }
    }
    const handleClickSelectDelete = ()=>{
        if(confirm("삭제 하시겠습니까?")){
            const NewTodo: any[] = []
            const filtefTodo =content.todos.filter((dada:any,idx:number)=> selectCheck.indexOf(idx) === -1)
            NewTodo.push(...filtefTodo)
            console.log(NewTodo)
                fetch(`http://localhost:3001/data/${id}`,{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({"id":id,title:content.title,todos:NewTodo}),
                })
                .then(()=>location.reload())
       

        }
    }
    useEffect(()=>{
        fetch(`http://localhost:3001/data/${id}`)
        .then((res)=>res.json())
        .then((data)=>{
            setContent(data)
        })
    },[id])
    const navigate = useNavigate();
    const handleClickGodingBack = ()=>{
        navigate("/")
    }
    return (
        <div>
            <Header>
                <div className='title'>
                    <button onClick={handleClickGodingBack}>목록으로 이동</button>
                    <h1>제목 : {content.title}</h1>
                </div>
                <div className='form'>
                    <input placeholder='할 일을 등록 해주세요.' ref={inputRef} value={todo} onChange={(e)=>setTodo(e.target.value)} onKeyDown={handleInputEnter}></input>
                    <button onClick={()=>addTodoHandleClick()}>추가</button>
                    <button onClick={handleClickSelectDelete}>선택 삭제</button>
                    <button onClick={handleAllDelete}>할 일 전체 삭제</button>
                </div>
            </Header>
            <Main>
                {content.todos.length!==0 ? 
                    <ContentsContaniner>
                        {content.todos.map((todo:any,idx:number)=>{
                            return(
                            <Todo 
                                key={idx}
                                todo={todo} 
                                idx={idx} 
                                deleteTodoHandleClick={deleteTodoHandleClick}
                                content={content}
                                selectCheck={selectCheck}
                                setSelectCheck={setSelectCheck}
                                >
                            </Todo>)})}
                    </ContentsContaniner> :
                    <div className='notTodo'>할 일을 등록 해주세요.</div>}
            </Main>
            
        </div>
    )
}

export default Content;