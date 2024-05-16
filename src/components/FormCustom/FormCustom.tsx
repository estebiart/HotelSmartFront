import React from 'react';
import { FormProvider, UseFormReturn, FieldValues } from 'react-hook-form';

type FormCustomProps<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  children: React.ReactNode;
};

const FormCustom = <T extends FieldValues>({ methods, children }: FormCustomProps<T>) => {
  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
};

export default FormCustom;
