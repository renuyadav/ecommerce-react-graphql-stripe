import React, {Component} from 'react';
import './App.css';
import {Container, Box, Heading, Card, Image, Text, SearchField, Icon, Spinner} from 'gestalt';
import {Link} from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiURL = process.env.API_URL || ('http://localhost:1337');
const strapi = new Strapi(apiURL);
class App extends Component {
  state = {
    brands: [],
    searchTerm: '',
    loadingBrands: true
  }
  async  componentDidMount() {
    try {
      /*const response = await strapi.request('post', 'graphql', {
        data: {
          query: `query {
          brands{
            _id
            name
            description
            image{
              name
              url
            }
          }
        }`
        }
      });*/
      //local development
      const response = await fetch('/brands.json');
      const data = await response.json();
      console.log("response>>>" + data);
      this.setState({brands: data.brands, loadingBrands: false});
      //strapi
      //this.setState({brands: response.data.brands});
    } catch (err) {
      console.error(err);
      this.setState({loadingBrands: false});
    }

  }
  handleChange = ({value}) => {
    console.log("handle change called");
    this.setState({searchTerm: value});
  };

  filteredBrands = ({searchTerm, brands}) => {
    return brands.filter(brand => {
      return brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  render() {
    const {searchTerm, loadingBrands} = this.state;
    return (
      <Container>
        {/* Brand Search Field */}
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField accessibilityLabel="Brands Search Field" id="searchField" value={searchTerm} onChange={this.handleChange} placeholder="Search Brands" />
          <Box margin={2}>
            <Icon icon="filter" size={20} color={searchTerm ? "orange" : "gray"} accessibilityLabel="Filter" />
          </Box>
        </Box>

        {/* Brand Section */}
        <Box justifyContent="around" display="flex">
          {/* Brand Heading */}
          <Heading size="md" color="midnight">Brew Brands</Heading>
        </Box>
        {/* Brands */}
        <Box wrap dangerouslySetInlineStyle={{__style: {background: "#d6c8ec"}}} shape="rounded" justifyContent="around" display="flex">
          {this.filteredBrands(this.state).map(brand => (
            <Box paddingY={4} width={200} margin={2} key={brand._id}>
              <Card image={
                <Box width={200} height={200}>
                  {/*Local development */}
                  <Image fit="cover" alt="BrandImage" naturalHeight={1} naturalWidth={1} src="./brands-images/brand-bearpaw-river.png" />

                  {/*
                  <Image alt="BrandImage" naturalHeight={1} naturalWidth={1} src={`${apiURL}${brand.image.url}`} />
                  */}
                </Box>
              }>
                <Box justifyContent="center" display="flex" alignItems="center" direction="column">
                  <Text bold size="md">{brand.name}</Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="md">
                    <Link to={`/${brand._id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
        <Spinner show={loadingBrands} accessibilityLabel="Loading Spinner" />
      </Container>
    );
  }
}

export default App;
