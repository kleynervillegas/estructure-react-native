import {
    useCallback,
    useState,
} from "react";
import getFormStateErrors from "../utils/functions";



// @param inputs -  el array de inputs del formulario
// @param initialState - El estado inicial del formulario
// @param validators - Validadores para los campos del formulario
const useForm = (inputs: any, initialState: any, validators: any = {}, mutators: any = {}) => {
    // State para los inputs actualizados
    const [updatedInputs, setInputs] = useState<any>(inputs);

    // State para el estado del formulario
    // isDerty: booleano que indica si el formulario tiene errores
    // values: objeto que contiene todos los valores del formualario
    // errors: objeto que contiene todos los errores del formulario
    const [formState, setFormState] = useState<any>({
        isDerty: getFormStateErrors(initialState, validators),
        values: initialState,
        errors: {}
    })    

    // Función para validar los inputs, se usa internamente en los onChange no se expone como metodo.
    const validateInputs = useCallback((name: string, value: any, values: any): any => {
        let temp: any = {
            [name]: {
                status: false,
                message: "",
            },
        };
        if (validators[name]) {
            Object.keys(validators[name]).some((key: string) => {
                const status = !validators[name][key].validate(value, values);
                temp[name] = {
                    status,
                    message: validators[name][key].message ?? "",
                };
                return status;
            })
        }
        return temp;
    }, [validators]);

    // Función para manejar el cambio del valor de los inputs de tipo: INPUT_STANDARD, TEXT_FIELD_INPUT
    const onChange = useCallback((e: any) => {
        const { target: { name, value } } = e;

        let updatedValue = value;
        if (mutators[name]) {
            updatedValue = mutators[name].mutate(value)
        }
        setFormState((prevState: any) => {
            const error = validateInputs(name, updatedValue, prevState.values);
            return {
                isDerty: getFormStateErrors({
                    ...prevState.values,
                    [name]: updatedValue,
                }, validators),
                values: {
                    ...prevState.values,
                    [name]: updatedValue,
                },
                errors: {
                    ...prevState.errors,
                    ...error,
                }
            }
        })
    }, [setFormState, validateInputs, validators]);

    // Función para manejar el cambio del valor de los inputs de tipo: SELECT_INPUT
    const onSelect = useCallback((e: any) => {
        const { target: { name, value } } = e;
        setFormState((prevState: any) => {
            const error = validateInputs(name, value, prevState.values);
            return {
                isDerty: getFormStateErrors({
                    ...prevState.values,
                    [name]: value,
                }, validators),
                values: {
                    ...prevState.values,
                    [name]: value,
                },
                errors: {
                    ...prevState.errors,
                    ...error,
                }
            }
        })
    }, [setFormState, validateInputs, validators]);

    // Función para manejar el cambio del valor de los inputs de tipo: CHECKBOX_INPUT
    const onChecked = useCallback((e: any) => {
        const { target: { name, checked } } = e;
        setFormState((prevState: any) => {
            return {
                ...prevState,
                values: {
                    ...prevState.values,
                    [name]: checked,
                },
            }
        })
    }, [setFormState]);

    // Función para resetear los valores del formulario al estado inicial
    const resetFormValues = useCallback(() => {
        setFormState({
            isDerty: getFormStateErrors(initialState, validators),
            values: initialState,
            errors: {}
        })
    }, [initialState, setFormState, validators]);

    // Función para establecer el valor de un input específico
    // @param name - la propiedad name del input
    // @param value - el valor que se le desea dar al input
    const setValue = useCallback((name: string, value: any) => {
        setFormState((prevState: any) => {
            const error = validateInputs(name, value, prevState.values);
            return {
                isDerty: getFormStateErrors({
                    ...prevState.values,
                    [name]: value,
                }, validators),
                values: {
                    ...prevState.values,
                    [name]: value,
                },
                errors: {
                    ...prevState.errors,
                    ...error,
                }
            }
        })
    }, [setFormState, validateInputs, validators]);

    const setError = useCallback((name: string, message: any) => {
        setFormState((prevState: any) => ({
            isDerty: prevState.isDerty,
            values: prevState.values,
            errors: { [name]: { status: true, message } },
        }));
    }, [setFormState]);

    // Función para limpiar los errores del formulario
    const clearErrors = useCallback(() => {
        setFormState((prevState: any) => ({
            isDerty: prevState.isDerty,
            values: prevState.values,
            errors: {},
        }));
    }, [setFormState]);

    // Función para modificar los inputs con nuevas propiedades
    // @param inputsProps - objeto con las propiedades que se le desean agregar o modificar del input, debe conetener el id del input
    const modifyInputs = useCallback((inputsProps: { [key: string]: any }) => {
        setInputs((prevState: any) => prevState.map((input: any) => inputsProps[input.id] ? { ...input, ...inputsProps[input.id] } : input));
    }, [setInputs]);    
    
    const modifyInputsGruop = useCallback((inputsProps: { [key: string]: any }) => {
        updatedInputs.map((item) => {
            if (item.inputType == "InputStandardGroup") {
                const a = item.inputs.map((input) => {
                    item.inputs = { ...input, ...inputsProps[input.id] }                 
                    return item.inputs
                });
           
                item.done = a.filter((item: any) => !item.hide).every(item => item.done);         
                item.inputs = a;
            }

        });
   
    }, [setInputs]);

    // Función para agregar nuevos inputs
    // @param newIputs - array de objetos con los inputs que sea deasean agregar al formulario.
    const addInputs = useCallback((newIputs: any) => {
        setInputs((prevState: any) => [...prevState, ...newIputs]);
    }, [setInputs]);

    // Función para establecer el valor de varios inputs
    const patchValues = useCallback((values: any) => {
        setFormState((prevState: any) => {
            return {
                ...prevState,
                values: {
                    ...prevState.values,
                    ...values
                },
            }
        })
    }, [setFormState])

    return {
        isDerty: formState.isDerty,
        values: formState.values,
        errors: formState.errors,
        updatedInputs,
        onChange,
        onSelect,
        onChecked,
        validateInputs,
        resetFormValues,
        clearErrors,
        setValue,
        modifyInputs,
        addInputs,
        patchValues,
        setFormState,
        setError,
        modifyInputsGruop
    }
}
 
export default useForm