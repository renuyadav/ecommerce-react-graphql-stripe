import React from 'react';
import {Box, Text, Heading, Image} from 'gestalt';
import {NavLink} from 'react-router-dom';
const Navbar = () => (
    <Box display="flex" justifyContent="around" alignItems="center" height={70} color="midnight" shape="roundedBottom" padding={1} >
        {/* Sign in Link */}
        <NavLink activeClassName="active" to="/signin">
            <Text color="white" size="xl"> Sign In</Text>
        </NavLink>
        {/* Title mad Logo */}
        <NavLink activeClassName="active" exact to="/">
            <Box display="flex" alignItems="center">
                <Box margin={2} width={50} height={50}>
                    <Image src="./icons/logo.svg" alt="Brew logo" naturalWidth={1} naturalHeight={1}></Image>
                </Box>
                <Heading color="orange" size="xs">Brew Haha</Heading>
            </Box>
        </NavLink>
        {/* Sign up Link */}
        <NavLink activeClassName="active" to="/signup">
            <Text color="white" size="xl"> Sign Up</Text>
        </NavLink>
    </Box>
)
export default Navbar;