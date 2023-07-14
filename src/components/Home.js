// import hljs from "highlight.js";
import Editor from '@monaco-editor/react';
import React, { useRef } from "react"
import { useState } from "react";
import LoadingBar from 'top-loading-bar/dist'
// import 'highlight.js/styles/github-dark.css';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../App.css'
function Home() {
    const editorRef = useRef(null);

    // function handleEditorDidMount(editor, monaco) {
    //     editorRef.current = editor;
    // }

    const files = {
        c: {
            ext: "c",
            language: "c",
            value: `#include <stdio.h>\n\n
int main() {

        // printf() displays the string inside quotation
        printf("Hello, World!");
        return 0;
}`
        }, js: {
            ext: "js",
            language: "javascript",
            value: "//program to print hello world \n\nconsole.log('hello world')"
        },
        py: {
            ext: "py",
            language: "python",
            value: "#program to hello world \n\nprint('hello world')"
        },
        cpp: {
            ext: "cpp",
            language: "cpp",
            value: `// Your First C++ Program 

#include <iostream>
            
int main() {
        
        std::cout << "Hello World!";
        return 0;
}`
        },
        java: {
            ext: "java",
            language: "java",
            value: `// Your First Program

class HelloWorld {

    public static void main(String[] args) {
            System.out.println("Hello, World!"); 
    }

}`
        },
        cs: {
            ext: "cs",
            language: "csharp",
            value: `// Hello World! program

namespace HelloWorld
{
    class Hello {         
        static void Main(string[] args)
        {
            System.Console.WriteLine("Hello World!");
        }
    }
}`
        },
        go: {
            ext: "go",
            language: "go",
            value: `package main

import "fmt"
            
func main() {

    fmt.Println("Hello World!")

}`
        }

    }
    const [file, updateFile] = useState(files.c)
    const [progress, setProgress] = useState(0)

    const handleChange = (e) => {
        if (e.target.value == "java") {
            updateFile(files.java)
        } else if (e.target.value == "py") {
            updateFile(files.py)
        } else if (e.target.value == "c") {
            updateFile(files.c)
        } else if (e.target.value == "cpp") {
            updateFile(files.cpp)
        }
        else if (e.target.value == "cs") {
            updateFile(files.cs)
        }
        else if (e.target.value == "go") {
            updateFile(files.go)
        } else if (e.target.value == "js") {
            updateFile(files.js)
        }


    }

    const runCode = async (e) => {
        setProgress(10)
        setProgress(40)
        // Default options are marked with *
        const response = await fetch("https://api.codex.jaagrav.in", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: file.value,
                language: file.ext,
            }), // body data type must match "Content-Type" header
        });
        setProgress(70)
        const result = await response.json();
        setProgress(90)
        document.getElementById("output").value = result.output == "" ? result.error : result.output;
        setProgress(100)
        console.log(file.value)
    }

    const handleChangeCode = (value, event) => {
        updateFile({ ...file, value: value })
    }
    return (
        <>
            <LoadingBar
                color='#1168FD'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={4}
            />
            <div className=" mt-1 d-flex justify-content-between align-items-center">

                <h4 className="ms-md-3 ms-0 mt-2 text-start text-primary">I - Code</h4>
                <div className="me-3 d-flex">
                    <select id="language" className="me-md-5 me-3 form-select text-light w-100" style={{ border: "none", backgroundColor: "#1E1E1E", minWidth: "10vw" }} onChange={handleChange}>

                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="js">Javascript</option>
                        <option value="java">Java</option>
                        <option value="py">Python</option>
                        <option value="cs">C#</option>
                        <option value="go">GoLang</option>
                    </select>
                    <button className="btn btn-primary px-md-2 px-0 py-0" onClick={runCode} style={{ minWidth: "100px" }}>Run<svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" fill="currentColor" class="bi bi-play-circle ms-2 mb-1" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                    </svg></button>
                </div>
            </div>
            <div className="container-fluid px-2 mt-2 ">
                <Editor
                    height="65vh"
                    language={file.language}
                    value={file.value}
                    theme='vs-dark'
                    width={"100%"}
                    path={`index.${file.ext}`}
                    onChange={handleChangeCode}
                />
                <h5 className="text-start ms-1 mt-3 text-primary">Output :</h5>
                <textarea disabled spellCheck={false} id="output" rows="5" className=" text-light w-100 p-2 px-3" style={{ outline: "none", border: "none", backgroundColor: "#1E1E1E", letterSpacing: "3px", wordSpacing: "5px" }}></textarea>
            </div>
        </>
    )
}

export default Home