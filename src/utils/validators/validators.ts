export type FieldValidtorType = (value: string | undefined) => string | undefined;

export const required: FieldValidtorType = (value) => {
    if (value) return undefined;
    return 'This field is required.';
}

export const maxLength = (maxLength: number): FieldValidtorType => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}