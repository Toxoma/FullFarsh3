/* eslint-disable */

window.addEventListener('DOMContentLoaded', function () {
   'use strict';

   const btnPlay = document.querySelector('#btnPlay'),
      car = document.querySelector('.car'),
      btnReset = document.querySelector('#btnReset');
   let count = 0,
      width = window.innerWidth - 100,
      userWidth,
      rideInterval;

   let animate = function () {
      rideInterval = requestAnimationFrame(animate);
      count++;

      if (count < width) {
         car.style.left = count + 'px';
      } else {
         cancelAnimationFrame(rideInterval);
      }
   };

   function reset() {
      cancelAnimationFrame(rideInterval);
      clearInterval(userWidth);
      count = 0;
      car.style.left = count + 'px';
   }

   function findWidth() {
      width = window.innerWidth - 100;
   }

   btnPlay.addEventListener('click', () => {
      rideInterval = requestAnimationFrame(animate);
      userWidth = setInterval(findWidth, 1000);
   });

   btnReset.addEventListener('click', reset);

});
