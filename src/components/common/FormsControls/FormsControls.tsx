import React from 'react';
import { FieldValidtorType } from '../../../utils/validators/validators';
import styles from './FormsControls.module.css';
import { Field } from "react-final-form";

type FormControlPropsType = {
    meta: {
        touched: boolean,
        error: string | undefined
    }
    children: React.ReactNode
}

export const FormControl: React.FC<FormControlPropsType> = ( {meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<any> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<any> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export function createField<FormKeysType extends string> (
    placeholder: string | undefined, 
    name: FormKeysType,
    validators: Array<FieldValidtorType>,
    component: React.ComponentType<any>,
    props: {}, text = "") {
    return (
        <div>
            <Field
                placeholder={placeholder}
                name={name}
                validate={composeValidators(...validators)}
                component={component}
                {...props}
                text={text}
            />
        </div>
    )
}

export type GetStringKeys<T> = Extract<keyof T, string>

const composeValidators =
    (...validators: Array<FieldValidtorType>) =>
        (value: string) =>
            validators.reduce<string | undefined>((error, validator) => error || validator(value), undefined);
