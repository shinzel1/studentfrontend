import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';

export default function Student() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [students, setStudents] = useState([])

    const handleClick = (e) => {
        e.preventDefault()
        const student = { name, address }
        fetch("http://localhost:8080/student/add",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(student)
            }
        ).then(() => {
            loadOnlyOnce()

        })
    }
    const loadOnlyOnce = () => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudents(result)
            }, [])
    }
    const deleteStudent = id => {
        fetch(`http://localhost:8080/student/delete/${id}`,
            {
                method: "Delete",
            }
        ).then((result)=> console.log(result))
            .then(() => {
                loadOnlyOnce()
            })
    }

    useEffect(() => {
        loadOnlyOnce()
    }, [setAddress, setName])
    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Add Student</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleClick}>Submit</Button>
                </Box>
            </Paper>
            <Paper elevation={3} style={paperStyle}>
                {students.map(student => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }}>
                        Id: {student.id}<br />
                        Name: {student.name}<br />
                        Address: {student.address}
                        <Button variant="contained" onClick={() => deleteStudent(student.id)}>Delete</Button>
                    </Paper>
                ))}

            </Paper>
        </Container>
    );
}