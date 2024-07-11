import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../firebaseServices';

const SignUp = ({ setShowNav }) => {
    useEffect(() => {
        setShowNav(false);
        return () => setShowNav(true);
    }, [setShowNav]);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const userdata = { username, password }
            await addUser(userdata)
            alert("Đăng kí tài khoản thành công!")
            navigate('/')
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }

    return (
    <>
        <div style={{
            width: '100%',
            height: '100vh',
            overflow: 'hidden'
        }}>
            <Link to='/' style={{ textDecoration: 'none', position: 'absolute', padding: '20px 40px', zIndex: 2 }}>
                <h1 style={{
                    fontSize: 34,
                    color: '#4501c4',
                    fontFamily: "Playwrite CU",
                }}>Waves</h1>
            </Link>
            <img 
                className='hidden sm:block absolute w-full h-full object-cover' 
                src='https://e0.pxfuel.com/wallpapers/321/493/desktop-wallpaper-neon-light-waves-huawei-mediapad-stock-pink-abstract-pink-neon-lights.jpg' 
                alt='/'
                style={{
                    width: '100%',
                    height: '100vh',
                    objectFit: 'cover'
                }}
            />
            <div style={{
                backgroundColor: 'rgb(0 0 0 / 0.6)',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh'
            }}></div>
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                maxWidth: '450px',  
                padding: '1rem',
                zIndex: 999
            }}>
                <div style={{
                    maxWidth: 450,
                    height: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    backgroundColor: 'rgb(0 0 0 / 0.75)',
                    color: 'rgb(255 255 255 / 1)'
                }}>
                    <div style={{
                        maxWidth: '320px',
                        margin: '0 auto',
                        padding: '64px 0'
                    }}>
                        <h1 style={{
                            fontSize: '1.875rem',
                            lineHeight: '2.25rem',
                            fontWeight: 'bold',
                            color: 'white'
                        }}>Đăng kí</h1>
                        { error !== '' ? <p style={{
                            padding: '0.75rem',
                            backgroundColor: 'rgb(214 32 32)',
                            margin: '0.5rem 0'
                        }}>{error}</p> : null }
                        <form onSubmit={handleSubmit} style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '16px 0'
                        }}>
                            <input 
                                onChange={(e) => setUsername(e.target.value)} 
                                style={{
                                    padding: '0.75rem',
                                    margin: '0.5rem 0',
                                    backgroundColor: '#374151',
                                    borderRadius: '0.25rem',
                                    color: 'white'
                                }}
                                type='text' 
                                placeholder='Username' 
                                required
                            />
                            <input 
                                onChange={(e) => setPassword(e.target.value)} 
                                style={{
                                    padding: '0.75rem',
                                    margin: '0.5rem 0',
                                    backgroundColor: '#374151',
                                    borderRadius: '0.25rem',
                                    color: 'white'
                                }}
                                type='password' 
                                placeholder='Password' 
                                autoComplete='current-password' 
                                required
                            />
                            <button style={{
                                backgroundColor: '#DC2626',
                                padding: '0.75rem 0',
                                margin: '1.5rem 0',
                                borderRadius: '50px',
                                fontWeight: 'bold',
                                fontSize: 14,
                                cursor: 'pointer'
                            }}>Đăng kí</button>
                        </form>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.875rem',
                            color: '#4B5563'
                        }}>
                            <p><input style={{marginRight: '0.5rem'}} type='checkbox'/>Hãy nhớ tôi</p>
                            <p>Cần giúp đỡ?</p>
                        </div>
                        <p style={{padding: '32px 0'}}>
                            <span style={{color: '#4B5563'}}>
                            Đã có tài khoản ?
                            </span>{' '}
                            <Link to='/login' style={{color: '#3689d6'}}>Đăng nhập ngay</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
};

export default SignUp;