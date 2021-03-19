import React from 'react'
import {Link} from 'react-router-dom'
import './Landing.css'

export default function Landing() {
    return (
        <section className="landing">
            <div className="motiforge summary">
                <div className="img1">
                    <h2 className="app-header">a music playground</h2>
                </div>
                <div className="motiforge info">
                    <p>
                        Motiforge streamlines the music composition process. This app provides a set of tools that allow you to explore music creation through
                        three main activities: motif, phrase, and form development. Each one is an essential building block of music. 
                        You can experiment by assembling these building blocks, combining them into songs, taking them apart, and putting them together in different ways.
                        Each activity provides options so can build your music from scratch, build on existing ideas, or let us help to compose for you!
                    </p>
                </div>
                <div className="infographic">
                    <Link to='/register'>make music</Link>
                </div>
            </div>
            <div className="motif summary">
                <div className="img2">
                    <h2>MOTIFS</h2>
                </div>
                <p>
                    Motifs are short melodic ideas. They can be thought of as the smallest cohesive segment of a song.
                    In the motif creator you can work on ideas by hand using the draw mode or you can set some rules and let the computer write for you.
                    You can create new ideas, edit them, add variations on your ideas, and you will soon be able share your ideas and collaborate with others.
                </p>
            </div>
            <div className="phrase summary">
                <div className="img3">
                    <h2>PHRASES</h2>
                </div>
                <p> 
                    We can produce familiarity and order by putting motifs into patterns. A phrase is a larger melodic idea made from multiple motifs. 
                    The phrase creator will assist you in building phrases from repeated motifs and variations thereof. You can make things more interesting by with harmony. Modal harmony is made possible here by shifting the 
                    pitch of motifs so they fit with certain notes. This progression of pitch contexts creates a sense of tension and release.
                </p>
            </div>
            <div className="form summary">
                <div className="img4">
                    <h2>FORMS</h2>
                </div>
                <p>
                    Form is the big-picture of a song; the overall structure. The form creator will let you
                    put phrases into sections and determine the pitch that will be its home-base. By connecting sections 
                    you will create and listen to full compositions! You can even press a single button and have a brand new composition written and performed for you.
                    In future versions more techniques will be made available to create more complex, rhythmically involved, and dynamic compositions.
                </p>
            </div>
        </section>
    )
}
