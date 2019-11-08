import React from 'react';
import {Box, Text, Heading, Image, Card, Button} from 'gestalt';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiURL = process.env.API_URL || ('http://localhost:1337');
const strapi = new Strapi(apiURL);

class Brews extends React.Component {
    state = {
        brews: [],
        brand: ''
    }
    async componentDidMount() {

        try {
            const response = await strapi.request('post', 'graphql', {
                data: {
                    query: `query{
                        brand(id:"${this.props.match.params.brandId}"){
                            _id,
                            name,
                            description,
                            brews{
                            _id,
                            name,
                            description,
                            price,
                            image{
                                url
                            }
                            }
                        }
                    }`
                }
            });
            console.log("Brews response>>>" + response);
            this.setState({brews: response.data.brand.brews, brand: response.data.brand.name});
        } catch (err) {
            console.log("eer in brews>>" + err);
        }
    }
    render() {
        const {brand, brews} = this.state;
        return (
            <Box marginTop={4} display="flex" justifyContent="center" alignItems="start">
                {/*Brews section*/}
                <Box display="flex" direction="column" justifyContent="center" alignItems="center">
                    {/*Brews Heading*/}
                    <Box margin={2}>
                        <Heading color="orchid">{brand}</Heading>
                    </Box>
                    {/* Brews */}
                    <Box wrap dangerouslySetInlineStyle={{__style: {background: "#bdcdd9"}}} shape="rounded" justifyContent="center" display="flex" padding={4}>
                        {brews.map(brew => (
                            <Box paddingY={4} width={200} margin={2} key={brew._id}>
                                <Card image={
                                    <Box width={200} height={250}>
                                        {
                                            <Image fit="cover" alt="BrewImage" naturalHeight={1} naturalWidth={1} src={`${apiURL}${brew.image.url}`} />
                                        }
                                    </Box>
                                }>
                                    <Box justifyContent="center" display="flex" alignItems="center" direction="column">
                                        <Box marginBottom={4}>
                                            <Text bold size="md">{brew.name}</Text>
                                        </Box>
                                        <Text>{brew.description}</Text>
                                        <Text bold size="md" color="orchid">${brew.price}</Text>
                                        <Box marginTop={4}>
                                            <Text bold size="xl">
                                                <Button color="blue" text="Add to Cart"></Button>
                                            </Text>
                                        </Box>
                                    </Box>
                                </Card>
                            </Box>

                        ))}
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default Brews;