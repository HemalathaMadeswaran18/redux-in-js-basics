

// Create a default state object
const initialState = { items: ["Meeting at 9am"] };

// Create the reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case "GET":
            return { ...state }; // Return a new object with the current state
       
        case "ADD":
            state.items.push(action.payload);
            return state;

        case "Remove":
            state.items.splice(state.items.indexOf(action.payload),1);
            return state;

        case "RemoveAll":
          //  state.items.splice(0,state.items.length);
     state.items=[];
     //both ways will work
            return state;

            }

            
}

// Create store
const store = Redux.createStore(reducer);

const todolist = document.getElementById("todolist");

// Subscribe to the action
store.subscribe(() => {
    const result = store.getState();
    todolist.innerHTML="";
    result.items.map(item => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `${item} <button class="btn btn-danger " onclick="DeleteItem('${item}')"> delete </button>`
        todolist.appendChild(li);
    });
});

// Dispatch actions
store.dispatch({ type: "GET" });


function AddItem(){
    const item=document.getElementById("textItem").value;
    store.dispatch({type:"ADD", payload:item})
}

function DeleteItem(item){
    
    store.dispatch({type:"Remove",payload:item});
    
}

function RemoveAll(){
    store.dispatch({type:"RemoveAll"});
}