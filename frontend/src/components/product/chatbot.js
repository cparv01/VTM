import React, { useState, useCallback } from 'react';
import axios from 'axios';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageInput, MessageList, TypingIndicator, Message } from '@chatscope/chat-ui-kit-react';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { debounce } from 'lodash';
import { HighlightCode } from './HighlightCode';
// import '../styles.css';

const OLLAMA_API_URL = 'http://localhost:8000/api/ollama';

async function runOllamaModel(model, prompt) {
  try {
    const response = await axios.post(OLLAMA_API_URL, {
      model,
      prompt
    });

    if (response.status === 200) {
      const responseData = response.data;

      if (responseData.status) {
        return responseData.data; // data object directly
      } else {
        console.error('API Error:', responseData.message);
        return { status: false, message: 'Failed to fetch response from Ollama.' };
      }
    } else {
      console.error('HTTP Error:', response.status);
      return { status: false, message: 'Failed to fetch response from Ollama.' };
    }
  } catch (error) {
    console.error('Error fetching response from Ollama:', error);
    return { status: false, message: 'Failed to fetch response from Ollama.' };
  }
}

const assessmentPrompts = {
"Default" : " Identify any vulnerabilities, threats, or weaknesses and provide detailed steps to mitigate these issues. Ensure the solution does not introduce any new vulnerabilities and adheres to best security practices. Include a thorough report of your findings and the remediation steps taken.Fix this issue related to the vulnerabilities, provide me solution without any vulnerabilities",
"SCA": " Fix the vulnerabilities in this SCA(Security Control Assessment) and provide me only step by step solution",
"SAST": " Fix the vulnerabilities in this code and provide me only the fixed code",
"Web Application Security": " Fix this issue related to the vulnerabilities, provide me solution without any vulnerabilities",
"Cloud Based" : " Please analyze the provided cloud assessment report and identify a specific vulnerability mentioned in the report. Then, provide a Fixed and accurate recommended fix or mitigation strategy for that vulnerability, including any necessary technical steps or configurations.",
"VA/PT" : " Fix the vulnerabilities in the following code. Ensure the solution is secure and does not introduce any new vulnerabilities.",
"Configuration Review" : " Identify and fix any vulnerabilities, threats, or weaknesses found in the configuration. Provide a detailed report of your findings and the steps taken to secure the configuration.", 
"Open Source/Freeware Assessment": " Fix vulnerabilities in open-source/freeware used in your environment. Provide a step-by-step guide to mitigate these risks.",
"Secure Configuration Review (SCD)": " Fix security weaknesses in system configurations. Provide a step-by-step report outlining the vulnerabilities found and the steps taken to secure the configurations.",
"Open Share Review/Scanning": " Fix potential vulnerabilities in shared resources and scanning activities. Provide a step-by-step guide to enhancing security measures.",
"Vulnerability Assessment (VA)": " Identify and prioritize vulnerabilities across your network and systems. Provide a step-by-step plan for remediation.",
"Internal Penetration Testing": " Simulate an internal attack on your network to identify vulnerabilities. Provide a step-by-step guide to improving internal security measures.",
"Application Security Testing (Grey Box)": " Fix vulnerabilities and weaknesses in your application. Provide a step-by-step guide to enhancing application security.",
"APK Mobile App Assessment": " Fix vulnerabilities in your APK mobile application. Provide a step-by-step guide to securing the mobile app.",
"IOS Mobile App Assessment": " Fix vulnerabilities in your iOS mobile application. Provide a step-by-step guide to securing the mobile app.",
"API Assessment": " Fix vulnerabilities in your APIs. Provide a step-by-step guide to securing the APIs.",
"ITGC Control Review": " Fix deficiencies in IT General Controls (ITGC) in your organization. Provide a step-by-step guide to improving control effectiveness.",
"Secure Network Architecture Review": " Fix vulnerabilities in your network architecture. Provide a step-by-step guide to enhancing network security.",
"Source / Secure Code Review": " Fix vulnerabilities and weaknesses in your source code. Provide a step-by-step guide to securing the code.",
"System Architecture Review": " Fix vulnerabilities in your system architecture. Provide a step-by-step guide to enhancing system security.",
"External Penetration Testing": " Fix vulnerabilities and weaknesses exposed to the internet. Provide a step-by-step guide to improving external security measures.",
"End Point (Laptop / Desktop) Security Review": " Fix vulnerabilities in end-point devices (laptops/desktops) in your organization. Provide a step-by-step guide to securing end-point devices.",
"Password Spraying Attack Simulation": " Fix vulnerabilities in password security. Provide a step-by-step guide to enhancing password security.",
"Phishing Simulations": " Fix security gaps in phishing defenses. Provide a step-by-step guide to improving phishing defenses.",
"DFRA For Applications": " Fix deficiencies in Digital Forensic Readiness Assessment (DFRA) for your applications. Provide a step-by-step guide to improving forensic readiness.",
"Review of Policy, Procedures And Other Documents": " Fix gaps in security policies, procedures, and other relevant documents. Provide a step-by-step guide to enhancing policy effectiveness.",
"Cyber Security Maturity Assessment": " Fix areas for improvement in your organization's cybersecurity program. Provide a step-by-step guide to enhancing cybersecurity maturity.",
"Comprehensive Security Review Of Virtualization And VDI": " Fix vulnerabilities in virtualization and Virtual Desktop Infrastructure (VDI) environments. Provide a step-by-step guide to securing virtualized environments.",
"Rule based Reviews For Firewall And Centralized Proxy": " Fix misconfigurations or vulnerabilities in firewall and centralized proxy configurations. Provide a step-by-step guide to improving firewall and proxy security.",
"Effectiveness Review Of Security Devices/Solutions": " Fix gaps in security devices/solutions (e.g., IDS/IPS, SIEM). Provide a step-by-step guide to improving security device effectiveness.",
"Rule Based Review Of N/W Devices Such As Routers, Switches": " Fix misconfigurations or vulnerabilities in network devices such as routers and switches. Provide a step-by-step guide to improving network device security.",
"Review Of Critical Databases": " Fix vulnerabilities in critical databases. Provide a step-by-step guide to securing critical databases.",
"Review Of Application Risk Management Framework": " Fix gaps in application risk management framework. Provide a step-by-step guide to enhancing application risk management.",
"Change Request ": " Fix potential security implications in change requests. Provide a step-by-step guide to securely managing change requests.",
"SBI-IEHRT": " Fix vulnerabilities aligned with SBI-IEHRT (State Bank of India - Internal & External High Security Review Team) guidelines. Provide a step-by-step guide to securing your organization.",
"TPRM": " Fix third-party risks. Provide a step-by-step guide to mitigating these risks.",
"Computer Emergency Response Team - India": " Fix incident response capabilities following guidelines from CERT-In (Computer Emergency Response Team - India). Provide a step-by-step guide to improving incident response.",
"Security Rating For Organization": " Fix security posture to improve your organization's security rating. Provide a step-by-step guide to enhancing security.",
"BAS": " Fix vulnerabilitiesin business applications. Provide a step-by-step guide to securing business applications.",
"Deception": " Fix opportunities to enhance deception techniques. Provide a step-by-step guide to improving security effectiveness.",
"SBI-EPT": " Fix vulnerabilities aligned with SBI-EPT (State Bank of India - External Penetration Testing) guidelines. Provide a step-by-step guide to securing your organization.",
"SBI-IPT": " Fix vulnerabilities aligned with SBI-IPT (State Bank of India - Internal Penetration Testing) guidelines. Provide a step-by-step guide to securing your organization.",
"SBI-IT": " Fix vulnerabilities aligned with SBI-IT (State Bank of India - Information Technology) guidelines. Provide a step-by-step guide to securing your organization.",
"Red Team Internal": " Fix vulnerabilities in internal security defenses. Provide a step-by-step guide to improving internal security.",
"Red Team External": " Fix vulnerabilities in external security defenses. Provide a step-by-step guide to improving external security.",
"ISMS": " Fix gaps in Information Security Management System (ISMS). Provide a step-by-step guide to enhancing ISMS effectiveness.",
"Firewall Configuration Review": " Fix misconfigurations or vulnerabilities in firewall configuration. Provide a step-by-step guide to improving firewall security."
};

