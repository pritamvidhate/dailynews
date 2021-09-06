import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps ={
        country : "in",
        pageSize : 8,
        category: "general"
    }

    static propTypes ={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(){
        super();
        this.state = {
            articles : [],
            loading:false,
            page: 1
        }
    }
   async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=599db35d233f4d00944e4b0cab4f986a&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
    }

    handlePreviousClick =async () =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=599db35d233f4d00944e4b0cab4f986a&page=${this.state.page - 1}&pageSize= ${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        });
    
    }

    handleNextClick =async () =>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize))){

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=599db35d233f4d00944e4b0cab4f986a&page=${this.state.page + 1}&pageSize= ${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading:false
            });
        }

    }

    render() {
        return (
            <div>
                <div className="container my-3">
                    <h1 className="text-center">Top Headlines</h1>
                    {this.state.loading && <Spinner/>}
                    <div className="row">
                        { !this.state.loading && this.state.articles.map((ele) =>{
                            return <div className="col-md-4" key= {ele.url}>
                            <NewsItem title={ele.title?ele.title:""} description={ele.description?ele.description:""} 
                            imgurl={ele.urlToImage} newsurl ={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/>
                        </div>    
                        })}
                    </div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default News;
