---
title: 'How to make a computer do anything'
description: 'Basically a summary of microprocesser applications - A topic that fascinated me'
date: 2024-07-25
tags: ['v1.0.0']
image: './1200x630_2.png'
authors: ['Brendan']
---

## Introduction

Hello! My name is Brendan. I've just graduated from the University and while all my friends are landing > 100k / year jobs, 
I am about to embark on a 7 month trip through Europe. But that's another story for another blog post. In today' s post, 
we're going to talk about how to make a computer do anything: A brief Introduction to the world of digital electronics. 

Now this will remain an extremely surface level peak into digital circuitry, but trust me: It is extremely fascinating.
Here's the main thing that first got me thinking: 

Imagine you are to design a system for your house, with multiple inputs and multiple outputs. I've recently
been toying with the idea of an automatic blinds opening system, that will open a set of blinds labelled 0-3, allowing just the right amount of sunlight to enter my living room
at any time of the day, ensuring the room remains lit but not overly bright, and that the plants are not getting
roasted by the harsh Singapore sun all day long. 

1. You have 4 blinds labelled {0, 1, 2, 3}
2. You have 4 photo resistors, also labelled {0, 1, 2, 3, 4}, each facing a different direction.
3. Depending on the time of the day - and by setting the right threshold values for the photoresistors, a unique combination of
the photoresistors will be activated. 
4. Using this, we can then map that to close or open specific blinds at certain times of the day.

## The math

Say the photoresistors are placed along a north-facing wall, with photoresistor 0 facing due west, 1 facing 45 degrees, 2 facing due north, 3 facing 45 degrees east, and 4 facing due east. As the sun rises from the east,
and makes its way across the sky until it eventually sets in the west, inviting the song of birds returning to roost. 

| Sun Direction | Resistor 0 | Resistor 1 | Resistor 2 |
|:-------------:|:----------:|:----------:|:----------:|
|      East     |      0     |      0     |      1    | 
|   North-East  |      0     |      1     |      1     |
|     North     |      0     |      1     |      0     |
|   North-West  |      1     |      1     |      0     |
|      West     |      1     |      0     |      0     |

As you can see, eithir one or a pair of resistors will get activated as the sun shines from that direction,
but it doesnt really matter whether one or two or 3 resistors get activated: It really only matters that if you look at each row,
the combination of 0's and 1's in that row is completely unique. From this, we can draw a state diagram of the system, and from that 
design a digital circuit to control our blinds.

## State diagram

## Combinational logic
Now we come to the most beautiful part of this: The creation of the karnaugh map. The karnaugh map helps us design system of logic gates
to achieve whatever output we want from a distinct set of inputs.


| Resistor 0 | Resistor 1 | Resistor 2 | Blind 0 | Blind 1 | Blind 2 | Blind 3 |
|:----------:|:----------:|:----------:|---------|---------|---------|---------|
|      0     |      0     |      1   | 0       | 0       | 1       | 1       |
|      0     |      1     |      1     | 0       | 1       | 1       | 0       |
|      0     |      1     |     0      |1       | 1       | 1       | 1       |
|      1     |      1     |      0     | 0       | 1       | 1       | 0       |
|      1     |      0     |      0     |   1       | 1       | 0       | 0       |

When the sun is rising in the east, we will open blinds 0 and 1 and close blinds 2 and 3 to prevent getting blinded.
The opposite will happen when it sets in the west.
As the sun rises to 45 degrees, we open blinds 0 and 3, but close blinds 1 and 2, ensuring we do not get direct sunlight coming into the house.
When the sun is at its apex, we close all the blinds; Nobody is trying to kill their plants in the hot singapore sun!

## Karnaugh maps
3 karnaugh maps:
- R0 R1 R2, Blind 0
- R0 R1 R2, Blind 1
- R0 R1 R2, Blind 2

## Excitation table
