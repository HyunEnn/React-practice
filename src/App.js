import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  console.log('props', props, props.title);
  return <header>
    <h1><a href="/" onClick={function(event){
      event.preventDefault(); 
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props) {
  const lis = []
  for(let i=0;i<props.topics.length;i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id)); //event의 target은 이벤트를 유발시킨 태그(a)를 가르키고, 그 중 id 값을 가져오고 싶다.   
      }}>{t.title}</a></li>)
  }
  return <nav>
        <ol>
          {lis}
        </ol>
      </nav>
}
function Article(props) {
  return <article>
  <h2>{props.title}</h2>
        {props.body}
  </article>
}
function App() {
  // const _mode = useState("WELCOME"); // mode를 state 값으로 설정 
  // const mode = _mode[0]; // useState를 통해 _mode 는 [현재 모드 값, 바꿀 모드 값] 이렇게 2개의 length를 가진 배열을 부른다.
  // const setMode = _mode[1]; // 0번 index를 통해 현재 state 값, 1번 index를 통해 바꿀 state 값을 지정
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null); // id 값은 null인 상태
  const topics = [
    {id:1, title:'html', body: 'html is ...'},
    {id:2, title:'css', body: 'css is ...'},
    {id:3, title:'js', body: 'js is ...'}
  ]
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }
  else if(mode === 'READ') {
    let title, body = null;
    for(let i=0;i<topics.length;i++) {
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={function(){
        setMode("WELCOME");
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode("READ");
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
