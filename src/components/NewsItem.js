import React, { Component } from 'react'

export class NewsItem extends Component {
    
    render() {
        let {title, description, imgurl, newsurl} = this.props;
        return (
            <div className = "my-3">
                <div className="card">
                    <img src={!imgurl?"https://www.cnet.com/a/img/SYCNVYPfsbTDenXvz38kPmeLRmw=/1200x630/2021/09/02/1634ea41-c12b-4eb1-b5d1-9eb04a63a999/inspiration4cupolaisaacman.jpg":imgurl} className="card-img-top" alt="newsap"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <a href={newsurl} className="btn btn-sm btn-primary">Read more</a>
                </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;
