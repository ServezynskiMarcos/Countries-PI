const validate = (newActivity) => {
    let error = {};
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
    if(!newActivity.country.length){
        error.countries = 'Country required*'
    };

    return error;
}

export default validate;