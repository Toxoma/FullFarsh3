/* eslint-disable */
"use strict";

class Todo {
   constructor(form,input,todoList,todoCopmpleted,todoContainer,todoEdit) {
      this.form = document.querySelector(form);
      this.input = document.querySelector(input);
      this.todoList = document.querySelector(todoList);
      this.todoCopmpleted = document.querySelector(todoCopmpleted);
      this.todoContainer = document.querySelector(todoContainer);
      this.containerItems='';
      this.todoEdit = document.querySelector(todoEdit);
      this.deleteTimer ='';
      this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
   }

   addToStorage() {
      localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
   }

   addTodo(e) {
      e.preventDefault();
      
      if (this.input.value.trim()) {
         const newTodo = {
            value: this.input.value,
            completed: false,
            key: this.generateKey(),
         };
         this.todoData.set(newTodo.key, newTodo);
         this.render();
      } else {
         alert('Пустое дело добавить нельзя!');
      }
   }

   render() {
      this.todoList.textContent = '';
      this.todoCopmpleted.textContent = '';
      this.todoData.forEach(this.createItem, this);
      this.containerItems = this.todoContainer.querySelectorAll('li');
      this.addToStorage();
   }

   createItem(item) {
      const li = document.createElement('li');
      li.style.transition = '1s';
      li.classList.add('todo-item');
      li.key = item.key;
      li.insertAdjacentHTML('beforeend', `
         <span class="text-todo">${item.value}</span>
         <div class="todo-buttons">
            <button class="todo-edit"></button>
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
         </div>`);

      li.style.transition = '1s';

      if (item.completed) {
         this.todoCopmpleted.append(li);
      } else {
         this.todoList.append(li);
      }
   }

   generateKey() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
   }

   deleteItem(key) {
      this.todoData.forEach(elem => {
         if (elem.key===key) {
            let li = Array.from(this.containerItems).find(item => item.key === key);
            
            li.style.transform = 'translateX(-110%)';
         }
      });

      this.todoData.delete(key);
      
      if (this.deleteTimer==='') {
         console.log('!');
         this.deleteTimer = setTimeout(() => {
            this.render();
         }, 1000);
      } else {
         console.log('!!!');
         clearTimeout(this.deleteTimer);
         this.deleteTimer = '';
         this.deleteTimer = setTimeout(() => {
            this.render();
      }, 1000);
      }
   }

   transition(li) {
      console.dir(li);

      this.todoData.forEach(elem => {
         if (elem.key === li.key) {

            if (elem.completed) {
               this.todoCopmpleted.append(li);
               li.style.transform = 'translateX(-110%)';
            } else {
               this.todoList.append(li);
               li.style.transform = 'translateX(-110%)';
            }
            setTimeout(() => {
               li.style.transform = 'translateX(0%)';
               this.addToStorage();
            }, 100);
         }
      });


   }

   completeItem(key) {
      this.todoData.forEach(elem => {
         if (elem.key === key) {
            elem.completed = !elem.completed;

            let li = Array.from(this.containerItems).find(item => item.key === key);
            
            li.style.transform = 'translateX(-110%)';

            setTimeout(() => {
               this.transition(li);
            }, 1000);
         }
      });
      

   }

   rewriteItem(key) {
      this.todoData.forEach(elem => {
         if (elem.key === key) {
            let str;
            do {
               str = prompt('введите текст');
               if (str===null) {
                  return;
               }
            } while (!str.trim());
            elem.value = str;
         }
      });
      
      this.render();
   }

   findLiKey(e) {
      let target = e.target;
      let liTargetKey;

      switch (target.classList.value) {
         case 'todo-remove':
            liTargetKey = e.target.offsetParent.offsetParent.key;
            this.deleteItem(liTargetKey);
            break;
         case 'todo-complete':
            liTargetKey = e.target.offsetParent.offsetParent.key;
            this.completeItem(liTargetKey);
            break;
         case 'todo-edit':
            liTargetKey = e.target.offsetParent.offsetParent.key;
            this.rewriteItem(liTargetKey);
            break;
      }
   }
   

   handler() {
      this.todoContainer.addEventListener('click', this.findLiKey.bind(this));
   }

   init() {
      this.form.addEventListener('submit', this.addTodo.bind(this));
      this.render();
      this.handler();
   }

}

const todo = new Todo('.todo-control','.header-input','.todo-list','.todo-completed','.todo-container','.todo-edit');

todo.init();