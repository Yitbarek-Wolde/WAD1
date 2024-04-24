import { useState, FormEvent } from 'react'
import './style.css'
import axios from "axios";
import * as ls from "local-storage";
import { useNavigate } from 'react-router-dom';





export default function Login() {
    let pageroute = useNavigate()
    const [info, setInfo] = useState({ username: '', password: '' })
    const [errorMes, setErrormes] = useState({ change: false, message: '' })
    

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3005/api/auth/login',
                { ...info },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            console.log(response.data)


            if (!response.data.success) {

                setErrormes({ change: true, message: response.data.messgae })
            } else {
                setErrormes({ change: false, message: 'true' })

                ls.set('secret', response.data.accessToken)
                pageroute('/home')
            }
        } catch (err) {
            if (err instanceof Error)
                console.log(err.message + " came here")
        }
    };
    return (


        <div className='bg-dark' style={{ marginTop: '15%' }}>

            <main className="form-signin w-100 m-auto">

                <form>
                    <h1 className="h3 mb-3 fw-normal" style={{color: "white"}}>Please sign in</h1>
                    {errorMes.change && <p style={{color: "red", fontWeight: "bolder"}}>{errorMes.message}</p>}
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setInfo({ ...info, username: e.target.value })} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating" style={{marginTop: "5%"}}>
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setInfo({ ...info, password: e.target.value })} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </form>

                <button className="btn btn-primary w-100 py-2" type='submit' onClick={handleLogin}>Sign in</button>
               
            </main>
        </div>


    )
}