import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik, Formik, Form } from 'formik';


function Patients(props) {
    const [open, setOpen] = React.useState(false);
    const [dopen, setDOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [did, setDid] = useState(0);
    const [update, setupdate] = useState(false);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
        setupdate(false);
        formik.resetForm();
    };

    let schema = yup.object().shape({

        name: yup.string("Please Enter Vaild Name.").required("Please Enter Your Name."),
        email: yup.string().email("Please Enter Vaild Name.").required("Please Enter Your Email."),
        price: yup.number().required("Please Enter Price."),
        quntity: yup.string().required("Please enter quntity."),
        date: yup.date().required("Please Enter date."),



    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            price: '',
            quntity: '',
            date: ''

        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleupdate(values);
            } 
            else 
            {
                handleInsert(values);
            }
            handleClose();

        },
    });

    const { handleBlur, handleSubmit, handleChange, errors, touched, values } = formik;

    const columns = [
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'email', headerName: 'Email', width: 220 },
        { field: 'price', headerName: 'Price', width: 170 },
        { field: 'quntity', headerName: 'Quntity', width: 170 },
        { field: 'date', headerName: 'Date', width: 170 },


        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <>
                    <IconButton  onClick={() => Edit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton  onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const Edit = (params) => {
        handleClickOpen();

        formik.setValues(params.row);

        setupdate(true)

    }

    const handleupdate =  (values) => {
        let localData = JSON.parse(localStorage.getItem("Products"));

       let udata = localData.map((l) => {
            if(l.id === values.id){
                return values;
            }
            else
            {
                return l;
            }
        })

        localStorage.setItem("Products",JSON.stringify(udata));
        console.log(values);

        handleClose();

        loadData();

        formik.resetForm();
    }


    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("Products"));

        let id = Math.floor(Math.random() * 10000);
        let data = {
            id: id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("Products", JSON.stringify([data]));
        } 
        else 
        {
            localData.push(data);

            localStorage.setItem("Products", JSON.stringify(localData));
        }

        console.log(localData);

        handleClose();

        formik.resetForm();

        loadData();
    }

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("Products"));

        if(localData){
            setData(localData);
        }
    }

    const handleDelete = (params) => {
        let localData = JSON.parse(localStorage.getItem("Products"));

        let fData = localData.filter((l) => l.id !== did);

        localStorage.setItem("Products", JSON.stringify(fData));
        console.log(params.id);

        loadData();

        handleClose();

    }

    useEffect(() => {

        loadData();

    }, 
    [])

    return (
        <div>
            <h1>Products</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                 Add Products 
                </Button>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                <Dialog
                    open={dopen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are You Sure Delete?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            No
                        </Button>
                        <Button onClick={handleDelete} autoFocus>
                            yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog fullWidth open={open} onClose={handleClose}>
                    <DialogTitle>
                        PRODUCT DITAILS
                    </DialogTitle>
                    <Formik values={formik}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                value={values.name}
                                margin="dense"
                                name="name"
                                label="Product Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                            <TextField
                                value={values.email}
                                margin="dense"
                                name="email"
                                label="Email"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? <p>{errors.email}</p> : ''}
                            <TextField
                                value={values.price}
                                margin="dense"
                                name="price"
                                label="Product Price"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.price && touched.price ? <p>{errors.price}</p> : ''}
                            <TextField
                                value={values.quntity}
                                margin="dense"
                                name="quntity"
                                label="Product Quatity"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.quntity && touched.quntity ? <p>{errors.quntity}</p> : ''}
                            <br></br>
                            <TextField
                                    value={values.date}
                                    margin="dense"
                                    name='date'
                                    type="date"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.date && touched.date ? <p>{errors.date}</p> : ''}
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                {
                                        update ? 
                                        <Button type="submit" >Update</Button>
                                        : 
                                        <Button type="submit" >Submit</Button>
                                    }
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
                </Dialog>
            </div>
        </div >
    );
}

export default Patients;