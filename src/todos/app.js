import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';


const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    newTodo: '#new-todo-input',
    button: '.filtro',
    pendingCount: '#pending-count',
}

/**
 * 
 * @param {String} elementId Basicamente recibe el div o la parte del documento donde se pondra la informacion
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIDs.pendingCount);
    }
    
    (()=> {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();


    // Referencias
    const newDescriptionInput = document.querySelector(ElementIDs.newTodo);
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    const ClearCompletedButton = document.querySelector ( ElementIDs.ClearCompleted );
    const filtersUL = document.querySelectorAll(ElementIDs.button);

    newDescriptionInput.addEventListener('keyup', (event) => {
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');



        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });
    
    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');

        const buttomDestroy = event.target.classList.contains('destroy');
        
        if ( buttomDestroy ) {
            todoStore.deleteTodo( element.getAttribute('data-id') );
            displayTodos();
        } else return;

    }); // Mi version


    ClearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersUL.forEach( element => {
        element.addEventListener('click', (element)=> {
            filtersUL.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected');

            switch( element.target.id ){
                case 'all':
                    todoStore.setFilter( Filters.All );
                    break;
                case 'pending': 
                    todoStore.setFilter( Filters.Pending );
                    break;
                case 'completed':
                    todoStore.setFilter( Filters.Completed);
                    break;
            }
            displayTodos();
        }) 
    })
    

}