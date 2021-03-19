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
                        You can assemble and experiment by combining them into songs, taking them apart, and putting them together in different ways.
                        Each activity provides options so can build your music from scratch, build from prebuilt ideas, or let your computer compose for you!
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
                    Motifs are short melodic ideas. They can be thought of as the smallest segment of a song.
                    In the motif creator you can work on ideas by hand using the piano roll or you can set some rules and let the computer write for you.
                    You can create new ideas, edit them, add variations on your ideas, and you will soon be able share your ideas and collaborate with others.
                </p>
            </div>
            <div className="phrase summary">
                <div className="img3">
                    <h2>PHRASES</h2>
                </div>
                <p>
                    A phrase is a larger melodic idea made from multiple motifs. 
                    We can produce familiarity and order by putting motifs into patterns. The phrase creator will assist you
                    in building phrases from repeated motifs and variations thereof. You can make things more interesting by with harmony. Shifting the 
                    pitch of phrases so they fit with certain notes creates a sense of tension and release.
                </p>
            </div>
            <div className="form summary">
                <div className="img4">
                    <h2>FORMS</h2>
                </div>
                <p>
                    Form is the big-picture of a song; the overall structure. The form creator lets you
                    put phrases into sections and determine the pitch that will be its home-base. By connecting sections 
                    you can create and listen to full compositions! You can even press a single button and have a brand new composition written and performed for you.
                </p>
            </div>
        </section>
    )
}
