import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();

  return (
    <div
        style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflowY: 'hidden',
        }}
    >
        <MDBContainer fluid className='my-5'>
            <MDBRow className='g-0 align-items-center'>
                <MDBCol col='6'>

                    <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
                    <MDBCardBody className='p-5 shadow-5 text-center'>

                        <h2 className="fw-bold mb-5">Sign up now</h2>

                        <MDBRow>
                            <MDBCol col='6'>
                                <MDBInput wrapperClass='mb-4' label='User name' id='form1' type='text'/>
                            </MDBCol>

                            <MDBCol col='6'>
                                <MDBInput wrapperClass='mb-4' label='Full name' id='form2' type='text'/>
                            </MDBCol>
                        </MDBRow>

                        <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email'/>
                        <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password'/>

                        <div className='d-flex justify-content-center mb-4'>
                        </div>

                        <MDBBtn className='w-100 mb-4' size='md'>sign up</MDBBtn>
                        <MDBBtn className='w-100 mb-4' color='secondary' size='md' onClick={() => navigate('/signin')}>Back to sign in</MDBBtn>

                        <div className="text-center"></div>

                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol col='6'>
                    <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" class="w-100 rounded-4 shadow-4"
                    alt="" fluid/>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    </div>
  );
}

export default SignUp;