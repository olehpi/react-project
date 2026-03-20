import { Field, Form, Formik } from "formik";
import { FilterType } from "../../store/users-reducer";
import React from "react";

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
};

type FormType = {
    term: string
    friend: "null" | "true" | "false"
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = React.memo( (props) => {
    const submit = (values: FormType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,  
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter);
        setSubmitting(false);
    }

    return <div>
        <Formik<FormType>
            initialValues={{term: '', friend: 'null'}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>

                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})