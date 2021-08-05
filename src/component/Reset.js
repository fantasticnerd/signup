import React, {Component} from 'react'
import axios from 'axios'

export default class Reset extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            update: false,
            error: false,
        };
    }

    async componentDidMount() {
        console.log(this.props.match.params.token);
        await axios.get('/reset', {
            params: {
                resetPasswordToken: this.props.match.params.token,
            },
        })
        .then(response => {
            console.log(response);
            if (response.data.message === 'password reset link a-ok') {
                this.setState({
                    email: response.data.email,
                    update: false,
                    error: false,
                });
            } else {
                this.setState({
                    update: false,
                    error: true,
                });
            }
        })
        .catch(error =>{
            console.log(error.data);
        });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    updatePassword = e => {
        e.preventDefault();
        axios.put('/updatePasswordViaEmail', {
            email: this.state.email,
            password: this.email.password,
        })
        .then(response => {
            console.log(response.data);
            if(response.data.message === 'password updated') {
                this.setState({
                    update: true,
                    error: false,
                });
            } else {
                this.setState({
                    update: false,
                    error: true,
                });
            }
        })
        .catch(error => {
            console.log(error.data);
        });
    };

    render() {
        const {password,error,update} = this.state;

        if(error) {
            return (
                <div>
                    <h4>Problem resetting password.</h4>
                </div>
            );
        } else {
            return (
                <div>
                    <form className = "form-control" onSubmit = {this.updatePassword} >
                        <input type="password" onChange = {this.handleChange ('password')}
                        value= {password} />
                        <button className = "btn btn-primary">Submit</button>
                    </form>
                    {update && (
                        <div>
                            <p>Your password has been reset successfully</p>
                        </div>
                    )}
                </div>
            )
        }
    }
}