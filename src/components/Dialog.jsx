import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const Dialog = forwardRef(function Dialog({ targetTime, timeRemaining, onReset }, ref) {

   /* reference to dialog box again after forwardRef */
   const dialogRef = useRef();

   /* user lost when remaining time goes to zero */
   const userLost = timeRemaining <= 0;

   /* format remaining time to show better */
   const formattedRemainingTime = (timeRemaining / 1000).toFixed(2);

   /* calculate score for winner */
   const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

   useImperativeHandle(ref, () => {
      return {
         open() {
            dialogRef.current.showModal();
         }
      };
   });

   /* create portal for showing dialog box in another element. (div#modal created in index.html) */
   return createPortal(
      <dialog ref={dialogRef} className='result-modal'>
         {userLost ? (<h2>you lost</h2>) : (<h2>your score:{score}</h2>)}
         <p>The target time was <strong>{targetTime} seconds.</strong></p>
         <p>you stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
         {/* <form action="dialog"> */}
         <div className="btn-box">
            <button onClick={() => { onReset(); dialogRef.current.close(); }}>close</button>
         </div>
         {/* </form> */}
      </dialog>,
      document.getElementById('modal')
   );
});
export default Dialog;