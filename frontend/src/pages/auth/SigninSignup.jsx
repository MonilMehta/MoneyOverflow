import React, { useState } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { register, login } from "../../apis/user.api.js";
import { DollarSign, Menu, X, Eye, EyeOff } from 'lucide-react';

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");
`;

const BodyWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 80px 20px;
  position: relative;
  overflow-x: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Box = styled.div`
  width: 480px;
  max-width: 100%;
  min-height: 600px;
  height: auto;
  perspective: 1000px;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    width: 100%;
    min-height: 550px;
  }
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s ease-in-out;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

const BoxBase = styled.div`
  position: absolute;
  width: 100%;
  min-height: 600px;
  height: auto;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 30px;
  border-radius: 24px;
  background: #ffffff;
  border: 4px solid #ff5722;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 550px;
    padding: 30px 20px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(45deg, #ff5722 25%, transparent 25%), 
      linear-gradient(-45deg, #ff5722 25%, transparent 25%);
    background-size: 10px 10px;
    background-position: 0 0, 0 5px;
    opacity: 0.03;
    pointer-events: none;
    border-radius: 20px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    border: 2px solid #ff5722;
    border-radius: 50%;
    opacity: 0.3;
  }
`;

const BoxLogin = styled(BoxBase)`
  transform: rotateY(0deg);
`;

const BoxSignup = styled(BoxBase)`
  transform: rotateY(180deg);
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 2.8rem);
  margin-bottom: 20px;
  color: #000000;
  letter-spacing: 2px;
  font-weight: 900;
  text-transform: uppercase;
  font-family: "Arial", sans-serif;
  position: relative;
  z-index: 2;
`;

const SubTitle = styled.div`
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  color: #ff5722;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  font-family: "Arial", sans-serif;
  position: relative;
  z-index: 2;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  border-radius: 12px;
  margin-bottom: 15px;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  color: #000000;
  outline: none;
  transition: all 0.3s ease;
  font-weight: 500;
  font-family: "Arial", sans-serif;
  position: relative;
  z-index: 2;
  box-sizing: border-box;

  &:focus {
    border-color: #ff5722;
    box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.1);
  }

  &::placeholder {
    color: #888888;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 12px;
    margin-bottom: 12px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  font-size: clamp(1rem, 3vw, 1.2rem);
  letter-spacing: 2px;
  border-radius: 12px;
  background: #ff5722;
  color: #ffffff;
  font-weight: 900;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  text-transform: uppercase;
  font-family: "Arial", sans-serif;
  position: relative;
  z-index: 2;

  &:hover {
    background: #e64a19;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 87, 34, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 12px;
    margin-top: 15px;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
  z-index: 2;
`;

const PasswordToggleIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888888;
  transition: all 0.3s ease;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  border-radius: 4px;

  &:hover {
    color: #ff5722;
    background-color: rgba(255, 87, 34, 0.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const RegisterLink = styled.div`
  margin-top: 25px;
  font-size: 1rem;
  font-family: "Arial", sans-serif;
  position: relative;
  z-index: 2;

  p {
    color: #333333;
    font-weight: 500;
    margin: 0;
  }

  a {
    color: #ff5722;
    text-decoration: none;
    font-weight: 700;
    transition: all 0.3s ease;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover {
      color: #e64a19;
      text-decoration: underline;
    }
  }
`;

const UserSignup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  position: relative;
  z-index: 2;

  ${Input} {
    width: calc(50% - 5px);
  }
`;

const FormContainer = styled.form`
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DecorativeCircle = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 8px;
  opacity: 0.2;

  div {
    width: 12px;
    height: 12px;
    background: #ff5722;
    border-radius: 50%;
  }

  div:nth-child(2) {
    background: #e64a19;
  }

  div:nth-child(3) {
    background: #d84315;
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.2;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle, #9CA3AF 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: 0 0;
  }
`;

const GridLines = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.1;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(90deg, #9CA3AF 1px, transparent 1px),
      linear-gradient(0deg, #9CA3AF 1px, transparent 1px);
    background-size: 8.33% 12.5%;
  }
`;

function SignupSignin() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
    date_of_birth: "",
    password: "",
  });

  const flip = () => {
    setIsFlipped(!isFlipped);
  };

  const togglePasswordVisibilityLogin = () => {
    setShowPasswordLogin(!showPasswordLogin);
  };

  const togglePasswordVisibilitySignup = () => {
    setShowPasswordSignup(!showPasswordSignup);
  };

  const handleLoginInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupInputChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(login, loginData);
      document.cookie = `accessToken=${
        response?.data?.data?.accessToken
      };max-age=${7 * 24 * 60 * 60};path=/`;
      document.cookie = `userId=${response?.data?.data?.user?._id};max-age=${
        7 * 24 * 60 * 60
      };path=/`;
      document.cookie = `email=${response?.data?.data?.user?.email};max-age=${
        7 * 24 * 60 * 60
      };path=/`;
      console.log("Login successful:", response?.data);
      navigate('/main');
    } catch (error) {
      console.error("Login failed:", error.response);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const fullName = `${signupData.firstName} ${signupData.lastName}`;

    const signupPayload = {
      username: signupData.username,
      fullName,
      email: signupData.email,
      phone_no: signupData.phone_no,
      date_of_birth: signupData.date_of_birth,
      password: signupData.password,
    };

    try {
      const response = await axios.post(register, signupPayload);
      console.log("Signup successful:", response?.data);
      flip();
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <>
      <div>
        <nav className="bg-white border-b-4 border-[#ff5722] shadow-xl fixed top-0 w-full z-50">
          <div className="max-w-full mx-auto px-4 sm:px-8" style={{width: '100vw'}}>
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl sm:text-3xl font-black tracking-tight">
                  <span className="text-black">Money</span>
                  <span className="text-[#ff5722] italic">Overflow</span>
                </span>
              </div>

              <div className="hidden md:flex md:space-x-10">
                <Link
                  to="/"
                  className="border-[#ff5722] text-[#ff5722] inline-flex items-center px-4 pt-1 border-b-2 text-lg font-black transition-all duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/About"
                  className="border-transparent text-gray-600 hover:text-[#ff5722] hover:border-[#ff5722] inline-flex items-center px-4 pt-1 border-b-2 text-lg font-black transition-all duration-200"
                >
                  About
                </Link>
                <Link
                  to="/pricing"
                  className="border-transparent text-gray-600 hover:text-[#ff5722] hover:border-[#ff5722] inline-flex items-center px-4 pt-1 border-b-2 text-lg font-black transition-all duration-200"
                >
                  Pricing
                </Link>
              </div>

              <div className="hidden md:flex space-x-4">
                <Link to="/auth">
                  <button className="px-4 py-2 bg-white text-[#ff5722] border-2 border-[#ff5722] rounded-xl text-sm font-bold hover:bg-[#ff5722] hover:text-white transition-all duration-200">
                    Login
                  </button>
                </Link>
                <Link to="/auth">
                  <button className="px-4 py-2 bg-[#ff5722] text-white rounded-xl text-sm font-bold hover:bg-[#e64a19] transition-all duration-200">
                    Sign Up
                  </button>
                </Link>
              </div>

              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-[#ff5722] hover:text-[#e64a19] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ff5722] transition-all duration-200"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="text-[#ff5722] block px-3 py-2 rounded-md text-base font-bold border-l-4 border-[#ff5722] bg-orange-50"
              >
                Home
              </Link>
              <Link
                to="/About"
                onClick={closeMobileMenu}
                className="text-gray-600 hover:text-[#ff5722] hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-bold transition-all duration-200"
              >
                About
              </Link>
              <Link
                to="/pricing"
                onClick={closeMobileMenu}
                className="text-gray-600 hover:text-[#ff5722] hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-bold transition-all duration-200"
              >
                Pricing
              </Link>
              
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-3 px-3">
                  <Link to="/auth" onClick={closeMobileMenu}>
                    <button className="w-full px-4 py-2 bg-white text-[#ff5722] border-2 border-[#ff5722] rounded-xl text-sm font-bold hover:bg-[#ff5722] hover:text-white transition-all duration-200">
                      Login
                    </button>
                  </Link>
                  <Link to="/auth" onClick={closeMobileMenu}>
                    <button className="w-full px-4 py-2 bg-[#ff5722] text-white rounded-xl text-sm font-bold hover:bg-[#e64a19] transition-all duration-200">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <GlobalStyle />
        <BodyWrapper>
          <BackgroundPattern />
          <GridLines />
          
          <Box>
            <FlipCardInner isFlipped={isFlipped}>
              <BoxLogin>
                <FormContainer onSubmit={handleLoginSubmit}>
                  <Title>LOGIN</Title>
                  <SubTitle>Welcome Back</SubTitle>
                  
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={loginData.email}
                    onChange={handleLoginInputChange}
                  />
                  
                  <PasswordContainer>
                    <Input
                      type={showPasswordLogin ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      required
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                      autoComplete="current-password"
                    />
                    <PasswordToggleIcon
                      onClick={togglePasswordVisibilityLogin}
                      role="button"
                      tabIndex={0}
                      title={showPasswordLogin ? "Hide password" : "Show password"}
                      aria-label={showPasswordLogin ? "Hide password" : "Show password"}
                    >
                      {showPasswordLogin ? <EyeOff size={20} /> : <Eye size={20} />}
                    </PasswordToggleIcon>
                  </PasswordContainer>
                  
                  <Button type="submit">
                    LOGIN →
                  </Button>
                  
                  <Button 
                    type="button" 
                    style={{ background: '#000000', marginTop: '10px' }}                   
                    disabled={demoLoading}                   
                    onClick={async () => {                     
                      setLoginData({ email: 'chris@gmail.com', password: 'chris@C' });                     
                      setDemoLoading(true);                     
                      try {                       
                        const demoData = { email: 'chris@gmail.com', password: 'chris@C' };                       
                        const response = await axios.post(login, demoData);                       
                        document.cookie = `accessToken=${response?.data?.data?.accessToken};max-age=${7 * 24 * 60 * 60};path=/`;                       
                        document.cookie = `userId=${response?.data?.data?.user?._id};max-age=${7 * 24 * 60 * 60};path=/`;                       
                        document.cookie = `email=${response?.data?.data?.user?.email};max-age=${7 * 24 * 60 * 60};path=/`;                       
                        navigate('/main');                     
                      } catch (error) {                       
                        alert('Demo login failed.');                     
                      } finally {                       
                        setDemoLoading(false);                     
                      }                   
                    }}                 
                  >
                    Demo Login
                  </Button>
                </FormContainer>
                
                <RegisterLink>
                  <p>
                    Don't have an account?{" "}
                    <a onClick={flip}>Register Now</a>
                  </p>
                </RegisterLink>
                
                <DecorativeCircle>
                  <div></div>
                  <div></div>
                  <div></div>
                </DecorativeCircle>
              </BoxLogin>
              
              <BoxSignup>
                <FormContainer onSubmit={handleSignupSubmit}>
                  <Title>REGISTER</Title>
                  <SubTitle>Join Our Community</SubTitle>

                  <UserSignup>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={signupData.firstName}
                      onChange={handleSignupInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={signupData.lastName}
                      onChange={handleSignupInputChange}
                      required
                    />
                  </UserSignup>

                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={signupData.username}
                    onChange={handleSignupInputChange}
                    required
                  />

                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={signupData.email}
                    onChange={handleSignupInputChange}
                  />

                  <Input
                    type="tel"
                    name="phone_no"
                    placeholder="Phone Number"
                    required
                    value={signupData.phone_no}
                    onChange={handleSignupInputChange}
                  />

                  <Input
                    type="date"
                    name="date_of_birth"
                    placeholder="Date of birth"
                    required
                    value={signupData.date_of_birth}
                    onChange={handleSignupInputChange}
                  />
                  
                  <PasswordContainer>
                    <Input
                      type={showPasswordSignup ? "text" : "password"}
                      name="password"
                      placeholder="Create Password"
                      required
                      value={signupData.password}
                      onChange={handleSignupInputChange}
                      autoComplete="new-password"
                    />
                    <PasswordToggleIcon
                      onClick={togglePasswordVisibilitySignup}
                      role="button"
                      tabIndex={0}
                      title={showPasswordSignup ? "Hide password" : "Show password"}
                      aria-label={showPasswordSignup ? "Hide password" : "Show password"}
                    >
                      {showPasswordSignup ? <EyeOff size={20} /> : <Eye size={20} />}
                    </PasswordToggleIcon>
                  </PasswordContainer>
                  
                  <Button type="submit">
                    REGISTER →
                  </Button>
                </FormContainer>
                
                <RegisterLink>
                  <p>
                    Already have an account?{" "}
                    <a onClick={flip}>Log In</a>
                  </p>
                </RegisterLink>
                
                <DecorativeCircle>
                  <div></div>
                  <div></div>
                  <div></div>
                </DecorativeCircle>
              </BoxSignup>
            </FlipCardInner>
          </Box>
        </BodyWrapper>
      </div>
    </>
  );
}

export default SignupSignin;