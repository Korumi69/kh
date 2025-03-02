import React, { useState, useEffect } from 'react';
import './App.css';
import pfp from './images/pfp1.gif';
import tiktok from './images/tiktok.png';
import insta from './images/insta.png';
import yt from './images/yt.png';
import discord from './images/discord.png';
import cover from './images/cover.png';
import stop from './song/m1.mp3';
import bg from './videos/m.mp4';
import git from './images/git2.png';
import spotify from './images/spotify.png';
import viewb from './images/viewL.svg';
import lh from './images/lH.png';
import rh from './images/rH.png';

function App() {
    const [viewCount, setViewCount] = useState(2045); // No commas here
    const [currentTime, setCurrentTime] = useState(0);
    const maxTime = 128;
    const [isPlaying, setIsPlaying] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const [isOverlayClicked, setIsOverlayClicked] = useState(false);
    const [bio, setBio] = useState('');
    const [entered, setEntered] = useState(false); // State for animation
    const [isVideoBlurred, setIsVideoBlurred] = useState(true); // Control blur

    useEffect(() => {
        fetch('/increment-view')
            .then(response => response.json())
            .then(data => setViewCount(data.viewCount))
            .catch(error => console.error('Error:', error));
    }, []);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        return formattedTime;
    }

    useEffect(() => {
        const audioElement = document.getElementById('audio');
        if (!isPlaying && isOverlayClicked) {
            audioPlay();
            setIsPlaying(true);
        }

        const interval = setInterval(() => {
            const elapsedTime = Math.round(audioElement.currentTime);
            setCurrentTime(elapsedTime);

            if (elapsedTime >= maxTime) {
                audioElement.currentTime = 0;
                setCurrentTime(0);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [isPlaying, isOverlayClicked, maxTime]);

    function audioPlay() {
        var audio = document.getElementById('audio');
        audio.volume = 1;
        audio.play();
    }

    const handlePlayPause = () => {
        const audioElement = document.getElementById('audio');
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleOverlayClick = () => {
        setShowOverlay(false);
        setIsOverlayClicked(true);
        setIsVideoBlurred(false); // Unblur video after first click
        audioPlay();
        setEntered(true); // Animation trigger
    };

    // Function to format viewCount with commas
    const formatViewCount = (count) => {
        return count.toLocaleString('en-US'); // Enforce US locale for commas
    };

    return (
        <div className='app-container'>
            <video
                autoPlay
                loop
                muted
                className={`video-background ${isVideoBlurred ? 'blurred' : ''}`} // Add blurred class conditionally
            >
                <source src={bg} type='video/mp4' />
                Your browser does not support the video tag.
            </video>

            {showOverlay && (
                <div className='overlay' onClick={handleOverlayClick}>
                    <p className='click'>龙</p>
                </div>
            )}

            <div className={`main-container ${entered ? 'entered' : ''}`}>
                <img src={viewb} className='view' alt="View Icon" />
                <p className='num'>{formatViewCount(viewCount)}</p> {/* Use the format function */}
                <img src={pfp} className='pfp' alt="Profile Picture" />
                <div className='info'>
                    <h1 className='name'>{"K / O"}</h1>
                    <h1 className='bio'>{bio}</h1>
                </div>
                <div className='links'>
                    <a href="XY" target="_blank" rel="noopener noreferrer">
                        <img src={lh} className='link1' alt="Hand" />
                    </a>
                    <a href="https://open.spotify.com/user/31anlaabyn6jky5rgzlkaipli3im?si=6159e220adad457e" target="_blank" rel="noopener noreferrer">
                        <img src={spotify} className='link1' alt="Spotify" />
                    </a>
                    <a href="https://tiktok.com/@MS4wLjABAAAAu1JAvlApT82n6y2SRQ0YGj6669nVIz9yp8yKId4KBrY7I0NP9-B6cXBIPdj4ZYEz" target="_blank" rel="noopener noreferrer">
                        <img src={tiktok} className='link1' alt="Tiktok" />
                    </a>
                    <a href="https://discord.com/users/1132800116663791768" target="_blank" rel="noopener noreferrer">
                        <img src={discord} className='link1' alt="Discord" />
                    </a>
                    <a href="XY" target="_blank" rel="noopener noreferrer">
                        <img src={rh} className='link1' alt="Hand" />
                    </a>
                    <audio id='audio' src={stop} loop />
                </div>
            </div>
        </div>
    );
}

export default App;
