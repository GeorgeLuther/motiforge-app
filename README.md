# Motiforge

* Live version: https://motiforge-app-georgeluther.vercel.app/
* Demo Username: admin
* Demo Password: pass
* Associated API:
  - Repository: https://github.com/GeorgeLuther/motiforge-api

## Summary

Motiforge assists users in the music composition process. 
Users can create music from its basic building blocks:

- Motifs
- Phrases
- Forms

 The long term goal of this project is to create an app that generates music through a system of rules, ranges, and randomness. Eventually users should be able to guide the composition process or leave it completely up to the machine; always with interesting and appealing musical results. We build small motifs and variations thereof. Then, given a harmonic structure these motifs are concatenated into larger phrases and variations thereof. These phrases are similarly concatenated into sections with consideration of tonal centers. Finally, the sections are concatenated into the formal structure of the piece and it is then performed.

## Motif Page

In the motif creator you can select a motif to work on from a list of your motifs. 

Once selected you can play back your idea with the play button. It will play on repeat with a break between each play through until paused.

Work on ideas by hand using the 'Draw Mode'. In this area you can edit the pitch of each note by selecting a different color. You can also add and delete beats or delete the entire motif with the options at the bottom.

An alternative approach to creating motifs is to select an option in the 'Generate Motif' area. You may add individual notes to a motif, generate a whole new motif, or generate a variation on the motif. 

These techniques are part of a long term goal of the project to provide a framework for human guided computer generated music. The functions at play are described below.


### Generate Notes: 
#### These functions are used to generate individual notes in context. These functions are described further in the context of makeMotif. 

### Generate Motifs: 
#### These functions are used to generate an array of pitches 

- [x]
#### makeMotif: 
Small 2 to 5 note ideas that emphasize chord-tones
1. The first note is either a random note within the octave or a chord-tone
2. The notes in-between can be
- randNote: A random note within the octave
- chordNote: A chord-tone
- nearNote: The nearest chord-tone to the previous note
- stepNote: A note up or down 1 step i.e. 1>>2 or 1>>-1
- skipNote: A note up or down an interval of a third i.e 1>>3 or 1>>-2
- hopNote: A note up a fourth or down a fifth
- jumpNote: A note up a fifth or down a fourth
3. If the first note was a chord tone then the last note can be any of the above.
If the first note was not a chord tone then the last note must be the nearest chord-tone to the second to last note

- [x]
#### linearMotif: 
Make a motif moving in one direction by a fixed intervallic leap.
i.e 1,2,3,4,5 or 1,3,5,7,9 or 1,4,7,10
If the interval is large then the motif will be shorter, this is done to avoid melodies that span an 'unnatural' range.

- []
#### circleMotif: 
A circle motif approaches or trails a chord tone with a pattern of symmetrically related notes.
i.e 243 or 3423 or 4,2,-3,-1,1

### Manipulate Motifs:
#### These functions create variations based on a motif
- [x]
#### Reverse: 
flips a motif from end to start
0,2,4 becomes 4,2,0
- [x]
#### Mirror: 
the original motif followed by its reverse, including or excluding its apex
1,2,3,4,4,3,2,1 or 1,2,3,4,3,2,1
- [x]
#### Negate: 
each note becomes its negative (relative to scale/tonal center)
2,3,4 becomes -2,-3,-4
- [x]
#### Invert: 
each note becomes its negative relative to the starting pitch
2, 3 ,4 becomes 2,1,-1
- [x]
#### Upend:
each note becomes its negative relative to the end pitch
- [x]
#### Overturn:
each note becomes its negative relative to the midpoint of the pitch range used
...TODO: method/argument to use mean, median, mode, or midpoint of range?
- [x]
#### Shuffle: 
randomly redistributes some or all of the notes in a motif
1, 2, 3, 4 becomes 2, 4, 3, 1
select all, random, or specific # of indexes
- [x]
#### Trunk: 
takes (a) section(s) out of the motif
1, 2, 3, 4, 5, becomes 1, 2, 5
- []
#### Hunk: 
takes (a) section(s) of the motif and moves them around
1, 2, 3, 4, 5 becomes 1, 2, 5, 3, 4
- []
#### Thunk: 
takes (a) section(s) of the motif and copies them into a new spot
- []
#### Weave:
takes a sequence from the motif and distributes it evenly within the motif
- []
#### Shift:
shift the motif up or down relative to emphasized chord-tones
- [x]
#### Noise:
randomly replaces some non-chord tones
1, 2, 3, 4, 5, 6 become 1, 7, 3, 4, 5, 2
- []
#### Similar?: 
When note, motif, and phrase are encapsulated, this will use the same technique as was used originally but with a minor difference
1,3,2,4,3,5,4 might become 1,4,2,5,3,6,4 
1, 2, 1, 3, 1, 4 might become 1, 3, 1, 5, 1, 7 or 1, 4, 1, 3, 1, 2
- []
#### Combine?:
Methods should be created that combine multiple motifs in various ways such as interlacing.

