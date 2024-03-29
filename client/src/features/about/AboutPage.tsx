import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('loginstatus') !== 'true') {
            navigate('/login');
        }
    }, [navigate])

    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('should not see this'))
            .catch(error => setValidationErrors(error));
    }

    return (
        <Container>
            <Typography gutterBottom variant='h2'> Erros for testing purpose</Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Errors().catch(error => console.log(error))}> Test 400 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get401Errors().catch(error => console.log(error))}> Test 401 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get404Errors().catch(error => console.log(error))}> Test 404 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get500Errors().catch(error => console.log(error))}> Test 500 Error</Button>
                <Button variant='contained' onClick={getValidationError}> Test Validation Error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 &&
            <Alert severity="error">
                <AlertTitle>Validation Errors</AlertTitle>
                <List>
                    {validationErrors.map(error => (
                        <ListItem key={error}>
                            <ListItemText>{error}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Alert>

            }

        </Container>
    )
}