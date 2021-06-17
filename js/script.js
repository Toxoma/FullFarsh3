/* eslint-disable */

window.addEventListener('DOMContentLoaded', function () {
   'use strict';

   const input = document.querySelector('#input'),
      parag = document.querySelector('#parag');
   let text,
      timer;

   function vivod(value) {
      parag.textContent = value;
   }


   input.addEventListener('input', () => {
      clearTimeout(timer);

      text = input.value;

      timer = setTimeout(vivod, 300, text);
   });

});