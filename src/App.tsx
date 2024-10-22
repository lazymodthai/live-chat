import { Grid2 } from '@mui/material'
import './App.css'
import ChatBox from './components/ChatBox'
import ChatText, { ChatTextProps } from './components/ChatText';
import { useEffect, useState } from 'react';
import ChatTextField from './components/ChatTextField';

function App() {
  const [texts, setTexts] = useState<ChatTextProps[]>([])

  const mockTexts:ChatTextProps[] = [
    {text: 'สวัสดี', type: 1, name: 'กูเอง', time: new Date()},
    {text: 'ทำอะไรอยู่', type: 1, name: 'กูเอง', time: new Date()},
    {text: 'เสือกจัง', type: 2, name: 'เธอคนนั้น', time: new Date()},
    {text: 'ว่างหรือไง', type: 2, name: 'เธอคนนั้น', time: new Date()},
    {text: 'นั่นสิ', type: 2, name: 'ควายเผือก', time: new Date()},
    {text: '“ไข่ตุ๋น” เป็นเมนูอาหารง่าย ๆ เหมาะสำหรับทุกเพศทุกวัย ด้วยรสชาติที่นุ่มละมุน\nและขั้นตอนที่ใช้เวลาไม่นาน แถมยังใช้วัตถุดิบแค่ไม่กี่อย่าง จัดว่าเป็นเมนูอาหารง่าย ๆ ประหยัดงบแบบสุด ๆ', type: 1, name: 'กูเอง', time: new Date()},
  ]

  useEffect(()=>{
    setTexts(mockTexts)
  },[])

  return (
    <>
        <Grid2 container size={12} width={'90vw'} margin={'auto'}>
          <Grid2 size={9}>
            <ChatBox refresh={texts.length}>
              {texts?.map((i:ChatTextProps, index:number)=>(<ChatText key={index} text={i.text} type={i.type} name={i.name} time={i.time}/>))}
            </ChatBox>
          </Grid2>
          <Grid2 size={3}>UserList</Grid2>
          <Grid2 size={9} marginTop={2}><ChatTextField name={'กูเอง'} onSend={(text,name,time)=>setTexts([...texts, {text, name, type: 1, time}])} /></Grid2>
        </Grid2>
    </>
  );
}

export default App
