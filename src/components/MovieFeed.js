import React from "react";
import axios from "axios";
import '../App.css'
import { Container, Button, Form } from "react-bootstrap";
import Picture from "../image/images.png"

class ReviewFeed extends React.Component {
    constructor() {
        super();
        this.state = {ratings: [], query:""}
    }
    
    getReviews = async () => {
        try{
            const response = await axios.get("https://api.nytimes.com/svc/movies/v2/reviews/search.json",{
                params: {
                    "api-key": "D8BNLsbSXJiHHRvhzASAs6t1EmduTK8T",
                    query: this.state.query
                }
            })

            if (response.data.results) {
                this.setState({ratings: response.data.results})
                console.log(response.data.results)
            }
        }
        catch (e) {
            console.log (e)
        }
    }

    handleMovieSearch = (e) =>{
        this.setState({query: e.target.value})
    }
    handleSearch = (e) =>{
        e.preventDefault()
        this.getReviews()
    }
    render() {
        return(<div>
            <Form onSubmit={this.handleSearch}>
            <Form.Group className="mb-3" controlId="formBasicMovie">
                <Form.Label>Movie Search</Form.Label>
                <Form.Control type="text" placeholder="Movie Title" 
                name="movie" value={this.query} onChange={this.handleMovieSearch}/>
            </Form.Group>
            <Button type="submit" value="Submit">Search</Button>
            </Form>
            {this.state.ratings.map((rating, index) => {
                return(<div key={index}>
                    <section className="dark">
                        <Container className="container py-4">
                            <h1 className="h1 text-center" id="pageHeaderTitle">Author: {rating.byline}</h1>
                                <article className="postcard dark red">
                                <a className="postcard__img_link" href="#">
                                    <img className="postcard__img" src={rating.multimedia ? rating.multimedia.src : Picture} alt="Image Title" />	
                                </a>
                                <div className="postcard__text">
                                    <h1 className="postcard__title red"><a href="#">{rating.display_title}</a></h1>
                                    <div className="postcard__subtitle small">
                                    {rating.publication_date}
                                    </div>
                                    <div className="postcard__bar"></div>
                                    <div className="postcard__preview-txt">{rating.headline}</div>
                                    <ul className="postcard__tagbox">
                                        <li className="tag__item"><i className="fas fa-tag mr-2"></i>Critics: {rating.critics_pick}</li>
                                    </ul>
                                </div>
                            </article>
                        </Container>
                    </section>
                    </div>)
            })}
        </div>)
    }
}
export default ReviewFeed;