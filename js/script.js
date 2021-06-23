/* eslint-disable */
'use strict';

const task1 = document.getElementById('task1');
let str1;

str1 = task1.textContent.replace(/функци\W/g, '<strong>функция</strong>');

task1.textContent = '';
task1.insertAdjacentHTML('afterbegin', str1);



const  task2= document.querySelector('#task2'),
   task2Elems = document.querySelectorAll('#task2>p');
   let str2;
   
task2.textContent = '';
task2Elems.forEach(element => {
   str2 = element.textContent.replace(/\d{2}:\d{2}/g, (match)=>`<b>${match}</b>`);
   element.textContent = '';
   task2.insertAdjacentHTML('beforeend', `<p>${str2}</p>`);
});
str2 = task2.innerHTML;



const body = document.querySelector('body');
// let str3;
// str3 = body.innerText.replace(/\"[^.]*\"/g, (match) => `<mark>${match}</mark>`);

str1 = str1.replace(/\«[^.]*\»/g, (match) => `<mark>${match}</mark>`);
task1.textContent = '';
task1.insertAdjacentHTML('afterbegin', str1);

str2 = str2.replace(/\"[^.]*\"/g, (match) => `<mark>${match}</mark>`);
task2.textContent = '';
task2.insertAdjacentHTML('beforeend', str2);



str2 = str2.replace(/http\:\/\/([\w\.\/]*\.\w{2,3})[\S]*/g, (match, val1) => `<a href="${match}">${val1}</a>`);
task2.textContent = '';
task2.insertAdjacentHTML('beforeend', str2);




let arr;

arr = body.innerHTML.match(/\#\w{6}/g);

arr = Array.from(arr);
arr.forEach(item => console.log('Цвет: ' + item));