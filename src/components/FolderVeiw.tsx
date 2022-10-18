import React,{useState} from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

type contentData={
    title:string;
    id:number;
    
}
interface props{
    content:contentData
    selectCheck:any
    setSelectCheck:any
}
const TodoLinkContainer = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
background-color: #e2e2e2;
border-radius: 10px;
margin: 10px;
width: 80%;
height: 80%;
overflow : hidden;

`
const TodoLink = styled(Link)`
    margin-left: 20px;
    text-overflow: ellipsis;
    
`
const FolderVeiw = ({content,selectCheck,setSelectCheck}:props) => {
    const [checkBoxOnOff,SetCheckBoxOnOff]=useState<boolean>(false)
    const handelClickCheckBox = ()=>{
        console.log("chackbox Clcik")
        console.log(selectCheck)
        if(!checkBoxOnOff){
            setSelectCheck([...selectCheck,content.id])
            SetCheckBoxOnOff(!checkBoxOnOff)
        }else{
            setSelectCheck(selectCheck.filter((id:number)=> id !== content.id));
            SetCheckBoxOnOff(!checkBoxOnOff);
        }

    }
    return (
        <TodoLinkContainer>
            <input onClick={()=>handelClickCheckBox()} type={"checkbox"}></input>
            <TodoLink to={`content/${content.id}`}>
                <h2>{content.title}</h2>
            </TodoLink>
        </TodoLinkContainer>
    );
};

export default FolderVeiw;