import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './modal.css'

const Modal = ({ isShowing, hideModal, selectedTask, submitForm, isLoading, isError }) => isShowing ? ReactDOM.createPortal(
    <>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="d-flex  justify-content-between">
                    {selectedTask ?
                        <h2>Update Task</h2> :
                        <h2>Add New Task</h2>}
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <Formik
                    initialValues={
                        selectedTask ?
                            {
                                ...selectedTask
                            } :
                            {
                                name: '',
                                destination_date: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().substring(0, 16),
                                description: ''
                            }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
                            .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                        description: Yup.string()
                            .required('Required'),
                    })}
                    onSubmit={(values) => {
                        let completed = 0;
                        if (values.completed && values.completed[0]) {
                            completed = values.completed[0];
                        }
                        const task = { ...values, ['completed']: completed }
                        submitForm(task);
                    }}
                >
                    <Form>
                        <div className="modal-body d-flex flex-column">
                            <div >
                                <div className='d-flex my-1 justify-content-between'>
                                    <label htmlFor="name">Name Name</label>
                                    <Field className="w-50" name="name" type="text" />
                                </div>
                                <div className='d-flex my-1 justify-content-end'>
                                    <ErrorMessage name="name" >
                                        {value => <div className="text-danger">{value}</div>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div className='d-flex my-1 justify-content-between'>
                                <label htmlFor="destination_date">Destination Date</label>
                                <Field className="w-50" name="destination_date" type="datetime-local" />
                                <ErrorMessage name="destination_date" >
                                    {value => <div className="text-danger">{value}</div>}
                                </ErrorMessage>
                            </div>
                            <div className='d-flex flex-column my-1'>
                                <label htmlFor="description">Description</label>
                                <Field className='mt-2' as='textarea' name="description" type="text" />
                                <div className='d-flex my-1 justify-content-end'>
                                    <ErrorMessage name="description" >
                                        {value => <div className="text-danger">{value}</div>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            {selectedTask ?
                                <div className='d-flex my-1 justify-content-between'>
                                    <label>
                                        Completed
                                        <Field className='mx-2' type="checkbox" name="completed" value="1" />
                                    </label>
                                </div>
                                : ''}
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h3 className={'text-danger ' + (!isError ? 'd-none' : '')}>error...</h3>
                            </div>
                            <div>
                                {isLoading ?
                                    <button className="btn btn-primary" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                    </button> :
                                    <button className="submit-button btn btn-primary" type="submit">Save</button>}
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    </>, document.body
) : null;

export default Modal;