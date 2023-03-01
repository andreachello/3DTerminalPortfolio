import React from 'react'
import { useEffect } from 'react'
import { useState, useRef } from 'react'
import { banner, projects, bio, socials, help, commandList, email, ls_guest, ls_cd_home } from './commands';

const Terminal = () => {

    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const inputRef = useRef()
    const appRef = useRef()
    const [commands, setCommands] = useState([]);
    const [git, setGit] = useState(0);

    const [currentDirectory, setCurrentDirectory] = useState("home")
    const [pwd, setPwd] = useState("guest@andreachello.com:~$ ")

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [output]);

    useEffect(() => {
        inputRef.current.focus()
        setOutput(banner + commandList)
    },[])

    const keyPress = (e) => {
        if (e.key === "Enter") {
            let newOutput = ""
            newOutput = output + "\n" + pwd + input + "\n"
            switch (input) {
                case "ls":
                    if (currentDirectory === "home") newOutput += ls_cd_home
                    break

                case "cd ..":
                  if (currentDirectory === "guest") {
                    setCurrentDirectory("home")
                    setPwd("guest@andreachello.com:~$ ")
                  }
                  break

                case "cd AndreaChello":
                  newOutput += "<span class='command'>Unathorized Access</span>"
                  break

                case "cat projects.txt":
                  newOutput += projects
                  break

                case "sudo cd AndreaChello":
                  newOutput += "<span class='command'>Unathorized Access</span>"
                  break

                case "help":
                    newOutput += help
                    break
                case "email":
                    newOutput += email
                    break
                case "banner": 
                    newOutput += banner
                    break
                case "socials":
                    newOutput += socials
                    break
                case "bio":
                    newOutput += bio
                    break
                case "projects":
                    newOutput += `<span id='command' />${projects}</span>`
                    break
                case "pwd":
                    newOutput += "My Network"
                    break
                case "clear":
                    setTimeout(function () {
                        setOutput("")
                      }, 1);
                      break;
                default:
                    newOutput += "<span class='inherit'>Command not found. For a list of commands, type <span class='command'>'help'</span>.</span>"
            }
            setOutput(newOutput)
            commands.push(input)
            setGit(commands.length);
            setInput("")
            
        }
        if (e.keyCode === 38 && git !== 0) {
            setGit(git - 1)
            setInput(commands[git - 1])
          }
          if (e.keyCode === 40 && git < commands.length) {
            setGit(git + 1);
            if (git === commands.length - 1) {
              setInput('')
            } else {
              setInput(commands[git + 1])
            }
          }          
    }

  return (
    <div className='App'
        onClick={e=>{
            inputRef.current.focus()
        }}
        ref={appRef}
    >
      <div id="terminal"><a id="before"></a></div>

      <div className='terminal' dangerouslySetInnerHTML={{ __html: output }}></div>

      <div id="liner">
          <span id="typer"></span> {input}<b className="cursor" id="cursor">█</b>
      </div>

      <input 
          id="texter"
          className='command'
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e=>{keyPress(e)}}
          />

      <div ref={messagesEndRef} />
    </div>
  )
}

export default Terminal