import { Todo } from "../todos/models/todo.model";


export const Filters = { 
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todo: [
    ],
    filter: 'all'
}

const initStore = () => {
    loadStore();
    console.log('InitStore');
}

const loadStore = () => {
    if ( !localStorage.getItem('state') ) return;

    const { todo = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
    state.todo = todo;
    state.filter = filter;

}

const sesionStore = () => {
    localStorage.setItem('state', JSON.stringify(state) );
}

const getTodos = ( filter = Filters.All ) => {
    
    switch( filter ) {
        case Filters.All:
            return [...state.todo];
        
        case Filters.Completed:
            return state.todo.filter( todo => todo.done );
        
        case Filters.Pending:
            return state.todo.filter( todo => !todo.done);

        default:
            throw new Error(`Option ${ filter } is not valid.`);
    }

}

/**
 * 
 * @param {String} todo 
 */
const addTodo = ( description ) => {

    if (!description) throw new Error('Description is required');
    state.todo.push( new Todo(description));

    sesionStore();
}

const toggleTodo = ( todoId ) => {
    
    state.todo = state.todo.map( todo => {
        if( todo.id === todoId) todo.done = !todo.done;
        return todo;
    }); // Es una funcion no destructiva que realiza algo por cada cosa del arreglo/objeto pero no modifica el arreglo original solo regresa uno nuevo

    sesionStore();
}

const deleteTodo = ( todoId ) => {
    state.todo = state.todo.filter( todo => todo.id !== todoId );

    sesionStore();
}

const deleteCompleted = () => {
    state.todo = state.todo.filter( todo => !todo.done );
    sesionStore();
}

const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    sesionStore();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}