import React, { Component } from 'react';
import classnames from 'classnames';
import axios from 'axios'

class Forgot extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
        }
        axios.post('/forgot', user)
            .then(res => {
                console.log(user)
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }


    render() {
        const { errors } = this.state;
        return (
            <div className="container" style={{ marginTop: '50px', width: '700px' }}>
                <h2 style={{ marginBottom: '40px' }}>Forgot Password</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            onChange={this.handleInputChange}
                            value={this.state.email}
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Forgot