function Chatbot() {
  const [messages, setMessages] = useState([{ message: 'Welcome', sender: 'Assistant', type: 'text' }]);
  const [loading, setLoading] = useState(false);

  const debouncedProcessMessageToOllama = useCallback(
    debounce(async (message) => {
      setLoading(true);
      try {
        const response = await runOllamaModel('llama3', message);
        console.log('Response:', response); 

        if (response) {
          const messageObject = {
            message: response, 
            sender: 'Assistant',
            type: 'text'
          };
          setMessages((prevMessages) => [...prevMessages, messageObject]);
        } else {
          console.error('Error: Failed to fetch response from Ollama.');
          setMessages((prevMessages) => [...prevMessages, {
            message: 'Sorry, no response received. Please try again later.',
            sender: 'Assistant',
            type: 'text'
          }]);
        }
      } catch (error) {
        console.error('Error fetching response from Ollama:', error);
        setMessages((prevMessages) => [...prevMessages, {
          message: 'Sorry, try again later.',
          sender: 'Assistant',
          type: 'text'
        }]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const [selectedOption, setSelectedOption] = useState('');
  
  const handleSend = (message) => {
    let appendedMessage = message;


    switch (selectedOption) {
      case 'sca':                             //sca
        appendedMessage += ' Fix the vulnerabilities in this SCA(Security Control Assessment) and provide me only step by step solution';
        break;
      case 'SAST':                             //SAST
        appendedMessage += 'Fix the vulnerabilities in this code and provide me only the fixed code';
        break;
      case 'Web Application Security':                             //web
        appendedMessage += 'Fix this issue related to the vulnerabilities, provide me solution without any vulnerabilities';
        break;
      case 'Cloud Based':                             // Cloud-Based
        appendedMessage += 'Please analyze the provided cloud assessment report and identify a specific vulnerability mentioned in the report. Then, provide a Fixed and accurate recommended fix or mitigation strategy for that vulnerability, including any necessary technical steps or configurations.';
        break;
      case 'VA/PT':                             //VA/PT
        appendedMessage += 'fix the vulnerabilities in the following code. Ensure the solution is secure and does not introduce any new vulnerabilities.';
        break;
      case 'Configuration Review':                             //Configuration Review
        appendedMessage += 'Identify and fix any vulnerabilities, threats, or weaknesses found in the configuration. Provide a detailed report of your findings and the steps taken to secure the configuration.';
        break;
      default:
        appendedMessage += 'Identify any vulnerabilities, threats, or weaknesses and provide detailed steps to mitigate these issues. Ensure the solution does not introduce any new vulnerabilities and adheres to best security practices. Include a thorough report of your findings and the remediation steps taken.Fix this issue related to the vulnerabilities, provide me solution without any vulnerabilities';
        break;
    }
    
    const newMessage = { message, sender: 'User', type: 'text' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    // debouncedProcessMessageToOllama(`${message}provide me Fix the vulnerabilities in this code and return only the fixed code `);
    
    debouncedProcessMessageToOllama(appendedMessage);

    console.log("appendedMessage is: ",appendedMessage);
  };
  

  return (
    <div className="App">
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, height: '60%', marginBottom: '50px', width: '50%', overflow: 'auto', backgroundColor: "white" }}>
      <div style={{ marginTop: '20px', backgroundColor: "yellowgreen"}}>
          {/* <label>
            <input 
            type="radio" 
            name="option" 
            value="sca" 
            checked={selectedOption === 'sca'} 
            onChange={() => setSelectedOption('sca')}
            /> SCA &nbsp; &nbsp;
          </label>
          <label>
            <input 
            type="radio" 
            name="option" 
            value="SAST" 
            checked={selectedOption === 'SAST'} 
            onChange={() => setSelectedOption('SAST')} 
            /> SAST &nbsp; &nbsp;
          </label>
          <label>
            <input 
            type="radio" 
            name="option" 
            value="Web Application Security" 
            checked={selectedOption === 'Web Application Security'} 
            onChange={() => setSelectedOption('Web Application Security')} 
            /> Web Application Security &nbsp; &nbsp;
          </label>
          <label>
            <input 
            type="radio" 
            name="option" 
            value="Cloud Based" 
            checked={selectedOption === 'Cloud Based'} 
            onChange={() => setSelectedOption('Cloud Based')} 
            /> Cloud Based &nbsp; &nbsp;
          </label>
          <label>
            <input 
            type="radio" 
            name="option" 
            value="VA/PT" 
            checked={selectedOption === 'VA/PT'} 
            onChange={() => setSelectedOption('VA/PT')} 
            /> VA/PT &nbsp; &nbsp;
          </label>
          <label>
            <input 
            type="radio" 
            name="option" 
            value="Configuration Review" 
            checked={selectedOption === 'Configuration Review'} 
            onChange={() => setSelectedOption('Configuration Review')} 
            /> Configuration Review &nbsp; &nbsp;
          </label> */}
          <label style={{marginTop:"10px", marginBottom:"10px"}}>
            <label for="Assessment_Type" >Select Assessment Type: &nbsp;&nbsp; </label>
            <select 
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}>
              <option value={selectedOption}>{selectedOption || 'Default'}</option>
              {Object.keys(assessmentPrompts).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            {/* <input 
              type="radio" 
              name="option" 
              value="other" 
              checked={selectedOption === 'other'} 
              onChange={() => setSelectedOption('other')} 
            /> */}
          </label>
        </div>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth" 
              typingIndicator={loading ? <TypingIndicator content="typing" /> : null}
            >
              {messages.map((msg, index) => (
                <div key={index} style={{ textAlign: msg.sender === 'User' ? 'right' : 'left' }}>
                  {msg.sender === 'User' && msg.type === 'text' ?   (
                    <div style={{ textAlign: 'right', marginBottom: '5px', marginTop: '50px' }}>
                      <h5 style={{ textAlign: 'right' }}><b>Query</b></h5>
                      <div style={{
                        textAlign: 'left',
                        paddingLeft: "10px",
                        marginLeft: "80px",
                        backgroundColor: 'skyblue',
                        overflowX: 'auto',
                        borderRadius: '5px',
                        color: 'black',
                        padding: '8px',
                        whiteSpace: 'pre-wrap',
                        width: 'calc(100% - 90px)' // Adjust the width based on padding and margin
                      }}>
                        <Message 
                          key={index} model={{
                            message: (msg.message),
                            position: "single"
                          }} 
                          style={{
                            justifyContent: "left",
                            overflow:"auto"
                          }} 
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={{ marginBottom: '5px', marginTop: '50px' }}>
                      <h5><b>Response</b></h5>

                      <HighlightCode language='javascript' style={dracula}>
                            {msg.message}
                      </HighlightCode>
                      {/* {msg.type === 'code' ? (
                          <HighlightCode language='javascript' style={dracula}>
                            {msg.message}
                          </HighlightCode>
                        ) : (
                          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                            {msg.message}
                          </pre>
                        )} */}
                      </div>
                  )}
                </div>
              ))}
            </MessageList>
            <MessageInput placeholder="Ask vulnerabilities related queries" onSend={handleSend} style={{ textAlign: "left" }} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chatbot;











//  const processMessageToDeepInfra = async (message) => {
//     const formattedMessage = `[] ${message} [/]`;
//     const apiRequestBody = { input: formattedMessage };

//     try {
//       const response = await axios.post(MODEL_URL, apiRequestBody, {
//         headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
//       });

//       const responseData = response.data.results[0].generated_text;
//       const formattedResponse = formatResponse(responseData);
//       setMessages((prevMessages) => [...prevMessages, { message: formattedResponse, sender: 'Assistant' }]);
//     } catch (error) {
//       console.error('Error fetching response from Deep Infra:', error);
//       setMessages((prevMessages) => [...prevMessages, { message: 'Sorry, Try again later.', sender: 'Assistant' }]);
//     } finally {
//       setIsTyping(false);
//     }
//  };

//  const formatResponse = (response) => {
//     return response.replace(/\[CODE\]/g, ' ``` ');
//   };



// function Chatbot() {
//   const [messages, setMessages] = useState([{ message: "Welcome", sentTime: "just now", sender: "ChatGPT" }]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = { message, direction: 'outgoing', sender: "user" };

//     const newMessages = [...messages, newMessage];
    
//     setMessages(newMessages);
//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     let apiMessages = chatMessages.map((messageObject) => {
//         let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
//         return { role, content: messageObject.message };
//       });
    
//       const apiRequestBody = {
//         model: "gpt-3.5-turbo",
//         messages: [systemMessage, ...apiMessages],
//       };
    
//       try {
//         const response = await axios.post("", apiRequestBody, {
//           headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
//         });
//         setMessages([...chatMessages, { message: response.data.choices[0].message.content, sender: "ChatGPT" }]);
//       } catch (error) {
//         if (error.response?.status === 429) {
//           console.warn('API rate limit reached. Retrying...');
//         } else {
//           console.error('Error fetching response from ChatGPT:', error);
//           setMessages([...chatMessages, { message: 'Sorry, Try again later.', sender: "ChatGPT" }]);
//         }
//       } finally {
//         setIsTyping(false);
//       }
//     }




// ---------------------------------------------------------------------------------------------------------------------



// import { useState, useEffect } from 'react';
// import './App.css';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import axios from 'axios';

// const API_KEY = "sk-proj-ysowTSXH23Y5SaYWAvwbT3BlbkFJlSGQ9yNXfG8P8XUBhoAB";

// const systemMessage = { "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience." };

// function Chat() {
//   const [messages, setMessages] = useState([{ message: "Hello, I'm ChatGPT! Ask me anything!", sentTime: "just now", sender: "ChatGPT" }]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = { message, direction: 'outgoing', sender: "user" };
//     const newMessages = [...messages, newMessage];
//     setMessages(newMessages);
//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = "";
//       if (messageObject.sender === "ChatGPT") role = "assistant";
//       else role = "user";
//       return { role: role, content: messageObject.message };
//     });

//     const apiRequestBody = { "model": "gpt-3.5-turbo", "messages": [systemMessage, ...apiMessages] };

//     try {
//       const response = await axios.post("", apiRequestBody, {
//         headers: { "Authorization": "Bearer " + API_KEY, "Content-Type": "application/json" }
//       });
//       setMessages([...chatMessages, { message: response.data.choices[0].message.content, sender: "ChatGPT" }]);
//       setIsTyping(false);
//     } catch (error) {
//       console.error('Error fetching response from ChatGPT:', error);
//       setMessages([...chatMessages, { message: 'Sorry, I encountered an error.', sender: "ChatGPT" }]);
//       setIsTyping(false);
//     }
//   }

//   return (
//     <div className="App">
//       <div style={{ position: "relative", height: "800px", width: "700px" }}>
//         <MainContainer>
//           <ChatContainer>
//             <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}>
//               {messages.map((message, i) => {
//                 console.log(message)
//                 return <Message key={i} model={message} />
//               })}
//             </MessageList>
//             <MessageInput placeholder="Type message here" onSend={handleSend} />
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   );
// }

// export default Chat;








// -------------------------------------------------------------------------------------------------------------------------------------------------


// import React, { useState, useCallback } from 'react';
// import axios from 'axios';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageInput, MessageList, TypingIndicator, Message} from '@chatscope/chat-ui-kit-react';
// import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { debounce } from 'lodash'; 
// import { HighlightCode } from './HighlightCode';
// import Loader from './loder';
// import '../styles.css';

// const API_KEY = 'ankZuexYNZbmfDohy9ezWpoV1HjnIcZ1';
// const MODEL_URL = 'https://api.deepinfra.com/v1/inference/Phind/Phind-CodeLlama-34B-v2';

// function Chatbot() {
//   const [messages, setMessages] = useState([{ message: 'Welcome', sender: 'Assistant', type: 'text' }]);

//   const [loading, setLoading] = useState(false);

//   const debouncedProcessMessageToDeepInfra = useCallback(
//     debounce(async (message) => {
//       // setLoading(true)
//       try {
//         const response = await axios.post(MODEL_URL, { input: message }, {
//           headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
//         });

//         const responseData = response.data.results[0].generated_text;
//         const messageObject = { message: responseData, sender: 'Assistant', type: 'text' };
//         if (responseData.includes('[CODE]')) {
//           // messageObject.type = 'code';
//         }
//         setMessages((prevMessages) => [...prevMessages, messageObject]);
//         setLoading(false)
        
        
//       } catch (error) {
        
//         console.error('Error fetching response from Deep Infra:', error);
//         setMessages((prevMessages) => [...prevMessages, { message: 'Sorry, try again later.', sender: 'Assistant', type: 'text' }]);
//         setLoading(false)
//       }
//     }, 1),
//     []
//   );

//   const handleSend = (message) => {

//     setLoading(true);
//     const newMessage = { message, sender: 'User', type: 'text' };
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     debouncedProcessMessageToDeepInfra(`${message}provide me Fix the vulnerabilities in this code and return only the fixed code as output without any description`);
//   };

//   function formatCodeSnippet(code) {
//     // Remove leading and trailing whitespace from each line
//     const formattedCode = code.split(';').map(line => line.trim()).join(';\n');
//     return formattedCode;
// }

// function parv(html) {
//     let doc = new DOMParser().parseFromString(html, 'text/html');
//     let text = doc.body.textContent || "";
//     return formatCodeSnippet(text);
// }

// const isOutgoing = false;


//   return (
//     <div className="App">
//       <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, height: '600px', marginBottom: '50px', width: '50%', overflow: 'auto' }}>
//         <MainContainer>
//           <ChatContainer>
//             <MessageList
//               scrollBehavior="smooth" 
//               typingIndicator={loading ? <TypingIndicator content="typing" /> : null}
//             >
//               {messages.map((msg, index) => (
//                 <div key={index} style={{ textAlign: msg.sender === 'User' ? 'right' : 'left' }}>
//                   {msg.sender === 'User' && msg.type === 'text' ?   (
//                   <div style={{ textAlign: 'right', marginBottom: '5px', marginTop: '50px' }}>
//                     <h5 style={{ textAlign: 'right' }}><b>Query</b></h5>
//                     <div style={{
//                       textAlign: 'left',
//                       paddingLeft: "10px",
//                       marginLeft: "80px",
//                       backgroundColor: 'skyblue',
//                       overflowX: 'auto',
//                       borderRadius: '5px',
//                       color: 'black',
//                       padding: '8px',
//                       whiteSpace: 'pre-wrap',
//                       width: 'calc(100% - 90px)' // Adjust the width based on padding and margin
//                     }}>

//                       <Message 
//                       key={index} model={{
//                         message: (msg.message),
//                         position: "single"
//                       }} 
//                       style={{
//                         justifyContent: "left",
//                         overflow:"auto"
//                       }} 
//                       />
                    
//                     </div>
//                   </div>
//                   ) : (
//                     <div style={{ marginBottom: '5px', marginTop: '50px' }}>
//                       <h5><b>Response</b></h5>
//                       <HighlightCode language={msg.type === 'code' ? 'javascript' : 'text'} style={dracula}>
//                         {msg.message}
//                       </HighlightCode>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             {/* {loading && <Loader onSend={loading}/>} */}
//             </MessageList>
//             <MessageInput placeholder="Ask vulnerabilities related queries" onSend={handleSend} style={{ textAlign: "left" }} />
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   );
// }

// export default Chatbot;
