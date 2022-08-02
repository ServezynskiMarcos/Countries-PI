const validate = (newActivity) => {
    let error = {};
    const letras = /^\d+$/gi;
    if(letras.test(newActivity.name)){
        error.name = 'Name is invalid, only numbers are not allowed'
    }
    if(!newActivity.name || newActivity.name.length < 3) {
        error.name = 'Name required*'
    };
   
    if(!newActivity.difficulty){
        error.difficulty = 'Difficulty required*'
    };
    if(!newActivity.duration){
        error.duration = 'Duration required*'
    };
    if(!newActivity.season){
        error.season = 'Season required*'
    };
    if(newActivity.country.length === 0){
        error.countries = 'Country required*'
    };

    return error;
}

export default validate;