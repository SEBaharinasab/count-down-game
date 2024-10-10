import React, { useRef, useState } from 'react';
import Dialog from './Dialog';

export default function TimerChallenge({ title, targetTime }) {
   const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
   const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

   /**
    * reference to timer
    */
   const timer = useRef();
   /**
    * reference to dialog box for showing modal or close it
    */
   const dialog = useRef();

   /** 
    * If the timer reaches zero and the player loses, "STOP THE GAME" 
    * */
   if (timeRemaining <= 0) {
      handleStop();
   }
   /**
    * Reset the remaining time for a new start
    */
   function handleReset() {
      setTimeRemaining(targetTime * 1000);
   }
   /**
    * Starting a new game and "Set Timer Interval"
    */
   function handleStart() {
      handleReset();
      timer.current = setInterval(() => {
         setTimeRemaining(prevTimeRemaining => (prevTimeRemaining - 10));
      }, 10);
   }
   /**
    * stopping the game and "Clear Timer Interval"
    */
   function handleStop() {
      clearInterval(timer.current);
      dialog.current.open();
   }
   return (
      <>
         <Dialog ref={dialog} targetTime={targetTime} timeRemaining={timeRemaining} onReset={handleReset} />
         <section className='challenge'>
            <h2>{title}</h2>
            <p className="challenge-time">{targetTime} second{targetTime > 1 ? "s" : ""}</p>
            <p>
               <button onClick={timerIsActive ? handleStop : handleStart}>
                  {timerIsActive ? "Stop" : "Start"} Challenge
               </button>
            </p>
            <p className={timerIsActive ? "active" : undefined}>
               {timerIsActive ? "Time is running..." : "Timer inactive."}
            </p>
         </section>
      </>
   );
}
