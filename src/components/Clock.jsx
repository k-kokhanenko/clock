import '../css/bulma.css'
import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';

export const Clock = () => {
  let timerId;
  const [clocks, setСlocks] = useState([]);
  const [time, setTime] = useState(Date.now());
  
  useEffect(() => {
     timerId = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
  }, []); 

  const handleOnAddNewClock = () => {  
    
    const initValue = new Date().toLocaleTimeString();
    console.log(`initValue- ${initValue}`);

    const inputName = document.querySelector('.name');
    const inputZone = document.querySelector('.zone');

    const newСlock = {"id" : uniqid(), "name": inputName.value, "zone": inputZone.value };
    setСlocks([...clocks, newСlock]);
  }

  const handleOnDeleteNote = (event) => {    
    const id = event.target.dataset.id;
    setСlocks(l => l.filter(item => item.id !== id));
  }  

  const showClocksItems = clocks.map(function(clock) {
    const formatter = new Intl.DateTimeFormat('ru', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return <div className="cell box" key={clock.id}>
        <div>{clock.name}</div>
        <div>Временная зона: {clock.zone}</div>
        <div>{formatter.format(time + clock.zone * 3600000)}</div>
        <button className="button is-danger is-small" data-id={clock.id} onClick={handleOnDeleteNote}>Удалить</button>
    </div>;
 });
  
  return (
    <>  
      <div className="field box">
          <label className="label">Новые часы</label>
          <div className="control">
              <input className="input name" type="text" name="name" placeholder="Введите название часов"/>
              <input className="input zone" type="text" name="zone" placeholder="Введите временную зону"/>
              <button className="button is-primary is-small" onClick={handleOnAddNewClock}>Добавить</button> 
          </div>
      </div>

      <div className='grid'>
        {showClocksItems}
      </div>      
    </>
  )
}
