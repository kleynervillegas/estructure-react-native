export const getFormStateErrors = (values: any, validators: any = {}) => {
    let isderty: boolean = false;
    Object.entries(validators).some(([name, fieldValidator]) => {
        Object.entries(fieldValidator).some(([key, validator]) => {
            isderty = !validator.validate(values[name], values);
            return isderty;
        })
        return isderty;
    })
    return isderty;
};

export const checkDoneForm = (inputs: any[]) => {
    return inputs.filter((item: any) => !item.hide).every(item => item.done)
}

export const checkDoneFormGrup = (inputs: any[]) => {
    return inputs.filter((item: any) => !item.hide).every(item => item.done)
}


