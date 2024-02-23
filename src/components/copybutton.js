import React, { useState } from 'react';
import '../styles/staticapp.css';

function CopyButton({url}){
    const [copied, setCopied] = useState({});
    const [copiedText, setCopiedText] = useState('Copy')

    function showCopy(){
        setCopied({visibility: 'visible'});
    }
    function removeCopy(){
        setCopied({});
        setCopiedText('Copy');
    }
    function copyUrl(){
        navigator.clipboard.writeText(url);
        setCopiedText('Copied!')
    }

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16" onClick={copyUrl} onMouseOver={showCopy} onMouseOut={removeCopy} >
                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
            </svg>
            <p className='copy' style={copied}>{copiedText}</p>
        </>
    )   
}

export default CopyButton;