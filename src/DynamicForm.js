import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const FormContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function DynamicForm({ schema }) {
  const { register, handleSubmit } = useForm();

  let parsedSchema;

  try {
    parsedSchema = JSON.parse(schema);
  } catch (error) {
    return <p style={{ color: 'red' }}>Invalid JSON Schema</p>;
  }

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>{parsedSchema.title}</h3>
        {parsedSchema.fields.map((field, index) => (
          <Field key={index}>
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
              <Input
                type={field.type}
                id={field.name}
                {...register(field.name, { required: field.required, min: field.min, max: field.max })}
              />
            ) : field.type === 'checkbox' ? (
              <Input type="checkbox" id={field.name} {...register(field.name)} />
            ) : field.type === 'dropdown' ? (
              <Select id={field.name} {...register(field.name)}>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            ) : null}
          </Field>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </FormContainer>
  );
}

export default DynamicForm;