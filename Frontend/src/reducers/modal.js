const data = []

const modalReducer = (state = data, action) => {
    switch (action.type) {      
        case "INSERT_DATA":     
            return state = action.data
        case "RESET_DATA":
            return state = []
        default:
            return state;
    }
};

export default modalReducer