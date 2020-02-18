/** @jsx jsx */
import { Global } from '@emotion/core'; 
import { Styled, Container, jsx } from 'theme-ui';

export default ({ children, colorPair = [] }) => (
    <Styled.root>
    <Global
        styles={{
            '*': {
                boxSizing: 'border-box'
            },
            body: {
                margin: 0,
                color: colorPair[0],
                backgroundColor: colorPair[1]
            }
        }}
    />
    <header
        sx={{
            borderBottom: 'thin solid',
        }}
    >
        <Container>
            <Styled.h1
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: [2, 3, 3],
                }}
            >
                <span
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        mr: 3,
                    }}
                >                
                    <span
                        sx={{
                            p: 2,
                            border: 'thin solid',
                        }}
                    ></span>
                    <span
                        sx={{
                            p: 2,
                            backgroundColor: colorPair[0],
                            border: 'thin solid',
                        }}
                    ></span>
                </span>
                <strong>Color Voting App</strong>
            </Styled.h1>
        </Container>
    </header>
    <Container
        sx={{
            py: [4, 5, 5],
            px: [3, 4, 5],
        }}
    >
            {children}
    </Container>
    <footer
        sx={{
            borderTop: 'thin solid',
            textAlign: 'center',
            py: [4, 5, 6],
        }}
    >
        <Container
            sx={{
                fontSize: [0, 0, 1],
            }}
        >
            {`\u00A9 ${new Date().getFullYear()} ⨳ `}
            <Styled.a href="https://johno.com/" target="_blank" rel="nofollow noreferrer noopener">Thanks, Johno</Styled.a>
        </Container>
    </footer>
    </Styled.root>
)