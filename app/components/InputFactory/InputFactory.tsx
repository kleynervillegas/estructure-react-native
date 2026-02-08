import InputStandard from "../Inputs/InputStandard/InputStandard";

const InputFactory: React.FC<any> = ({
    values,
    input,
    componentState,
    onChange,
    onSelect,
    onChecked,
    errors = {},
    handlers = {},
}) => {
    switch (input.inputType) {
        case "INPUT_STANDARD": {
            return (
                <InputStandard
                    id={input.id}
                    labelText={input.labelText}
                    name={input.name}
                    value={values[input.name]}
                    onChange={onChange}
                    autocomplete={input.autocomplete}
                    disabled={input.disabled}
                    error={errors[input.name]}
                    placeholder={input.placeholder}
                    required={input.required}
                    type={input.type}
                    autofocus={input.autofocus}
                    className={input.className}
                    readonly={input.readonly}
                    max={input.max}
                    maxlength={input.maxlength}
                    min={input.min}
                    minlength={input.minlength}
                    pattern={input.pattern}
                    autocapitalize={input.autocapitalize}
                    autocorrect={input.autocorrect}
                    classDiv={input.classDiv}
                    inputMode={input.inputMode}
                    showIcon={input.showIcon}
                />
            )
        }
  
        default:
            return null;
    }
}

export default InputFactory