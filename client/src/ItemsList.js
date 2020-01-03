import React, { Component } from 'react'
import { Button } from 'reactstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';

class ItemsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }


    deleteItem = (itemId) => {
        axios({
                method: 'post',
                url: '/api/items',
                data: {
                    itemId: itemId
                }
            }).then(function (response) {
                response.status === 200 ? console.log('OK') : console.log("Error due to delete data");
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        axios.get('/api/items')
            .then(res => {
                this.setState({
                    items: res.data
                });
            });

        return (
            <div>
                {this.state.items.map((element, index) => {
                    return <div key={index}> <Button color="danger" onClick={() => this.deleteItem(element._id)}>X</Button> {element.name} {element._id} <Moment format="DD.MM.YYYY HH:mm">{element.added}</Moment><br /><br /></div>
                })}
            </div>
        )
    }
}

export default ItemsList;
