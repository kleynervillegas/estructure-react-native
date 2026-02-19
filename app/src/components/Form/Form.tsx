import InputFactory from "../InputFactory/InputFactory";

const Form: React.FC<any> = ({
  title,
  // subheader,
  inputs = [],
  //buttons,
  values,
  componentState,
  onChange,
  onSelect,
  onChecked,
  errors,
  handleSubmit = (event: any) => event.preventDefault(),
  handlers = {},
  patchValues
}) => (
  <>
    {inputs.map((input: any) =>
      !input.hide ? (
        <InputFactory
          key={input.id}
          values={values}
          input={input}
          componentState={componentState}
          onChange={onChange}
          onSelect={onSelect}
          onChecked={onChecked}
          errors={errors}
          handlers={handlers}
          patchValues={patchValues}
        />
      ) : null
    )}
  </>


);

export default Form;